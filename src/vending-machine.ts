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

// [ ] buy / pressButton を同じメソッドにする
// [ ] Coin を型にする
export class VendingMachine {
  private readonly allowedCoins: number[] = [10, 50, 100, 500]
  private readonly buttonIds = ['A', 'B', 'C', 'R']
  private payment: number = 0
  private map: Map<typeof this.buttonIds[number], Beverage> = new Map()

  constructor() {
    this.init()
  }

  private init() {
    for (const [index, id] of Object.entries(this.buttonIds)) {
      const i = Number.parseInt(index, 10)
      this.map.set(id, beverageList[i])
    }
  }

  buy(id: string): { beverageName: string, change: number } {
    const beverage = this.getBeverageByButtonId(id)
    const change = this.returnChange(beverage.price)

    return {beverageName: beverage.name, change}
  }

  insert(coin: number): this {
    if (!this.isCoinAllowed(coin)) throw new Error()
    this.payment += coin
    return this
  }

  private isCoinAllowed(coin: number): boolean {
    return this.allowedCoins.includes(coin)
  }

  pressButton(id: string): string {
    const {name, price} = this.getBeverageByButtonId(id)
    if (!this.isPaymentOver(price)) return ''
    return name
  }

  private isPaymentOver(price: number): boolean {
    return this.payment >= price
  }

  cancel(): number {
    return this.payment
  }

  returnChange(price: number): number {
    return this.payment - price
  }

  isButtonShining(id: string): boolean {
    const beverage = this.getBeverageByButtonId(id)
    return this.isPaymentOver(beverage.price)
  }

  private getBeverageByButtonId(id: string): Beverage {
    const item = this.map.get(id)
    if (!item) throw new Error()
    return item
  }
}
