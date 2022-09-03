import {Coin, VendingMachine} from '../src/vending-machine'

describe('VendingMachine', () => {
  let machine: VendingMachine

  beforeEach(() => {
    machine = new VendingMachine()
  })

  describe('100円コインを投入してからボタンを押すとコーラが出ます。 100円コイン以外は投入できません。', () => {
    test('100円を入れずにボタンを押すと何も出ない', () => {
      const {beverageName} = machine.pressButton('A')
      expect(beverageName).toBe('')
    })

    test('100円コインを投入してからボタンを押すとコーラが出ます', () => {
      const {beverageName} = machine.insert(new Coin(100)).pressButton('A')
      expect(beverageName).toBe('Cola')
    })

    test('100円コイン以外を投入すると、例外を投げる', () => {
      expect(() => {
        machine.insert(new Coin(5))
      }).toThrow()
    })
  })

  describe('押したボタンに応じてコーラかウーロン茶が出る', () => {
    test('ボタンAを押すとコーラが出る', () => {
      const {beverageName} = machine.insert(new Coin(100)).pressButton('A')
      expect(beverageName).toBe('Cola')
    })

    test('ボタンBを押すと烏龍茶が出る', () => {
      const {beverageName} = machine.insert(new Coin(100)).pressButton('B')
      expect(beverageName).toBe('Woo long tea')
    })

    test('ボタンCを押すといろはすが出る', () => {
      const {beverageName} = machine.insert(new Coin(100)).pressButton('C')
      expect(beverageName).toBe('Ilohas')
    })
  })

  describe('200円入れるとレッドブルも買えます', () => {
    test('200円を入れると、レッドブルが出る', () => {
      const {beverageName} = machine.insert(new Coin(100))
        .insert(new Coin(100))
        .pressButton('R')
      expect(beverageName).toBe('Red Bull')
    })

    test('100円を入れても、レッドブルが出ない', () => {
      const {beverageName} = machine.insert(new Coin(100))
        .pressButton('R')
      expect(beverageName).toBe('')
    })

    test('300円を入れると、レッドブルが出る', () => {
      const {beverageName} = machine.insert(new Coin(100))
        .insert(new Coin(100))
        .insert(new Coin(100))
        .pressButton('R')
      expect(beverageName).toBe('Red Bull')
    })
  })

  describe('入れたお金に応じて、買えるもののボタンが光ります', () => {
    test('100円を入れると、ボタン A が光る', () => {
      const actual = machine.insert(new Coin(100)).isButtonShining('A')
      expect(actual).toBeTruthy()
    })

    test('100円を入れないとき、ボタン A が光っていない', () => {
      const actual = machine.isButtonShining('A')
      expect(actual).toBeFalsy()
    })

    test('100円を入れても、ボタン R は光らない', () => {
      const actual = machine.insert(new Coin(100)).isButtonShining('R')
      expect(actual).toBeFalsy()
    })

    test('200円を入れると、ボタン R が光る', () => {
      const actual = machine.insert(new Coin(100)).insert(new Coin(100)).isButtonShining('R')
      expect(actual).toBeTruthy()
    })
  })

  describe('100円コインの他に、10円、50円、500円コインも使えます', () => {
    test('10円を10回を入れると、コーラが買える', () => {
      for (let i = 0; i < 10; i++) {
        machine = machine.insert(new Coin(10))
      }
      const {beverageName} = machine.pressButton('A')
      expect(beverageName).toBe('Cola')
    })

    test('50円を2回を入れると、コーラが買える', () => {
      const {beverageName} = machine.insert(new Coin(50)).insert(new Coin(50)).pressButton('A')
      expect(beverageName).toBe('Cola')
    })

    test('500円を1回を入れると、コーラが買える', () => {
      const {beverageName} = machine.insert(new Coin(500)).pressButton('A')
      expect(beverageName).toBe('Cola')
    })
  })

  describe('ボタンを押して飲み物を買うと、お釣りが出ます', () => {
    test('150円を入れてコーラを買うと50円のお釣りが出る', () => {
      const actual = machine.insert(new Coin(100)).insert(new Coin(50)).pressButton('A')
      expect(actual.beverageName).toBe('Cola')
      expect(actual.change).toEqual([new Coin(50)])
    })

    test('120円を入れてウーロン茶を買うと10円が2枚のお釣りが出る', () => {
      const actual = machine.insert(new Coin(100)).insert(new Coin(10)).insert(new Coin(10)).pressButton('B')
      expect(actual.beverageName).toBe('Woo long tea')
      expect(actual.change).toEqual([new Coin(10), new Coin(10)])
    })
  })

  describe('飲み物を買わなくても、返却ボタンを押すと投入したお金が戻ってきます', () => {
    test('100円を入れて返却ボタンを押すと100円のお釣りが出る', () => {
      const actual = machine.insert(new Coin(100)).cancel()
      expect(actual).toEqual([new Coin(100)])
    })
  })
})
