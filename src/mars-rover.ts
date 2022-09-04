type Position = [number, number]
type Range = [number, number]
type Direction = 'N' | 'E' | 'S' | 'W'

export class Command {
  constructor(private readonly command: string) {
  }

  each(): string[] {
    return this.command.split('')
  }
}

export class Rover {
  constructor(private position: Position, private direction: Direction) {
  }

  accept(command: Command) {
    const commands = command.each()

    for (const com of commands) {
      const [x, y] = this.position

      switch (this.direction) {
        case 'N':
          if (com === 'L') {
            this.direction = 'W'
          } else if (com === 'R') {
            this.direction = 'E'
          } else {
            this.position = [x, y + 1]
          }
          break
        case 'E':
          if (com === 'L') {
            this.direction = 'N'
          } else if (com === 'R') {
            this.direction = 'S'
          } else {
            this.position = [x + 1, y]
          }
          break
        case 'S':
          if (com === 'L') {
            this.direction = 'E'
          } else if (com === 'R') {
            this.direction = 'W'
          } else {
            this.position = [x, y - 1]
          }
          break
        case 'W':
          if (com === 'L') {
            this.direction = 'S'
          } else if (com === 'R') {
            this.direction = 'N'
          } else {
            this.position = [x - 1, y]
          }
          break
        default:
          throw new Error()
      }
    }

  }

  getDirection(): Direction {
    return this.direction
  }

  getPosition(): Position {
    return this.position
  }
}

export class Field {
  private rovers: Rover[] = []

  constructor(private range: Range) {
  }

  add(rover: Rover) {
    this.rovers = [...this.rovers, rover]
  }

  getPositions(): string[] {
    return this.rovers.map((rover) => {
      const position = rover.getPosition().join(' ')
      const direction = rover.getDirection()
      return `${position} ${direction}`
    })
  }
}
