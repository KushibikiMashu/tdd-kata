type BeverageName =
  | 'Cola'
  | 'Woo long tea'
  | 'Ilohas'
  | 'Red Bull'

type Beverage = {
  name: BeverageName
  price: number
}

const beverageList: Beverage[] = [
  {name: 'Cola', price: 100},
  {name: 'Woo long tea', price: 100},
  {name: 'Ilohas', price: 100},
  {name: 'Red Bull', price: 200},
]

const buttonIds = ['A', 'B', 'C', 'R'] as const
type ButtonId = typeof buttonIds[number]

export class Coin {
  private readonly allowedValues: number[] = [1, 5, 10, 50, 100, 500]
  value: number

  constructor(value: number) {
    this.validate(value)
    this.value = value
  }

  private validate(value: number) {
    if (!this.allowedValues.includes(value)) {
      throw new Error()
    }
  }

  getValue() {
    return this.value
  }

  equals(coin: Coin): boolean {
    return this.value === coin.getValue()
  }
}

export class VendingMachine {
  private allowedCoins: Coin[] = []
  private allowedCoinValues: number[] = [10, 50, 100, 500]
  private map: Map<ButtonId, Beverage> = new Map()
  private payment: number = 0
  private insertedCoins: Coin[] = []
  private selectedBeverage: Beverage | null = null

  constructor() {
    this.init()
  }

  private init() {
    for (const [index, id] of Object.entries(buttonIds)) {
      const i = Number.parseInt(index, 10)
      this.map.set(id, beverageList[i])
    }

    this.allowedCoins = this.allowedCoinValues.map((value) => new Coin(value))
  }

  insert(coin: Coin): this {
    if (!this.isAllowedCoin(coin)) throw new Error()
    this.payment += coin.getValue()
    this.insertedCoins = [...this.insertedCoins, coin]
    return this
  }

  private isAllowedCoin(coin: Coin): boolean {
    return this.allowedCoins.filter((allowedCoin: Coin) => allowedCoin.equals(coin)).length === 1
  }

  pressButton(id: ButtonId): { beverageName: string, change: Coin[] } {
    const {name, price} = this.getBeverageByButtonId(id)

    if (!this.isPaymentOver(price)) {
      const coins = this.insertedCoins
      this.reset()
      return {beverageName: '', change: coins}
    }
    const change = this.returnChange(price)

    return {beverageName: name, change: change}
  }

  private getBeverageByButtonId(id: ButtonId): Beverage {
    const item = this.map.get(id)
    if (!item) throw new Error()
    return item
  }

  private isPaymentOver(price: number): boolean {
    return this.payment >= price
  }

  private returnChange(price: number): Coin[] {
    let changeValue = this.payment - price
    let changeCoins: Coin[] = []
    const allowedValues = this.allowedCoinValues.reverse()

    for (const value of allowedValues) {
      const count = Math.floor(changeValue / value)
      if (count >= 1) {
        changeCoins = [...changeCoins, ...new Array(count).fill(new Coin(value), 0, count)]
      }
      changeValue = changeValue % value
    }
    this.reset()

    return changeCoins
  }

  private reset() {
    this.payment = 0
    this.insertedCoins = []
  }

  cancel(): Coin[] {
    return this.insertedCoins
  }

  isButtonShining(id: ButtonId): boolean {
    const beverage = this.getBeverageByButtonId(id)
    return this.isPaymentOver(beverage.price)
  }

  select(id: ButtonId): this {
    if (this.payment !== 0) throw new Error()
    this.selectedBeverage = this.getBeverageByButtonId(id)
    return this
  }

  touchCard(card: Card): Beverage['name'] {
    if (this.selectedBeverage === null) throw new Error()
    card.consume(this.selectedBeverage.price)
    return this.selectedBeverage.name
  }
}

interface Card {
  getBalance(): number

  consume(price: number): this
}

export class Suica implements Card {
  constructor(private balance: number) {
  }

  getBalance(): number {
    return this.balance
  }

  consume(price: number): this {
    if (this.balance < price) throw new Error('Short of balance')
    this.balance -= price
    return this
  }
}

export class Visa implements Card {
  constructor(private balance: number) {
  }

  getBalance(): number {
    return this.balance
  }

  consume(price: number): this {
    if (this.balance < price) throw new Error('Short of balance')
    this.balance -= price
    return this
  }
}
