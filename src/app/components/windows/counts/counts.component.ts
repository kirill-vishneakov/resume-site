import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import { CountsService } from '../../../services/counts.service'
import { FormsModule } from '@angular/forms'

@Component({
	selector: 'app-counts',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './counts.component.html',
	styleUrl: './counts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountsComponent {
	countsService = inject(CountsService)

	title = signal('')
	count = signal('')
	firstInp: HTMLElement | null = null
	ngAfterViewInit(): void {
		this.firstInp = document.getElementById('firstAdd')
	}

	add() {
		if (this.title() == '' && this.count() == '') return
		this.countsService.add({
			title: this.title(),
			count: Number(this.count()),
		})

		this.title.set('')
		this.count.set('')

		this.firstInp!.focus()
	}
}
