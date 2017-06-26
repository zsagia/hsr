export class ProgressHelper {
  total: number;
  public done: number;

  constructor(total: number) {
    this.total = total;
    this.done = 0;
  }

  get percent(): number {
    return Math.ceil(this.done / this.total * 100);
  }
}
