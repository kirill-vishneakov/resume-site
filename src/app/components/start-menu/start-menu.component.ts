import { IconsComponent } from '../../shared/icons/icons.component';
import { DataService } from './../../services/data.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'start-menu',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartMenuComponent {
  dataService = inject(DataService);
}
