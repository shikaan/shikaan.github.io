export default class Size {
  static BASE_SIZE = 8
  static BASE_UNIT = 'px'

  constructor (rank) {
    this._rank = Number.parseFloat(rank)
  }

  toString() {
    return `${this._rank * Size.BASE_SIZE}${Size.BASE_UNIT}`
  }

  get px () {
    return this._rank * Size.BASE_SIZE
  }

  multiply(multiplier) {
    return `${this._rank * Size.BASE_SIZE * multiplier}${Size.BASE_UNIT}`
  }

  add(addendInPixel) {
    return `${this._rank * Size.BASE_SIZE + addendInPixel}${Size.BASE_UNIT}`
  }
}
