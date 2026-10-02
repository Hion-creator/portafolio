/* La publicación lee evidencia real; solo el servidor local habilita inferencia. */
'use strict';
const $=id=>document.getElementById(id), fmt=(x,n=1)=>Number(x).toLocaleString('es-CO',{maximumFractionDigits:n}), pct=x=>fmt(x*100)+'%';
const names={decision_none:'Nimble · sin RAG',decision_rag:'Nimble · con RAG',chat_none:'Qwen · sin RAG',chat_rag:'Qwen · con RAG'};
const arms=['decision_none','decision_rag','chat_none','chat_rag'];
let report;
function element(tag,text,cls){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;}
function tableRow(parent,values){const row=element('tr');values.forEach(v=>row.append(element('td',v)));parent.append(row);}
function exact(r){return r.ok&&['route','ready','urgency_level'].every(f=>r.result[f]===r.expected[f]);}
function renderOverview(){
  arms.forEach(key=>{const s=report.summary[key],card=element('article',undefined,'card'+(key==='decision_rag'?' featured':''));card.append(element('h3',names[key]),element('p',pct(s.exact_rate),'value'),element('p',`${s.exact_correct}/${s.calls} fichas · ${s.unique_cases} casos`,'note'),element('p',`${fmt(s.mean_seconds,3)} s de media`,'note'));const bar=element('div',undefined,'bar'),fill=element('span');fill.style.width=(s.exact_rate*100)+'%';bar.append(fill);card.append(bar);$('cards').append(card);
    tableRow($('summary'),[names[key],`${s.exact_correct}/${s.calls} · ${pct(s.exact_rate)}`,pct(s.route_accuracy),pct(s.field_correct.ready/s.calls),pct(s.field_correct.urgency_level/s.calls),fmt(s.mean_seconds,3)+' s',fmt(s.p95_seconds,3)+' s']);});
  $('finding').textContent='Resultado mixto: Nimble + RAG mejora la ruta del 45,8% al 87,5%, pero preparación baja del 91,7% al 83,3% e impacto del 91,7% al 70,8%. La ficha completa sube del 41,7% al 50%. Próxima prueba: dar el catálogo solo a la pregunta de ruta, y evaluar preparación e impacto únicamente con el mensaje. Todavía no se ha medido ese flujo.';
  $('retrieval').textContent=`Recuperación: recall@2 ${pct(report.retrieval.recall_at_2)}, MRR ${fmt(report.retrieval.mrr,3)} en ${report.retrieval.eligible_calls} llamadas con fuente de referencia. Permisos y vigencia se filtran antes de buscar.`;
  $('oracle').textContent=['decision','chat'].map(e=>{const s=report.summary[e+'_oracle'];return `${e==='decision'?'Nimble':'Qwen'} con fuente correcta: ${s.exact_correct}/${s.calls} fichas (${pct(s.exact_rate)}).`;}).join(' ');
  $('paired').textContent=['decision','chat'].map(e=>{const p=report.paired[e];return `${e==='decision'?'Nimble':'Qwen'}: RAG corrige ${p.improved} salidas y empeora ${p.regressed} respecto a sin contexto.`;}).join(' ')+' Comparación por caso y repetición; no implica significancia estadística.';
  $('protocol').textContent=`Ejecución ${report.id}. Protocolo SHA-256: ${report.protocol_hash}. ${report.records.length} llamadas; ${report.records.filter(r=>!r.ok).length} fallos técnicos. Modelos y entorno completos en el JSON descargable.`;
}
function renderCase(){
  const id=$('case').value,rep=Number($('repeat').value),rows=report.records.filter(r=>r.case_id===id&&r.repeat===rep),base=rows[0];
  $('text').textContent=base.text;$('case-group').textContent=id+' / '+base.group.toUpperCase();$('expected').textContent=`Referencia humana ficticia: ruta ${base.expected.route} · preparado ${base.expected.ready?'sí':'no'} · impacto ${base.expected.urgency_level}.`;
  $('case-results').replaceChildren();
  arms.forEach(key=>{const r=rows.find(row=>row.engine+'_'+row.mode===key),card=element('article',undefined,'card');card.append(element('h3',names[key]));if(r.ok){card.append(element('p',r.result.route,'value'),element('p',`Preparado: ${r.result.ready?'sí':'no'} · Impacto: ${r.result.urgency_level}`,'note'),element('p',exact(r)?'✓ Ficha coincide':'↗ Requiere corrección',exact(r)?'pass':'fail'));}else card.append(element('p','Fallo técnico: '+r.error,'fail'));card.append(element('p',fmt(r.metrics.wall_seconds,3)+' s medidos','note'));$('case-results').append(card);});
  $('sources').replaceChildren();const sources=rows.find(r=>r.engine==='decision'&&r.mode==='rag').sources;
  if(!sources.length)$('sources').append(element('p','No se recuperaron documentos autorizados.','note'));
  sources.forEach(s=>{const article=element('article');article.append(element('h3',s.title),element('p',s.text),element('p',`${s.source} · v${s.version} · ${s.section} · BM25 ${fmt(s.retrieval_score,3)}`,'note'));$('sources').append(article);});
  $('raw').textContent=JSON.stringify(rows.map(r=>({engine:r.engine,mode:r.mode,ok:r.ok,error:r.error,result:r.result,metrics:r.metrics,raw:r.raw})),null,2);
}
const costLabels={monthly_volume:'Solicitudes / mes',watts_assumed:'Potencia asumida (W)',kwh_cop_assumed:'COP / kWh',labor_cop_hour_assumed:'Trabajo humano COP / hora',manual_seconds_assumed:'Trámite manual (s)',review_seconds_assumed:'Revisión por salida (s)',rework_seconds_assumed:'Retrabajo por error (s)',fixed_monthly_cop_assumed:'Costos fijos COP / mes'};
function renderCosts(){
  const p=Object.fromEntries(Object.keys(costLabels).map(k=>[k,Number($('cost-'+k).value)]));
  $('cost-table').replaceChildren();if(Object.values(p).some(v=>!Number.isFinite(v)||v<0)||p.monthly_volume<=0){tableRow($('cost-table'),['Ingresa valores válidos; volumen mayor que cero.','','','']);return;}
  tableRow($('cost-table'),['Proceso manual',fmt(p.manual_seconds_assumed*p.labor_cop_hour_assumed/3600,2),fmt(p.manual_seconds_assumed*p.labor_cop_hour_assumed/3600*p.monthly_volume,0),fmt(p.manual_seconds_assumed)]);
  arms.forEach(key=>{const s=report.summary[key],fail=(s.calls-s.valid)/s.calls,wrong=(s.valid-s.exact_correct)/s.calls,human=(1-fail)*p.review_seconds_assumed+wrong*p.rework_seconds_assumed+fail*p.manual_seconds_assumed,cost=human*p.labor_cop_hour_assumed/3600+p.watts_assumed/1000*s.mean_seconds/3600*p.kwh_cop_assumed+p.fixed_monthly_cop_assumed/p.monthly_volume;tableRow($('cost-table'),[names[key],fmt(cost,2),fmt(cost*p.monthly_volume,0),fmt(human+s.mean_seconds,2)]);});
}
async function init(){
  try{const response=await fetch('results.json');if(!response.ok)throw new Error('No se pudo cargar la evidencia.');report=await response.json();if(!report.complete)throw new Error('La evaluación aún no está completa.');renderOverview();
    const cases=[...new Map(report.records.map(r=>[r.case_id,r])).values()].sort((a,b)=>a.case_id.localeCompare(b.case_id));cases.forEach(r=>{const option=element('option',`${r.case_id} · ${r.text.slice(0,75)}…`);option.value=r.case_id;$('case').append(option);});$('case').addEventListener('change',renderCase);$('repeat').addEventListener('change',renderCase);renderCase();
    Object.entries(costLabels).forEach(([key,title])=>{const label=element('label',title),input=element('input');input.id='cost-'+key;input.type='number';input.min=key==='monthly_volume'?'1':'0';input.value=report.costs.assumptions[key];input.addEventListener('input',renderCosts);label.append(input);$('cost-inputs').append(label);});renderCosts();$('status').textContent='Evaluación completa · '+report.records.length+' respuestas reales disponibles.';
    try{const config=await(await fetch('config.json')).json();if(config.local){$('live').hidden=false;$('runtime').textContent='SERVIDOR LOCAL · OLLAMA';}}catch{/* La publicación puede prescindir de configuración local. */}
  }catch(error){$('status').textContent=error.message;}
}
$('live-form').addEventListener('submit',async event=>{event.preventDefault();$('run').disabled=true;$('live-result').textContent='Inferencia local en curso…';try{const response=await fetch('/api/infer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:$('live-text').value,engine:$('live-engine').value,mode:$('live-mode').value})}),result=await response.json();$('live-result').textContent=JSON.stringify(result,null,2);}catch(error){$('live-result').textContent=error.message;}finally{$('run').disabled=false;}});
init();
