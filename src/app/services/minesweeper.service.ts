import { Injectable } from '@angular/core'

export enum Level {
	easy = 'easy',
	middle = 'middle',
	hard = 'hard',
}

@Injectable({
	providedIn: 'root',
})
export class MinesweeperService {
	size = 5
	level = Level.easy

	countMines =
		this.level === Level.easy
			? this.size
			: this.level === Level.middle
			? this.size ** 2 / 5
			: this.size ** 2 / 4

	square = this.createSquare(this.size, this.countMines)

	// easy - size <= 10 - size
	// middle - 6 <= size <= 10 - size**2 / 5
	// hard - 10 <= size size**2 / 4

	createSquare(size: number, countMines: number): number[][] {
		let arr = []
		for (let i = 0; i < size; i++) {
			arr[i] = new Array(size)
			for (var j = 0; j < size; j++) {
				if (countMines > 0) {
					Math.random() > 0.5 ? (arr[i][j] = 0) : 1
				} else {
					arr[i][j] = i + j
				}
			}
		}
		return arr
	}

	outBounds(x: number, y: number, size: number): boolean {
		return (x < 0) || (y < 0) || (x >= size) || (y >= size)
	}

	calcNear(x: number, y: number, mines: number[][], size: number): number {
		let i = 0
		for (let offsetX = -1; offsetX <= 1; offsetX++) {
			for (let offsetY = -1; offsetY <= 1; offsetY++) {
				if (this.outBounds(offsetX + x, offsetY + y, size)) continue
				i += mines[offsetX + x][offsetY + y]
			}
		}
		return i
	}
}
