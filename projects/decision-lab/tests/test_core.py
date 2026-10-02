import copy
import math
import sys
import unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import core

def response():
    return {"answers":{
        "route":{"type":"choice","choice":"incidente","confidence":.8,"probabilities":{"incidente":.8,"mejora":.05,"acceso":.05,"facturacion":.05,"revision":.05}},
        "ready":{"type":"noul","noul":.7},
        "urgency":{"type":"score","score":.82,"probabilities":{"0":.55,"1":.08,"2":.37}}}}

def record(ok=True,actual=None,expected=None):
    expectation=expected or {"route":"incidente","ready":True,"urgency_level":0}
    return {"engine":"chat","case_id":"X","ok":ok,"expected":expectation,"result":actual or expectation,
            "metrics":{"wall_seconds":1,"input_tokens":10,"output_tokens":3}}

class Contracts(unittest.TestCase):
    def test_chat_does_not_invent_probabilities(self):
        r=core.validate_chat({"route":"acceso","ready":True,"urgency_level":1})
        self.assertIsNone(r['probabilities'])

    def test_chat_rejects_wrong_types_and_extra_action(self):
        for bad in [{"route":"acceso","ready":"true","urgency_level":1},{"route":"acceso","ready":True,"urgency_level":True},{"route":"acceso","ready":True,"urgency_level":1,"approve":True}]:
            with self.subTest(bad=bad),self.assertRaises(ValueError):core.validate_chat(bad)

    def test_mode_of_score_is_not_rounded_expectation(self):
        r=core.validate_decision(response())
        self.assertEqual(r['urgency_level'],0)
        self.assertEqual(r['urgency_score'],.82)

    def test_probability_must_be_finite(self):
        for bad in [math.nan,math.inf,-.1,1.1,True,'0.5']:
            with self.subTest(bad=bad),self.assertRaises(ValueError):core.probability(bad)

    def test_missing_label_distribution_is_rejected(self):
        r=response();del r['answers']['route']['probabilities']['acceso']
        with self.assertRaises(ValueError):core.validate_decision(r)

    def test_invalid_probability_total_is_rejected(self):
        r=response();r['answers']['route']['probabilities']['revision']=.8
        with self.assertRaises(ValueError):core.validate_decision(r)

    def test_mismatching_choice_is_rejected(self):
        r=response();r['answers']['route']['choice']='acceso'
        with self.assertRaises(ValueError):core.validate_decision(r)

    def test_noul_cutoff_does_not_authorize_actions(self):
        r=response();r['answers']['ready']['noul']=.5
        parsed=core.validate_decision(r)
        self.assertTrue(parsed['ready'])
        self.assertIn('No se ejecutó',core.delivery_packet('Caso',parsed)['next_step'])

    def test_failures_are_explicit_and_timed(self):
        with patch.object(core,'infer',side_effect=RuntimeError('No conectado')):
            r=core.safe_infer('chat','Caso')
            self.assertFalse(r['ok']);self.assertIsNone(r['result']);self.assertGreaterEqual(r['metrics']['wall_seconds'],0)

    def test_length_is_bounded(self):
        with self.assertRaises(ValueError):core.validate_text('a'*1801)

class Measurement(unittest.TestCase):
    def test_failures_count_in_accuracy_denominator(self):
        s=core.summarize([record(),record(False)])['chat']
        self.assertEqual((s['calls'],s['valid'],s['exact_correct']),(2,1,1))
        self.assertEqual(s['route_accuracy'],.5)
        self.assertEqual(s['confusion']['incidente']['ERROR'],1)

    def test_contract_requires_all_three_fields(self):
        s=core.summarize([record(actual={"route":"incidente","ready":False,"urgency_level":0})])['chat']
        self.assertEqual(s['field_correct']['route'],1)
        self.assertEqual(s['exact_correct'],0)

    def test_percentile_interpolates_small_sample(self):
        self.assertAlmostEqual(core.percentile([1,2,3],.95),2.9)

    def test_costs_convert_watts_seconds_to_kwh(self):
        s=core.summarize([record()]);s['chat']['mean_seconds']=3600
        p={**core.COST_DEFAULTS,'watts_assumed':1000,'kwh_cop_assumed':500,'labor_cop_hour_assumed':0,'fixed_monthly_cop_assumed':0}
        r=core.cost_projection(s,p)['engines']['chat']
        self.assertEqual(r['inference_energy_kwh_estimated'],1)
        self.assertEqual(r['per_request_cop_estimated'],500)

    def test_failure_cost_is_manual_not_fake_success(self):
        s=core.summarize([record(False)]);p={**core.COST_DEFAULTS,'watts_assumed':0}
        r=core.cost_projection(s,p)['engines']['chat']
        self.assertEqual(r['human_seconds_estimated'],p['manual_seconds_assumed'])

    def test_wrong_valid_output_adds_review_and_rework(self):
        s=core.summarize([record(actual={"route":"acceso","ready":True,"urgency_level":0})])
        r=core.cost_projection(s,core.COST_DEFAULTS)['engines']['chat']
        self.assertEqual(r['human_seconds_estimated'],110)

    def test_bad_cost_inputs_rejected(self):
        for value in [-1,math.nan,math.inf,False]:
            with self.subTest(value=value),self.assertRaises(ValueError):core.cost_projection(core.summarize([record()]),{**core.COST_DEFAULTS,'watts_assumed':value})

    def test_cases_split_unique_and_expected_valid(self):
        dev,ev=core.dataset('dev'),core.dataset('eval')
        self.assertEqual((len(dev),len(ev)),(6,24))
        self.assertFalse({r['text'] for r in dev}&{r['text'] for r in ev})
        self.assertEqual(len({r['id'] for r in dev+ev}),30)
        for row in dev+ev:core.validate_chat(row['expected'])

if __name__=='__main__':unittest.main()
