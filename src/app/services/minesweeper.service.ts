import { computed, Injectable, signal } from '@angular/core'

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

	#countMines = computed(() =>
		this.level === Level.easy
			? this.size
			: this.level === Level.middle
			? this.size ** 2 / 5
			: this.size ** 2 / 4
	)

	#square: number[][] = this.createSquare()
	openSquare = signal(
		Array(this.size)
			.fill(0)
			.map(() => Array(this.size).fill(0))
	)

	createSquare(): number[][] {
		let square = Array(this.size)
			.fill(0)
			.map(() => Array(this.size).fill(0))

		for (let mine = 0; mine < this.#countMines(); ) {
			const x = Math.floor(Math.random() * this.size)
			const y = Math.floor(Math.random() * this.size)
			if (square[x][y] === -1 || (x === 0 && y === 0)) continue
			square[x][y] = -1
			mine++
		}

		square = square.map((line, y) =>
			line.map((cube, x) => {
				if (square[y][x] === -1) return -1
				else {
					let countMines = 0
					for (let offsetY = -1; offsetY <= 1; offsetY++) {
						for (let offsetX = -1; offsetX <= 1; offsetX++) {
							const neighborX = x + offsetX
							const neighborY = y + offsetY

							if (
								neighborX < 0 ||
								neighborY < 0 ||
								neighborX >= this.size ||
								neighborY >= this.size
							)
								continue
							if (square[neighborY][neighborX] === -1) countMines++
						}
					}
					return countMines
				}
			})
		)

		return square
	}

	get getSquare() {
		return this.#square
	}

	resetSquare() {
		this.#square = this.createSquare()
		this.openSquare.set(
			Array(this.size)
				.fill(0)
				.map(() => Array(this.size).fill(0))
		)
	}

	openCube(y: number, x: number, flag = false) {
		const tmp = this.openSquare()
		if (flag) {
			if (tmp[y][x] === 9) tmp[y][x] = 0
			else if (tmp[y][x] === 0) tmp[y][x] = 9
		}
		if (!flag && tmp[y][x] !== 9) tmp[y][x] = this.#square[y][x]

		this.openSquare.set(tmp)

		return false
	}
}
