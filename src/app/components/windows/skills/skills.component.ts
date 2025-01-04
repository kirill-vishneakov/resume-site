import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  skills = [
    'Интернет',
    'HTML',
    'CSS',
    'SCSS',
    'JavaScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'REST',
    'TypeScript',
    'SOLID',
    'React',
    'ООП',
    'Angular',
    'RxJs',
    'NgRx',
    'WebSocket',
    'Git',
    'GitHub',
  ];
}
