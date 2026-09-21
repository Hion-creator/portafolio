import { test, expect } from '@playwright/test';
test('filter, analyze, save and restore a draft',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('heading',{name:'Tu bandeja, en calma.'})).toBeVisible();
 await page.getByLabel('Buscar tickets').fill('Valentina');
 await expect(page.locator('.ticket-row')).toHaveCount(1);
 await page.getByRole('button',{name:'Analizar ticket'}).click();
 await expect(page.getByText('RESUMEN · SIMULADO')).toBeVisible();
 await expect(page.getByLabel('Tu respuesta')).toHaveValue(/Hola, Valentina/);
 await page.getByLabel('Tu respuesta').fill('Borrador revisado por una persona.');
 await page.getByRole('button',{name:'Guardar borrador'}).click();
 await page.reload();
 await expect(page.getByLabel('Tu respuesta')).toHaveValue('Borrador revisado por una persona.');
});
test('create a ticket, change its status and update metrics',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Nuevo ticket'}).click();
 await page.getByLabel('Nombre',{exact:true}).fill('Prueba Angular');
 await page.getByLabel('Asunto',{exact:true}).fill('Solicitud de demostración');
 await page.getByLabel('Mensaje',{exact:true}).fill('Necesito ayuda con el acceso de mi equipo.');
 await page.getByRole('button',{name:'Crear conversación'}).click();
 await expect(page.getByRole('heading',{name:'Solicitud de demostración',exact:true})).toHaveCount(2);
 await page.getByLabel('Estado del ticket').selectOption('Resuelto');
 await page.getByRole('link',{name:'Panorama'}).click();
 await expect(page.getByText('2 de 7 conversaciones')).toBeVisible();
});
test('empty filter and failed AI have explicit feedback',async({page})=>{
 await page.route('**/api/analyze',r=>r.fulfill({status:503,body:'{}'}));
 await page.goto('/');await page.getByLabel('Buscar tickets').fill('zzzz-no-match');
 await expect(page.getByText('No encontramos conversaciones')).toBeVisible();
 await page.getByRole('button',{name:'Limpiar filtros'}).click();
 await expect(page.locator('.ticket-row')).toHaveCount(6);
 await page.getByLabel('Motor del copiloto').selectOption('ollama');
 await page.getByRole('button',{name:'Analizar ticket'}).click();
 await expect(page.getByRole('alert')).toContainText('No pudimos conectar');
});
test('desktop screenshot and no browser errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:1440,height:1120});await page.goto('/');
 await expect(page.locator('.ticket-row')).toHaveCount(6);
 await page.screenshot({path:'preview-desktop.png',fullPage:true});expect(errors).toEqual([]);
});
test('mobile has no horizontal overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await expect(page.locator('.ticket-row')).toHaveCount(6);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:'preview-mobile.png',fullPage:true});
});

test('Ollama response is reviewable and classification requires action',async({page})=>{
 await page.route('**/api/analyze',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({summary:'Revisar la facturación.',category:'Facturación',priority:'Baja',reply:'Borrador de prueba del contrato API.',source:'ollama'})}));
 await page.goto('/');await page.getByLabel('Motor del copiloto').selectOption('ollama');
 await page.getByRole('button',{name:'Analizar ticket'}).click();
 await expect(page.getByText('RESUMEN · GENERADO CON IA')).toBeVisible();
 await expect(page.locator('.ticket-row').first()).toContainText('Acceso');
 await page.getByRole('button',{name:'Aplicar clasificación'}).click();
 await expect(page.locator('.ticket-row').first()).toContainText('Facturación');
});
test('dialog validates input and returns keyboard focus',async({page})=>{
 await page.goto('/');const add=page.getByRole('button',{name:'Nuevo ticket'});await add.click();
 await expect(page.getByLabel('Nombre',{exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Crear conversación'}).click();
 await expect(page.getByRole('alert')).toContainText('Completa todos');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(add).toBeFocused();
});
