import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MinesweeperService } from '../../../services/minesweeper.service'

@Component({
  selector: 'app-minesweeper',
  standalone: true,
  imports: [],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinesweeperComponent {
  mineService = inject(MinesweeperService)
  
}
