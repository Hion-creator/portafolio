import sys
import unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import core
import rag
import retrieval

class RetrievalTests(unittest.TestCase):
    def test_code_normalization(self):
        self.assertEqual(retrieval.tokens('MQ-27'),retrieval.tokens('mq27'))
    def test_authorization_and_retired_filter(self):
        for text in ['MQ-27 Atlas','ZX-90 Tesorería','TT-18']:
            ids={r['id'] for r in retrieval.retrieve(text)}
            self.assertFalse(ids.intersection({'old-mq27','private-zx90','expired-tt18'}))
    def test_expiration(self):
        doc={**retrieval.documents()[0],'valid_until':'2026-10-02'}
        self.assertFalse(retrieval.eligible(doc))
    def test_empty_corpus(self):self.assertEqual(retrieval.retrieve('MQ-27',corpus=[]),[])
    def test_code_source_first(self):
        for case in core.dataset():
            if case['expected_sources']:
                self.assertEqual(retrieval.retrieve(case['text'])[0]['id'],case['expected_sources'][0])
    def test_oracle_cannot_bypass_permissions(self):
        with self.assertRaises(ValueError):retrieval.oracle(['private-zx90'])
    def test_state_has_no_labels(self):
        case=core.dataset()[0];state=rag.state(case['text'],retrieval.oracle(case['expected_sources']))
        self.assertEqual(set(state),{'mensaje','documentos'})
        self.assertNotIn('expected',str(state));self.assertNotIn('split',str(state))
    def test_retrieval_does_not_reward_no_sources(self):
        self.assertIsNone(rag.retrieval_metrics([])['recall_at_2'])
    def test_sources_are_real(self):
        fragment=retrieval.retrieve('MQ-27 Atlas')[0]
        self.assertIn(fragment['text'],retrieval.source_text(fragment))
        fragment['text']='alterado'
        with self.assertRaises(ValueError):retrieval.source_text(fragment)
    def test_protocol_stable(self):self.assertEqual(rag.protocol_hash(),rag.protocol_hash())

if __name__=='__main__':unittest.main()
