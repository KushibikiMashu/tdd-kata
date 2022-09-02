export class VendingMachine {
  private readonly allowedCoins: number[] = [10, 50, 100, 500]
  private payment: number = 0

  insert(coin: number): this {
    if (!this.isCoinAllowed(coin)) throw new Error()
    this.payment += coin

    return this
  }

  pressButton(id: string): string {
    if (!this.isOver(100)) return ''
    switch (id) {
      case 'A':
        return 'Cola'
      case 'B':
        return 'Woo long tea'
      case 'C':
        return 'Ilohas'
    }

    if (!this.isOver(200)) return ''
    switch (id) {
      case 'R':
        return 'Red Bull'
      default:
        throw new Error()
    }
  }

  private isOver(payment: number): boolean {
    return this.payment >= payment
  }

  isShining(id: string): boolean {
    const is100yenItems = ['A', 'B', 'C'].includes(id) && this.isOver(100)
    if (is100yenItems) return true

    const is200yenItems = 'R' === id
    if (is200yenItems && this.isOver(200)) return true

    return false
  }

  private isCoinAllowed(coin: number): boolean {
    return this.allowedCoins.includes(coin)
  }
}
