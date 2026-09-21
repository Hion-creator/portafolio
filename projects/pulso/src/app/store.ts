import { Injectable, computed, signal } from '@angular/core';
import { SEED, Ticket } from './models';
const KEY = 'pulso-demo-v1';
@Injectable({providedIn:'root'})
export class TicketStore {
  readonly tickets = signal<Ticket[]>(this.load());
  readonly notice = signal('');
  readonly open = computed(() => this.tickets().filter(t => t.status !== 'Resuelto').length);
  readonly urgent = computed(() => this.tickets().filter(t => t.priority === 'Alta' && t.status !== 'Resuelto').length);
  private load(): Ticket[] {
    try { const data = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(data) && data.length <= 500 && data.every(t => t && Number.isInteger(t.id) && ['Abierto','En curso','Resuelto'].includes(t.status) && ['Alta','Media','Baja'].includes(t.priority) && ['name','subject','message','category','created'].every(k => typeof t[k] === 'string'))) return data;
    } catch {} return structuredClone(SEED);
  }
  private persist() { try { localStorage.setItem(KEY, JSON.stringify(this.tickets())); } catch { this.notice.set('El navegador no permite guardar los cambios. Se conservarán durante esta sesión.'); } }
  update(id:number, patch:Partial<Ticket>) { this.tickets.update(list => list.map(t => t.id === id ? {...t,...patch,id} : t)); this.persist(); }
  add(data:Pick<Ticket,'name'|'subject'|'message'>) { const id = Math.max(1048,...this.tickets().map(t => t.id))+1; this.tickets.update(list => [{...data,id,status:'Abierto',priority:'Media',category:'Sin clasificar',created:new Date().toISOString()},...list]); this.persist(); return id; }
}
