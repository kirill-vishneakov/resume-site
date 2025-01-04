import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	HostListener,
	signal,
	ViewChild,
} from '@angular/core'

export interface Project {
	id: number
	title: string
	subtitle: string
	description: string
	stack: string[]
	period: string
}

@Component({
	selector: 'app-projects',
	standalone: true,
	imports: [],
	templateUrl: './projects.component.html',
	styleUrl: './projects.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
	projectsMenu: Project[] = [
		{
			id: 1,
			title: 'Tic-tac-toe',
			subtitle: 'HTML, CSS и JavaScript.',
			stack: ['HTML', 'CSS', 'JavaScript'],
			period: 'Сентябрь 2023 — Октябрь 2023',
			description:
				'Создал игру крестики-нолики, используя нативный JavaScript для реализации игровой логики. Применил адаптивную верстку для корректного отображения на разных устройствах. Оптимизировал код для улучшения производительности. Добавил 2 игровых режима: с ботом и с другом. Также у бота есть 3 уровня сложности',
		},
		{
			id: 2,
			title: 'Weather site',
			subtitle: 'React, TypeScript, API',
			stack: ['React', 'TypeScript', 'HTML', 'CSS', 'API'],
			period: 'Январь 2024 — Февраль 2024',
			description:
				'Разработал SPA, подключенное к внешнему API для получения актуальной информации о погоде и местоположения пользователя. Использовал TypeScript для повышения надежности кода. Настроил интерактивные элементы интерфейса, такие как поиск по городам и визуализация погодных условий.',
		},
		{
			id: 3,
			title: 'Social-media (beta)',
			subtitle: 'React и Express',
			stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
			period: 'Март 2024 — Июнь 2024',
			description:
				'Создавал прототип социальной сети с подобием авторизации пользователей, созданием профилей. Реализовал REST API на Express, а также базу данных на PostgreSQL. Оптимизировал работу клиент-серверной архитектуры для повышения скорости отклика. Основной функционал: регистрация, вход, редактирование профиля (использовал JWT токен)',
		},
		{
			id: 4,
			title: 'Social-media',
			subtitle: 'Angular Nx NgRx REST api ',
			stack: [
				'Angular',
				'TypeScript',
				'RxJs',
				'nx',
				'NgRx',
				'SCSS',
				'REST api',
			],
			period: 'Август 2024 — Декабрь 2024',
			description: `Реализовал пользовательский интерфейс для социальной сети. Настроил взаимодействие с REST API для работы с данными пользователей. Применил Angular Router для управления маршрутизацией в приложении. Использовал NgRX для хранения данных в store, также построил архитектуру monorepo с использованием Nx`,
		},
		{
			id: 5,
			title: 'Дополнение',
			subtitle: '',
			stack: [],
			period: '',
			description:
				'Были указанны не все проекты, а основные, которые имеют законченный вид (не считая соц. сетей), во время промежутков между проектами я обучался той или иной технологии. В данный момент я дорабатываю соц.сеть написанную на Angular',
		},
	]

	activeProject = signal(1)
	lastId = 5

	project = computed<Project | undefined>(() =>
		this.projectsMenu.find((project) => project.id === this.activeProject())
	)
}
