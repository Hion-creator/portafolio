"""Evaluación pareada, con calentamiento excluido y bloques contrabalanceados."""
import datetime
import json
import random
import time
import core
import rag

def save(report,path):
    path.write_text(json.dumps(report,ensure_ascii=False,indent=2,allow_nan=False),encoding='utf-8')

def run():
    protocol=rag.protocol();digest=rag.protocol_hash()
    core.ROOT.joinpath('reports/protocol.json').write_text(json.dumps({'hash':digest,'protocol':protocol},ensure_ascii=False,indent=2),encoding='utf-8')
    report={'id':datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ'),'protocol_hash':digest,'environment':core.environment(),
        'protocol':{'cases':24,'repeats':2,'seed':42,'warmups_excluded':True,'order':[['decision','chat'],['chat','decision']],
            'modes':['none','rag','oracle'],'dataset':'Sintético, 6 desarrollo separados de 24 evaluación; catálogo congelado antes de inferencia.'},'records':[],'blocks':[],'complete':False}
    path=core.ROOT/'reports'/f"{report['id']}.json"
    randomizer=random.Random(42)
    for repeat,engines in enumerate([['decision','chat'],['chat','decision']],1):
        for engine in engines:
            block={'engine':engine,'repeat':repeat,'before':core.environment(),'warmup':rag.safe_infer(engine,core.dataset('dev')[0]['text'],'rag')}
            report['blocks'].append(block)
            work=[(case,mode) for case in core.dataset() for mode in ['none','rag','oracle']];randomizer.shuffle(work)
            for case,mode in work:
                row=rag.safe_infer(engine,case['text'],mode,case['expected_sources'] if mode=='oracle' else None)
                row.update({k:case[k] for k in ['text','expected','expected_sources','group']});row.update(case_id=case['id'],repeat=repeat)
                report['records'].append(row);save(report,path)
                print(f"{len(report['records'])}/288 {engine} {mode} {case['id']} ok={row['ok']} {row['metrics']['wall_seconds']:.2f}s",flush=True)
            block['after']=core.environment();save(report,path)
    report.update(complete=True,summary=rag.summaries(report['records']),retrieval=rag.retrieval_metrics(report['records']),paired=rag.paired(report['records']))
    report['costs']=core.cost_projection({k:s for k,s in report['summary'].items() if not k.endswith('_oracle')},core.COST_DEFAULTS)
    save(report,path);save(report,core.ROOT/'reports/latest.json')
    print(json.dumps({'path':str(path),'summary':report['summary'],'retrieval':report['retrieval'],'paired':report['paired']},ensure_ascii=False),flush=True)

if __name__=='__main__':run()
