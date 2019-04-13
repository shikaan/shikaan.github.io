export default class Size {
  static BASE_SIZE = 8;
  static BASE_UNIT = "px";

  constructor(rank) {
    this._rank = Number.parseFloat(rank);
  }

  toString() {
    return `${this._rank * Size.BASE_SIZE}${Size.BASE_UNIT}`;
  }

  get px() {
    return this._rank * Size.BASE_SIZE;
  }

  multiply(multiplier) {
    return new Size(this._rank * multiplier);
  }

  /**
   * @param {Size} other
   */
  add(other) {
    if (!other || !(other instanceof Size)) {
      throw new TypeError(`Addend has to be of type Size, ${other.name || typeof other} given`);
    }

    return new Size(this._rank + other._rank);
  }
}
