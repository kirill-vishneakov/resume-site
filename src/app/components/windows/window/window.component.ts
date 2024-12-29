import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DataService, Window } from '../../../services/data.service';
import { NgClass, NgStyle } from '@angular/common';

import { SvgComponent } from '../../../shared/svg/svg.component';

@Component({
  selector: 'window',
  standalone: true,
  imports: [SvgComponent, SvgComponent, NgStyle, NgClass],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WindowComponent {
  @Input() window!: Window;
  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  el = inject(ElementRef);
  showFullscreenIndicator = false;

  @ViewChild('dynamicContent', { read: ViewContainerRef })
  dynamicContent!: ViewContainerRef;

  dataService = inject(DataService);
  componentFactoryResolver = inject(ComponentFactoryResolver);

  ngAfterViewInit() {
    if (!this.dynamicContent) return;

    if (this.window.component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        this.window.component
      );
      this.dynamicContent.clear();
      this.dynamicContent.createComponent(factory);
    } else {
      console.error('No component found for this window:', this.window);
    }
  }

  setFocus(window: Window) {
    this.dataService.windows().forEach((w) => {
      if (w.id !== window.id) {
        w.isActive = false;
      }
    });

    window.isActive = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const screenWidth = window.innerWidth;
      const screenHeight = (window.innerHeight / 10) * 9;
      let newTop = event.clientY - this.offsetY;
      let newLeft = event.clientX - this.offsetX;

      if (newTop < 0) newTop = 0;
      if (newLeft < 0) newLeft = 0;
      const windowWidth = parseFloat(this.window.width.replace('px', ''));
      const windowHeight = parseFloat(this.window.height.replace('px', ''));
      if (newLeft + windowWidth > screenWidth) {
        newLeft = screenWidth - windowWidth;
      }

      if (newTop + windowHeight > screenHeight) {
        newTop = screenHeight - windowHeight;
      }

      if (newTop === 0) {
        this.showFullscreenIndicator = true;
      } else {
        this.showFullscreenIndicator = false;
      }
      this.dataService.updateWindowPosition(this.window.id, newTop, newLeft);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    if (this.showFullscreenIndicator) {
      this.dataService.maximizeWindow(this.window.id, false);
    }

    this.showFullscreenIndicator = false;
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.setFocus(this.window);
    this.dataService.hiddenStartMenu.set(true);

    const rect = (event.target as HTMLElement)
      .closest('.window')!
      .getBoundingClientRect();
    this.offsetX = event.clientX - rect.left;
    this.offsetY = event.clientY - rect.top;

    if (this.window.isMaximized) {
      this.dataService.maximizeWindow(this.window.id, true);
      this.offsetX = 0 + parseInt(this.window.width, 10) / 2;
      this.offsetY = 0;
      this.isDragging = true;
    }
  }
}
