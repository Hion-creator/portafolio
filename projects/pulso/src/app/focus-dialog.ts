import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
@Directive({selector:'[focusDialog]',standalone:true})
export class FocusDialog implements AfterViewInit, OnDestroy {
  private el: ElementRef<HTMLElement> = inject(ElementRef); private previous=document.activeElement as HTMLElement|null;
  private controls(){return Array.from(this.el.nativeElement.querySelectorAll<HTMLElement>('button:not([disabled]),input,textarea,select,a[href],[tabindex="0"]'));}
  ngAfterViewInit(){this.el.nativeElement.querySelector<HTMLInputElement>('input')?.focus();}
  @HostListener('keydown',['$event']) onKey(event:KeyboardEvent){if(event.key!=='Tab')return;const controls=this.controls(),first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){last?.focus();event.preventDefault();}else if(!event.shiftKey&&document.activeElement===last){first?.focus();event.preventDefault();}}
  ngOnDestroy(){this.previous?.focus();}
}

