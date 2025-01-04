import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  period: string;
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
      subtitle:
        'Разработал интерактивную игру "Крестики-нолики" для практики HTML, CSS и JavaScript.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      period: 'Сентябрь 2023 — Октябрь 2023',
      description:
        'Создал веб-приложение с динамическим интерфейсом, используя нативный JavaScript для реализации игровой логики. Применил адаптивную верстку для корректного отображения на разных устройствах. Оптимизировал код для улучшения производительности. Добавил 2 игровых режима: с ботом и с другом. Также у бота есть 3 уровня сложности',
    },
    {
      id: 2,
      title: 'TodoList',
      subtitle:
        'Разработал приложение для управления задачами с использованием React.',
      stack: ['React', 'JavaScript', 'HTML', 'CSS'],
      period: 'Ноябрь 2023 — Декабрь 2023',
      description:
        'Реализовал функционал добавления, редактирования и удаления задач в реальном времени. Организовал структуру компонентов с соблюдением принципов React. Применил стилизацию с использованием модульных CSS и повысил читаемость кода.',
    },
    {
      id: 3,
      title: 'Weather site',
      subtitle:
        'Создал сайт для отображения данных о погоде с использованием React и TypeScript.',
      stack: ['React', 'TypeScript', 'HTML', 'CSS', 'API'],
      period: 'Январь 2024 — Февраль 2024',
      description:
        'Разработал SPA, подключенное к внешнему API для получения актуальной информации о погоде и местоположению. Использовал TypeScript для повышения надежности кода. Настроил интерактивные элементы интерфейса, такие как поиск по городам и визуализация погодных условий.',
    },
    {
      id: 4,
      title: 'Social-media (beta)',
      subtitle:
        'Разработал прототип социальной сети с использованием React и Node.js.',
      stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
      period: 'Март 2024 — Май 2024',
      description:
        'Создал прототип социальной сети с подобием авторизации пользователей, созданием профилей. Реализовал REST API на Node.js и Express, а также базу данных на PostgreSQL. Оптимизировал работу клиент-серверной архитектуры для повышения скорости отклика.',
    },
    {
      id: 5,
      title: 'TodoList (Angular)',
      subtitle:
        'Разработал приложение для управления задачами с использованием Angular.',
      stack: ['Angular', 'TypeScript', 'RxJs', 'SCSS'],
      period: 'Июнь 2024 — Июль 2024',
      description:
        'Реализовал приложение для управления задачами с использованием Angular и standalone компонентов. Создал легко расширяемую архитектуру для упрощения будущих изменений и улучшений.',
    },
    {
      id: 6,
      title: 'Social-media',
      subtitle:
        'Разработал клиентскую часть социальной сети с использованием Angular и взаимодействием с REST API.',
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
      description:
        'Реализовал адаптивный пользовательский интерфейс для прототипа социальной сети. Настроил взаимодействие с REST API для работы с данными пользователей. Применил Angular Router для управления маршрутизацией в приложении.',
    },
  ];

  activeProject = signal(1);
}
