import { FormsModule } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  windows = inject(DataService).windows;
  me = this.windows().find((w) => w.id === 'aboutWindow');

  cdr = inject(ChangeDetectorRef);

  bold = signal(false);
  curs = signal(false);
  line = signal(false);
  not = signal(false);

  textAlight = signal('left');

  menu = [
    { title: 'Жирный', data: this.bold, class: { bold: this.bold } },
    { title: 'Курсив ', data: this.curs, class: { curs: this.curs } },
    { title: 'Подчеркнутый ', data: this.line, class: { line: this.line } },
    { title: 'Зачеркнутый ', data: this.not, class: { not: this.not } },
  ];

  alight = [
    { title: 'Влево', data: 'left' },
    { title: 'По середине ', data: 'center' },
    { title: 'Вправо ', data: 'right' },
  ];

  fontSize = signal(18);
  adjustFontSize(change: number) {
    const newSize = this.fontSize() + change;
    const max = this.me?.isMaximized ? 40 : 26;
    if (max === 26 && newSize > 26) return this.fontSize.set(26);
    if (newSize >= 14 && newSize <= max) {
      this.fontSize.set(newSize);
    }
    this.cdr.markForCheck();
  }
}
