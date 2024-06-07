import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appResizable]'
})
export class ResizableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.resize(event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.resize(event);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.resize(event);
  }

  resize(event: MouseEvent) {
    const elementHeight = event.clientY - this.el.nativeElement.getBoundingClientRect().top;
    this.renderer.setStyle(this.el.nativeElement, 'height', elementHeight + 'px');
  }
}
