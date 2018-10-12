export class KilometresPerSecond {
  private _KilometresPerSecond: KilometresPerSecond
  value: number
  abbreviation = 'km/s'

  constructor (value: number) {
    this.value = value
  }

  public toKilometresPerHour?(): KilometresPerHour {
    return new KilometresPerHour(this.value * 3600)
  }
}

export class KilometresPerHour {
  private _KilometresPerHour: KilometresPerHour
  value: number
  abbreviation = 'km/h'

  constructor (value: number) {
    this.value = value
  }

  public toKilometresPerSecond?(): KilometresPerSecond {
    return new KilometresPerSecond(this.value / 3600)
  }
}

export class MetresPerSecond {
  private _MetresPerSecond: MetresPerSecond
  value: number
  
  constructor (value: number) {
    this.value = value
  }
  
  public toKilometresPerSecond?(): KilometresPerSecond {
    return new KilometresPerSecond(this.value * 1000)
  }
}