import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TicketStore } from './store';
@Component({selector:'app-root',imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<div class="shell"><aside class="sidebar"><a class="brand" routerLink="/bandeja"><span class="brand-mark">p</span> pulso<span class="brand-dot">✦</span></a>
<div class="workspace"><span class="workspace-icon">A</span><div><b>Estudio Aurora</b><small>Espacio de demostración</small></div><span class="ml-auto opacity-50">⌄</span></div>
<p class="nav-label">ESPACIO DE TRABAJO</p><nav aria-label="Navegación principal"><a routerLink="/bandeja" routerLinkActive="active"><span>▤</span> Bandeja <b class="nav-count">{{store.open()}}</b></a><a routerLink="/panorama" routerLinkActive="active"><span>◴</span> Panorama</a></nav>
<div class="sidebar-note"><span class="text-2xl">✧</span><h3>Menos tareas repetitivas.<br>Más conversaciones.</h3><p>Un copiloto para que tu equipo se enfoque en las personas.</p><div class="flex gap-1.5 mt-5"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
<div class="profile"><span class="avatar">AS</span><div><b>Andrés Salazar</b><small>Proyecto de portafolio</small></div><span class="ml-auto text-green-300">●</span></div></aside>
<main class="main"><header class="topbar"><span>Workspace <span class="mx-3 text-stone-300">/</span> Atención al cliente</span><span class="demo-label"><i></i> Demo interactiva</span></header><router-outlet /></main></div>
@if(store.notice()){<div role="status" class="toast">{{store.notice()}}</div>}`})
export class App { store=inject(TicketStore); }
