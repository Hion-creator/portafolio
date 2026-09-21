export type Status = 'Abierto' | 'En curso' | 'Resuelto';
export type Priority = 'Alta' | 'Media' | 'Baja';
export interface Ticket { id: number; name: string; subject: string; message: string; category: string; priority: Priority; status: Status; created: string; draft?: string; }
export interface Analysis { summary: string; category: string; priority: Priority; reply: string; source: 'demo' | 'ollama'; }
export const SEED: Ticket[] = [
{id:1048,name:'Valentina Ríos',subject:'No puedo acceder a mi cuenta',message:'Hola, cambié de celular y ya no puedo ingresar a mi cuenta. El código de verificación nunca llega. Necesito acceder para una presentación de hoy. ¿Me ayudan?',category:'Acceso',priority:'Alta',status:'Abierto',created:'2026-09-19T09:15:00'},
{id:1047,name:'Santiago Mora',subject:'Veo dos cobros en mi factura',message:'En la factura de este mes aparecen dos cobros por la misma suscripción. ¿Podrían revisar el caso? Tengo los comprobantes.',category:'Facturación',priority:'Alta',status:'En curso',created:'2026-09-19T08:50:00'},
{id:1046,name:'Lucía Castro',subject:'Exportar el reporte a Excel',message:'Quisiera saber cómo descargar el reporte de mi equipo en formato Excel. No encuentro la opción.',category:'Producto',priority:'Media',status:'Abierto',created:'2026-09-19T08:30:00'},
{id:1045,name:'Daniel Ortiz',subject:'Cambiar el correo de contacto',message:'Necesito actualizar el correo de contacto de mi organización. ¿Qué información necesitan?',category:'Acceso',priority:'Baja',status:'Abierto',created:'2026-09-18T16:00:00'},
{id:1044,name:'Mariana López',subject:'El tablero tarda en cargar',message:'Desde esta mañana el tablero tarda mucho en abrir. Ya probé otro navegador y el problema continúa.',category:'Técnico',priority:'Media',status:'En curso',created:'2026-09-18T15:20:00'},
{id:1043,name:'Nicolás Vega',subject:'Gracias por la ayuda con el equipo',message:'Ya pudimos invitar a todas las personas del equipo. Muchas gracias por acompañarnos.',category:'Producto',priority:'Baja',status:'Resuelto',created:'2026-09-18T11:10:00'}
];
