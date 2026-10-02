"""Recuperación BM25 local con permisos, vigencia y procedencia verificable."""
import math
import re
import unicodedata
from collections import Counter
from pathlib import Path
import core

STOP=set('a al algo ante con de del el ella en es esta este esto la las lo los me mi para por que se sin su un una y ya quiero solicito necesito favor gracias codigo evento operacion equipo demas actual revisar revisar normal sigue sistema'.split())
CONFIG={'method':'BM25 + coincidencia de código','k':2,'k1':1.5,'b':0.75,'code_bonus':8,'max_chars':1600,'role':'mesa','as_of':'2026-10-02'}

def tokens(text):
    text=''.join(c for c in unicodedata.normalize('NFD',text.lower()) if unicodedata.category(c)!='Mn')
    return [t.replace('-','') for t in re.findall(r'[a-z0-9]+(?:-[a-z0-9]+)*',text) if t not in STOP]

def documents():return core.read_json(core.ROOT/'data'/'corpus.json')

def eligible(doc,role='mesa',as_of='2026-10-02'):
    return doc['active'] and role in doc['roles'] and doc['valid_from']<=as_of and (not doc.get('valid_until') or as_of<doc['valid_until'])

def public_fragment(doc,score=None):
    result={k:doc[k] for k in ['id','title','source','version','section','text']}
    if score is not None:result['retrieval_score']=round(score,6)
    return result

def retrieve(text,role='mesa',as_of='2026-10-02',k=2,corpus=None):
    if type(k) is not int or not 1<=k<=3:raise ValueError('k debe estar entre 1 y 3.')
    docs=[d for d in (documents() if corpus is None else corpus) if eligible(d,role,as_of)]
    if not docs:return []
    query=set(tokens(text)); counters=[Counter(tokens(d['title']+' '+d['text']+' '+' '.join(d['aliases']))) for d in docs]
    avg=sum(sum(c.values()) for c in counters)/len(counters)
    df={t:sum(t in c for c in counters) for t in query}
    ranked=[]
    for doc,c in zip(docs,counters):
        size=sum(c.values());score=0.0
        for term in query:
            freq=c[term]
            if freq:
                idf=math.log(1+(len(docs)-df[term]+.5)/(df[term]+.5))
                score+=idf*freq*(CONFIG['k1']+1)/(freq+CONFIG['k1']*(1-CONFIG['b']+CONFIG['b']*size/(avg or 1)))
        alias_terms=set(tokens(' '.join(doc['aliases'])))
        if any(t in alias_terms and any(ch.isdigit() for ch in t) for t in query):score+=CONFIG['code_bonus']
        if score>0:ranked.append((score,doc))
    ranked.sort(key=lambda item:(-item[0],item[1]['id']))
    fragments=[];used=0
    for score,doc in ranked[:k]:
        if used+len(doc['text'])>CONFIG['max_chars']:continue
        fragments.append(public_fragment(doc,score));used+=len(doc['text'])
    return fragments

def oracle(ids,role='mesa'):
    if not isinstance(ids,list):raise ValueError('Fuentes esperadas deben ser una lista.')
    by_id={d['id']:d for d in documents() if eligible(d,role)}
    if any(key not in by_id for key in ids):raise ValueError('Fuente de diagnóstico no vigente o no autorizada.')
    return [public_fragment(by_id[key]) for key in ids]

def source_text(fragment):
    doc=next((d for d in documents() if d['id']==fragment['id']),None)
    if not doc or not eligible(doc):raise ValueError('Fuente no autorizada.')
    if fragment['text']!=doc['text']:raise ValueError('Fragmento alterado.')
    return (core.ROOT/doc['source']).read_text(encoding='utf-8')
