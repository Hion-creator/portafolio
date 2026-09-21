export const documents = [
  { id: 'bienvenida', title: 'Manual de bienvenida', tag: 'CULTURA Y EQUIPO', pages: [
    { number: 1, title: 'Tu primera semana', text: 'La inducción de Aurora Demo dura tres días. Talento Humano coordina el proceso. El primer día incluye una bienvenida al equipo, la revisión del manual y la configuración de los accesos.' },
    { number: 2, title: 'Cómo trabajamos', text: 'El horario de atención de Aurora Demo es de 8:00 a 17:00, de lunes a viernes. La reunión de equipo se realiza los martes a las 10:00.' },
    { number: 3, title: 'Tiempo para desconectar', text: 'Las vacaciones deben solicitarse con quince días de anticipación a Talento Humano. Este manual no incluye información sobre salarios ni beneficios económicos.' }
  ] },
  { id: 'seguridad', title: 'Guía de seguridad', tag: 'ACCESOS Y SOPORTE', pages: [
    { number: 1, title: 'Protege tus accesos', text: 'Las contraseñas deben tener como mínimo catorce caracteres. Nunca compartas contraseñas ni códigos de verificación. La capacitación obligatoria de privacidad debe completarse en diez días.' },
    { number: 2, title: 'Estamos para ayudarte', text: 'Los incidentes técnicos se reportan a soporte@aurora.example. Los incidentes de seguridad se reportan a seguridad@aurora.example. Describe el problema sin incluir contraseñas ni información sensible.' }
  ] }
];
const scenarios = [
 { questions: ['¿Qué hago en mi primer día?', '¿Cómo es la inducción?', '¿Cuánto dura la inducción?'], answer: 'Tu inducción dura tres días y la coordina Talento Humano. En el primero conocerás al equipo, revisarás el manual y configurarás tus accesos.', doc:'bienvenida', page:1 },
 { questions: ['¿Cuál es el horario de trabajo?', '¿Cuál es el horario?', '¿Cuándo es la reunión del equipo?'], answer: 'El horario de atención es de lunes a viernes, de 8:00 a 17:00. El equipo se reúne los martes a las 10:00.', doc:'bienvenida', page:2 },
 { questions: ['¿Cómo solicito vacaciones?', '¿Con cuánta anticipación pido vacaciones?'], answer: 'Solicita tus vacaciones a Talento Humano con quince días de anticipación.', doc:'bienvenida', page:3 },
 { questions: ['¿Cómo protejo mis accesos?', '¿Cuántos caracteres debe tener mi contraseña?', '¿Cuándo debo completar la capacitación de privacidad?'], answer: 'Usa una contraseña de al menos catorce caracteres y no compartas tus credenciales ni códigos. Completa la capacitación de privacidad dentro de los primeros diez días.', doc:'seguridad', page:1 },
 { questions: ['¿A quién contacto si tengo un problema técnico?', '¿Cuál es el correo de soporte?', '¿Dónde reporto un incidente de seguridad?'], answer: 'Para incidentes técnicos, escribe a soporte@aurora.example. Para seguridad, a seguridad@aurora.example. Describe el problema sin compartir información sensible.', doc:'seguridad', page:2 }
];
export const prompts = [scenarios[0].questions[0],scenarios[1].questions[0],scenarios[4].questions[0],'¿Cuál será mi salario?'];
export const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[¿?¡!.,]/g,'').replace(/\s+/g,' ').trim();
export function answerQuestion(question) {
 const found = scenarios.find(s => s.questions.some(q => normalize(q) === normalize(question)));
 if (!found) return { supported:false, text:'No encuentro evidencia suficiente para responder esa pregunta en los documentos de esta demo. Puedes consultar los ejemplos disponibles o dirigirte a Talento Humano. Esta simulación solo reconoce un conjunto de preguntas predefinidas.', sources:[] };
 const doc = documents.find(d => d.id===found.doc);
 const page = doc.pages.find(p => p.number===found.page);
 return { supported:true, text:found.answer, sources:[{doc:doc.id,title:doc.title,page:page.number,quote:page.text}] };
}
export const steps = ['Revisar el manual de bienvenida','Conocer los canales de soporte','Leer la guía de seguridad'];
