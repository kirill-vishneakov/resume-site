import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { TaskbarComponent } from '../taskbar/taskbar.component'
import { DataService } from '../../services/data.service'
import { IconsComponent } from '../../shared/icons/icons.component'
import { WindowComponent } from '../windows/window/window.component'
import { NgStyle } from '@angular/common'
import { StartMenuComponent } from '../start-menu/start-menu.component'

@Component({
	selector: 'desktop',
	standalone: true,
	imports: [
		TaskbarComponent,
		IconsComponent,
		WindowComponent,
		NgStyle,
		StartMenuComponent,
	],
	templateUrl: './desktop.component.html',
	styleUrl: './desktop.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopComponent {
	dataService = inject(DataService)
}
