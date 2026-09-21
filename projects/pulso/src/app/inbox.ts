import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TicketStore } from './store';
import { AiService } from './ai';
import { FocusDialog } from './focus-dialog';
import { Analysis, Status } from './models';
@Component({standalone:true,imports:[DatePipe,ReactiveFormsModule,FormsModule,FocusDialog],templateUrl:'./inbox.html'})
export class Inbox {
  store=inject(TicketStore); ai=inject(AiService); fb=inject(FormBuilder);
  query=signal(''); filter=signal('Todos'); selectedId=signal<number|null>(1048);
  creating=signal(false); loading=signal(false); error=signal(''); feedback=signal(''); analysis=signal<Analysis|null>(null); draft='';
  filters=['Todos','Abierto','En curso','Resuelto']; statuses:Status[]=['Abierto','En curso','Resuelto'];
  form=this.fb.nonNullable.group({name:['',[Validators.required,Validators.maxLength(80),Validators.pattern(/\S/)]],subject:['',[Validators.required,Validators.maxLength(140),Validators.pattern(/\S/)]],message:['',[Validators.required,Validators.minLength(15),Validators.maxLength(3000),Validators.pattern(/\S/)]]});
  selected=computed(()=>this.store.tickets().find(t=>t.id===this.selectedId()));
  filtered=computed(()=>this.store.tickets().filter(t=>(this.filter()==='Todos'||t.status===this.filter()) && `${t.id} ${t.name} ${t.subject} ${t.category}`.toLowerCase().includes(this.query().toLowerCase())));
  constructor(){this.draft=this.selected()?.draft||'';}
  select(id:number){this.selectedId.set(id);this.analysis.set(null);this.error.set('');this.feedback.set('');this.draft=this.selected()?.draft||'';}
  async analyze(){const ticket=this.selected();if(!ticket||this.loading())return;this.loading.set(true);this.error.set('');this.feedback.set('');try{const result=await this.ai.analyze(ticket);if(this.selectedId()===ticket.id){this.analysis.set(result);this.draft=result.reply;}}catch{if(this.selectedId()===ticket.id)this.error.set('No pudimos conectar con Ollama. Inicia el backend y el modelo local, o selecciona Demo.');}finally{this.loading.set(false);}}
  apply(){const a=this.analysis(),t=this.selected();if(a&&t){this.store.update(t.id,{priority:a.priority,category:a.category});this.feedback.set('Clasificación aplicada.');}}
  save(){const t=this.selected();if(t&&this.draft.trim()){this.store.update(t.id,{draft:this.draft.trim()});this.feedback.set('Borrador guardado en este navegador. No se envió ningún mensaje.');}}
  changeStatus(value:string){const t=this.selected();if(t&&this.statuses.includes(value as Status))this.store.update(t.id,{status:value as Status});}
  create(){if(this.form.invalid){this.form.markAllAsTouched();return;}const values=this.form.getRawValue();const id=this.store.add({name:values.name.trim(),subject:values.subject.trim(),message:values.message.trim()});this.query.set('');this.filter.set('Todos');this.select(id);this.form.reset();this.creating.set(false);}
  initials(name:string){return name.split(' ').slice(0,2).map(s=>s[0]).join('');}
}
