import { Injectable, signal } from '@angular/core'

export interface Theme {
	'--background-color': string
	'--background-footer-color': string
	'--base-color': string
	'--hover-color': string
	'--second-color': string
}

export interface ThemesList {
	dark: Theme
	light: Theme
	[key: string]: Theme
}

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	constructor() {
		this.setTheme()
	}

	darkTheme = {
		'--background-color': '#1e1e1e',
		'--background-footer-color': '#1a2325',
		'--base-color': 'white',
		'--hover-color': '#6a6a6a',
		'--second-color': '#31677d',
	}

	lightTheme = {
		'--background-color': '#e6f4ea',
		'--background-footer-color': '#b2f1ff',
		'--base-color': 'black',
		'--hover-color': '#b2d0ff',
		'--second-color': '#ffe045',
	}

	greenTheme = {
		'--background-color': '#b9e7ee',
		'--background-footer-color': '#a0ccbc',
		'--base-color': '#2e7d32',
		'--hover-color': '#66bb6a',
		'--second-color': '#63d2fd',
	}
	themes = signal<ThemesList>({
		dark: this.darkTheme,
		light: this.lightTheme,
		green: this.greenTheme,
	})

	currentTheme = signal<keyof ThemesList>(
		(() => {
			const theme = localStorage.getItem('theme') as keyof ThemesList | null
			return theme && theme in this.themes() ? theme : 'dark'
		})()
	)

	changeTheme() {
		const themeKeys = Object.keys(this.themes()) as Array<keyof ThemesList>
		const currentIndex = themeKeys.indexOf(this.currentTheme())

		const nextIndex = (currentIndex + 1) % themeKeys.length
		const nextTheme = themeKeys[nextIndex]

		this.currentTheme.set(nextTheme)
		localStorage.setItem('theme', nextTheme.toString())
		this.setTheme()
	}

	setTheme() {
		const themeVariables = this.themes()[this.currentTheme()]
		Object.entries(themeVariables).forEach(([variable, value]) => {
			document.documentElement.style.setProperty(variable, value)
		})
	}

	addTheme(theme: Theme) {}

	removeTheme(themeId: number) {}

	editTheme(themeId: number) {}
}
