import { Component, inject, Input } from '@angular/core'
import { DataService, Icon } from '../../services/data.service'

@Component({
	selector: 'icons',
	standalone: true,
	imports: [],
	templateUrl: './icons.component.html',
	styleUrl: './icons.component.scss',
})
export class IconsComponent {
	@Input() icon!: Icon

	dataService = inject(DataService)
}
