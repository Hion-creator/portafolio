import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { Analysis, Ticket } from './models';
@Injectable({providedIn:'root'})
export class AiService {
  private http = inject(HttpClient);
  readonly localAvailable = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  mode = signal<'demo'|'ollama'>('demo');
  async analyze(ticket:Ticket): Promise<Analysis> {
    if(this.mode() === 'ollama') return firstValueFrom(this.http.post<Analysis>('/api/analyze',{subject:ticket.subject,message:ticket.message,name:ticket.name}).pipe(timeout(65000)));
    await new Promise(resolve => setTimeout(resolve,650));
    const text = (ticket.subject+' '+ticket.message).toLowerCase();
    const category = /cobro|factura|pago/.test(text) ? 'Facturación' : /acced|cuenta|correo|código/.test(text) ? 'Acceso' : /lento|cargar|navegador/.test(text) ? 'Técnico' : 'Producto';
    return {source:'demo',category,priority:/hoy|urgente|dos cobros/.test(text)?'Alta':'Media',summary:ticket.message.slice(0,180),reply:`Hola, ${ticket.name.split(' ')[0]}. Gracias por contarnos lo que ocurre. Entendemos tu solicitud sobre «${ticket.subject.toLowerCase()}». Para revisarla, ¿puedes compartir los pasos que seguiste y una captura sin datos sensibles? Con esa información podremos orientarte mejor. No compartas contraseñas ni códigos de verificación.`};
  }
}
