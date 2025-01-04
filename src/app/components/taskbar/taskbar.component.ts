import { ThemeService } from './../../services/theme.service'
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	signal,
} from '@angular/core'
import { interval, Subscription } from 'rxjs'
import { DataService } from '../../services/data.service'
import { SvgComponent } from '../../shared/svg/svg.component'

@Component({
	selector: 'taskbar',
	standalone: true,
	imports: [],
	templateUrl: './taskbar.component.html',
	styleUrl: './taskbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskbarComponent {
	daysOfWeek = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	]

	cdr = inject(ChangeDetectorRef)
	ngDoCheck() {
		this.cdr.markForCheck()
	}

	dataService = inject(DataService)

	toggleWindow(windowId: string) {
		const window = this.dataService.windows().find((w) => w.id === windowId)
		if (window) {
			if (!window.isOpen) return this.dataService.openWindow(windowId, true)
			if (window.hidden)
				return this.dataService.showWindow(windowId, window.hidden)
			if (window.isMaximized || window.isActive)
				return this.dataService.showWindow(windowId, false)
			if (!window.isActive) return this.dataService.bringToFront(windowId)
		}
	}

	// { date: string; time: string; day: string }

	currentTime = signal({
		date: new Date().toLocaleDateString(),
		time: new Date().toLocaleTimeString(),
		day: this.daysOfWeek[new Date().getDay()],
	})
	subscription: Subscription | null = null

	themeService = inject(ThemeService)

	ngOnInit(): void {
		interval(1000).subscribe(() => {
			this.currentTime.set({
				...this.currentTime(),
				time: new Date().toLocaleTimeString(),
			})
		})
	}
}
