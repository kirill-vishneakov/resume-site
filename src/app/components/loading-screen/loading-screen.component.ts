import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'loading-screen',
	standalone: true,
	imports: [],
	templateUrl: './loading-screen.component.html',
	styleUrl: './loading-screen.component.scss',
	changeDetection: ChangeDetectionStrategy.Default,
})
export class LoadingScreenComponent {
	router = inject(Router)
	loadingLines: string[] = [
		'Инициализация системы...',
		'Загрузка модулей интерфейса...',
		'Проверка целостности системы...',
		'Система готова. Запуск рабочего стола...',
	]

	currentLine: string = ''
	progress: number = 0
	totalChars: number = 0
	typedChars: number = 0
	systemOn = signal(false)

	powerOn() {
		document.documentElement.requestFullscreen()
		this.systemOn.set(true)
		this.totalChars = this.loadingLines.join('').length
		this.typeLines()
	}

	async typeLines() {
		for (const line of this.loadingLines) {
			await this.typeLine(line)
			await this.wait(200)
		}
		this.onLoadingComplete()
	}

	async typeLine(line: string) {
		this.currentLine = ''

		for (let i = 0; i < line.length; i++) {
			let audio = new Audio(
				`./assets/sounds/typing/${Math.floor(Math.random() * 3) + 1}.mp3`
			)
			this.currentLine += line[i]
			this.typedChars++
			this.updateProgressBar()
			await this.wait(Math.random() * 100)
			audio.play()
		}
	}

	updateProgressBar() {
		this.progress = Math.round((this.typedChars / this.totalChars) * 100)
	}

	wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	onLoadingComplete() {
		let audio = new Audio('./assets/sounds/startup.mp3')
		document.querySelector('.loading-container')?.classList.add('fade-out')
		setTimeout(() => {
			audio.play()
			this.router.navigate(['/desktop'])
		}, 1000)
	}
}
