export class KilometresPerSecond {
  private _KilometresPerSecond: KilometresPerSecond
  value: number

  constructor (value: number) {
    this.value = value
  }

  public toKilometresPerHour?(): KilometresPerHour {
    return { value: this.value * 3600 } as KilometresPerHour
  }
}

export class KilometresPerHour {
  private _KilometresPerHour: KilometresPerHour
  value: number

  constructor (value: number) {
    this.value = value
  }

  public toKilometresPerSecond?(): KilometresPerSecond {
    return ({ value: this.value / 3600} as KilometresPerSecond)
  }
}
