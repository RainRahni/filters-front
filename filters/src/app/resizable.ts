import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appResizable]'
})
export class ResizableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();

    const startY = event.clientY;
    const startHeight = this.el.nativeElement.offsetHeight;

    const onMouseMove = (e: MouseEvent) => {
      const newHeight = startHeight + e.clientY - startY;
      this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }
}
