import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
bootstrapApplication(App, {providers: [provideHttpClient(), provideRouter([
  {path: '', pathMatch: 'full', redirectTo: 'bandeja'},
  {path: 'bandeja', loadComponent: () => import('./app/inbox').then(m => m.Inbox)},
  {path: 'panorama', loadComponent: () => import('./app/overview').then(m => m.Overview)},
  {path: '**', redirectTo: 'bandeja'}
], ...(location.pathname.startsWith("/proyectos/pulso") ? [withHashLocation()] : []))]}).catch(console.error);
