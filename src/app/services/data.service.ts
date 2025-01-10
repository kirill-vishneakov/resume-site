import { computed, Injectable, signal } from '@angular/core'
import { AboutComponent } from '../components/windows/about/about.component'
import { SkillsComponent } from '../components/windows/skills/skills.component'
import { ProjectsComponent } from '../components/windows/projects/projects.component'
import { ContactComponent } from '../components/windows/contact/contact.component'
import { CountsComponent } from '../components/windows/counts/counts.component'
import { MinesweeperComponent } from '../components/windows/minesweeper/minesweeper.component'

export interface Icon {
	id: number
	title: string
	image: string
	windowId: string
	position: { top: number; left: number }
}

export interface Window {
	id: string
	title: string
	isOpen: boolean
	component: any
	width: string
	height: string
	position: { top: number; left: number }
	isMaximized: boolean
	isActive: boolean
	hidden: boolean
	icon: string
	isSecond: boolean
}

@Injectable({
	providedIn: 'root',
})
export class DataService {
	icons = signal<Icon[]>([
		{
			id: 1,
			title: 'Обо мне',
			image: 'assets/imgs/about.png',
			windowId: 'aboutWindow',
			position: { top: 50, left: 50 },
		},
		{
			id: 2,
			title: 'Навыки',
			image: 'assets/imgs/skills.png',
			windowId: 'skillsWindow',
			position: { top: 10, left: 55 },
		},
		{
			id: 3,
			title: 'Проекты',
			image: 'assets/imgs/projects.png',
			windowId: 'projectsWindow',
			position: { top: 20, left: 10 },
		},
		{
			id: 4,
			title: 'Связаться',
			image: 'assets/imgs/contact.png',
			windowId: 'contactWindow',
			position: { top: 70, left: 70 },
		},
	])

	orderIcons = signal<Icon[]>([
		{
			id: 1,
			title: 'Сапер',
			image: 'assets/imgs/minesweeper.png',
			windowId: 'minesweeperWindow',
			position: { top: 50, left: 50 },
		},
		{
			id: 2,
			title: 'Счетчик',
			image: 'assets/imgs/counts.png',
			windowId: 'countsComponent',
			position: { top: 50, left: 50 },
		},
	])

	windows = signal<Window[]>([
		{
			id: 'aboutWindow',
			title: 'Обо мне',
			isOpen: false,
			component: AboutComponent,
			width: '1000px',
			height: '500px',
			position: { top: 50, left: 50 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/about.png',
			isSecond: false,
		},
		{
			id: 'skillsWindow',
			title: 'Навыки',
			isOpen: false,
			component: SkillsComponent,
			width: '800px',
			height: '500px',
			position: { top: 100, left: 100 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/skills.png',
			isSecond: false,
		},
		{
			id: 'projectsWindow',
			title: 'Проекты',
			isOpen: false,
			component: ProjectsComponent,
			width: '700px',
			height: '500px',
			position: { top: 150, left: 150 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/projects.png',
			isSecond: false,
		},
		{
			id: 'contactWindow',
			title: 'Связаться',
			isOpen: false,
			component: ContactComponent,
			width: '800px',
			height: '600px',
			position: { top: 200, left: 200 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/contact.png',
			isSecond: false,
		},
		{
			id: 'minesweeperWindow',
			title: 'Сапер',
			isOpen: false,
			component: MinesweeperComponent,
			width: '500px',
			height: '420px',
			position: { top: 200, left: 200 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/minesweeper.png',
			isSecond: true,
		},
		{
			id: 'countsComponent',
			title: 'Счетчик',
			isOpen: false,
			component: CountsComponent,
			width: '500px',
			height: '400px',
			position: { top: 200, left: 200 },
			isMaximized: false,
			isActive: false,
			hidden: false,
			icon: 'assets/imgs/counts.png',
			isSecond: true,
		},
	])

	renderWindow = computed(() =>
		this.windows().filter((el) => el.isOpen || !el.isSecond)
	)

	hiddenStartMenu = signal(true)

	openWindow(windowId: string, bool: boolean) {
		this.windows.set(
			this.windows().map((w) => {
				if (w.id === windowId) {
					if (bool) {
						w.isOpen = true
						this.bringToFront(windowId)
					} else {
						w.isOpen = false
						w.isMaximized = false
						w.hidden = false
						w.isActive = false
					}
				}
				return w
			})
		)
	}

	updateWindowPosition(id: string, top: number, left: number) {
		const window = this.windows().find((w) => w.id === id)
		if (window) {
			window.position.top = top
			window.position.left = left
		}
	}

	bringToFront(windowId: string) {
		this.windows().forEach((w) => {
			if (!w.isOpen) return
			w.isActive = true
			if (w.id !== windowId) {
				w.isActive = false
			}
			if (w.isMaximized && w.id !== windowId) {
				w.hidden = true
			}
		})
	}

	maximizeWindow(windowId: string, bool: boolean) {
		this.windows.set(
			this.windows().map((w) => {
				if (w.id === windowId) {
					w.isMaximized = !bool
				}
				return w
			})
		)
	}

	showWindow(windowId: string, bool: boolean) {
		this.windows().forEach((w) => {
			if (!w.isOpen) return
			if (w.id === windowId) {
				w.hidden = !bool
				if (bool) this.bringToFront(windowId)
			}
		})
	}
}
