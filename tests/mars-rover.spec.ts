import {Command, Field, main, Rover} from "../src/mars-rover";

// https://danilsuits.github.io/mars-rover-kata/

describe('Input', () => {
  test('入力例を受け取ると、出力例を返す', () => {
    const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`
    const expected = `1 3 N
5 1 E`

    const actual = main(input)
      expect(actual).toBe(expected)
  })
})


describe('Field', () => {
  test('(5, 5)のフィールドの(1, 2)のN向きに設置したroverに命令 LMLMLMLMM を与えると、(1, 3)にN向きにいる', () => {
    const field = new Field([5, 5])
    const rover = new Rover([1, 2], 'N')
    field.add(rover)
    const command = new Command('LMLMLMLMM')
    rover.accept(command)
    const actual = field.getPositions()
    expect(actual[0]).toBe('1 3 N')
  })

  test('(5, 5)のフィールドの(3, 3)のE向きに設置したroverに命令 MMRMMRMRRM を与えると、(5, 1)にE向きにいる', () => {
    const field = new Field([5, 5])
    const rover = new Rover([3, 3], 'E')
    field.add(rover)
    const command = new Command('MMRMMRMRRM')
    rover.accept(command)
    const actual = field.getPositions()
    expect(actual[0]).toBe('5 1 E')
  })

  test('(1, 2)に N向きの rover を設置したら、rover は(1, 2)でN向きである', () => {
    const field = new Field([5, 5])
    const rover = new Rover([1, 2], 'N')
    field.add(rover)
    const actual = field.getPositions()
    expect(actual[0]).toBe('1 2 N')
  })
})

describe('Rover', () => {
  test('Nを向いているとき、Lを受け取るとWを向く', () => {
    const rover = new Rover([0, 0], 'N')
    rover.accept(new Command('L'))
    const actual = rover.getDirection()
    expect(actual).toBe('W')
  })

  test('Nを向いているとき、Rを受け取るとEを向く', () => {
    const rover = new Rover([0, 0], 'N')
    rover.accept(new Command('R'))
    const actual = rover.getDirection()
    expect(actual).toBe('E')
  })

  test('Nを向いているとき、LLLLを受け取るとNを向く', () => {
    const rover = new Rover([0, 0], 'N')
    rover.accept(new Command('LLLL'))
    const actual = rover.getDirection()
    expect(actual).toBe('N')
  })

  test('Nを向いているとき、RRRRを受け取るとNを向く', () => {
    const rover = new Rover([0, 0], 'N')
    rover.accept(new Command('RRRR'))
    const actual = rover.getDirection()
    expect(actual).toBe('N')
  })

  test('Nを向いているとき、Mを受け取ると(0, 1)に進む', () => {
    const rover = new Rover([0, 0], 'N')
    rover.accept(new Command('M'))
    const actual = rover.getPosition()
    expect(actual).toEqual([0, 1])
  })

  test('Eを向いているとき、Mを受け取ると(1, 0)に進む', () => {
    const rover = new Rover([0, 0], 'E')
    rover.accept(new Command('M'))
    const actual = rover.getPosition()
    expect(actual).toEqual([1, 0])
  })

  test('Sを向いているとき、Mを受け取ると(0, -1)に進む', () => {
    const rover = new Rover([0, 0], 'S')
    rover.accept(new Command('M'))
    const actual = rover.getPosition()
    expect(actual).toEqual([0, -1])
  })

  test('Wを向いているとき、Mを受け取ると(-1, 0)に進む', () => {
    const rover = new Rover([0, 0], 'W')
    rover.accept(new Command('M'))
    const actual = rover.getPosition()
    expect(actual).toEqual([-1, 0])
  })
})

describe('Command', () => {
  test('LMRを渡したとき、配列に分解して返す', () => {
    const actual = new Command('LMR').each()
    expect(actual).toEqual(['L', 'M', 'R'])
  })
})
