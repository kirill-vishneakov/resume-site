import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinesweeperComponent {

}
