import {VendingMachine} from '../src/vending-machine'

describe('VendingMachine', () => {
  let machine: VendingMachine

  beforeEach(() => {
    machine = new VendingMachine()
  })

  describe('100円コインを投入してからボタンを押すとコーラが出ます。 100円コイン以外は投入できません。', () => {
    test('100円を入れずにボタンを押すと何も出ない', () => {
      const actual = machine.pressButton('A')
      expect(actual).toBe('')
    })

    test('100円コインを投入してからボタンを押すとコーラが出ます', () => {
      const actual = machine.insert(100).pressButton('A')
      expect(actual).toBe('Cola')
    })

    test('100円コイン以外を投入すると、例外を投げる', () => {
      expect(() => {
        machine.insert(5)
      }).toThrow()
    })
  })

  describe('押したボタンに応じてコーラかウーロン茶が出る', () => {
    test('ボタンAを押すとコーラが出る', () => {
      const actual = machine.insert(100).pressButton('A')
      expect(actual).toBe('Cola')
    })

    test('ボタンBを押すと烏龍茶が出る', () => {
      const actual = machine.insert(100).pressButton('B')
      expect(actual).toBe('Woo long tea')
    })

    test('ボタンCを押すといろはすが出る', () => {
      const actual = machine.insert(100).pressButton('C')
      expect(actual).toBe('Ilohas')
    })
  })

  describe('200円入れるとレッドブルも買えます', () => {
    test('200円を入れると、レッドブルが出る', () => {
      const actual = machine.insert(100)
        .insert(100)
        .pressButton('R')
      expect(actual).toBe('Red Bull')
    })

    test('100円を入れても、レッドブルが出ない', () => {
      const actual = machine.insert(100)
        .pressButton('R')
      expect(actual).toBe('')
    })

    test('300円を入れると、レッドブルが出る', () => {
      const actual = machine.insert(100)
        .insert(100)
        .insert(100)
        .pressButton('R')
      expect(actual).toBe('Red Bull')
    })
  })

  describe('入れたお金に応じて、買えるもののボタンが光ります', () => {
    test('100円を入れると、ボタン A が光る', () => {
      const actual = machine.insert(100).isShining('A')
      expect(actual).toBeTruthy()
    })

    test('100円を入れないとき、ボタン A が光っていない', () => {
      const actual = machine.isShining('A')
      expect(actual).toBeFalsy()
    })

    test('100円を入れても、ボタン R は光らない', () => {
      const actual = machine.insert(100).isShining('R')
      expect(actual).toBeFalsy()
    })

    test('100円を入れても、ボタン Z は光らない', () => {
      const actual = machine.insert(100).isShining('Z')
      expect(actual).toBeFalsy()
    })

    test('200円を入れると、ボタン R が光る', () => {
      const actual = machine.insert(100).insert(100).isShining('R')
      expect(actual).toBeTruthy()
    })
  })

  describe('100円コインの他に、10円、50円、500円コインも使えます', () => {
    test('10円を10回を入れると、コーラが買える', () => {
      for (let i = 0; i < 10; i++) {
        machine = machine.insert(10)
      }
      const actual = machine.pressButton('A')
      expect(actual).toBe('Cola')
    })

    test('50円を2回を入れると、コーラが買える', () => {
      const actual = machine.insert(50).insert(50).pressButton('A')
      expect(actual).toBe('Cola')
    })

    test('500円を1回を入れると、コーラが買える', () => {
      const actual = machine.insert(500).pressButton('A')
      expect(actual).toBe('Cola')
    })
  })
})
