import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

}
