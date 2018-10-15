class Speed {
  value: number
  abbreviation: string

  display() {
    return `${Number(this.value.toFixed(1))}`
  }
}
export class KilometresPerSecond extends Speed {
  private _KilometresPerSecond: KilometresPerSecond
  value: number
  abbreviation = 'km/s'

  constructor (value: number) {
    super()
    this.value = value
  }

  public toKilometresPerHour?(): KilometresPerHour {
    return new KilometresPerHour(this.value * 3600)
  }
}

export class KilometresPerHour extends Speed {
  private _KilometresPerHour: KilometresPerHour
  value: number
  abbreviation = 'km/h'

  constructor (value: number) {
    super()
    this.value = value
  }

  public toKilometresPerSecond?(): KilometresPerSecond {
    return new KilometresPerSecond(this.value / 3600)
  }
}

export class MetresPerSecond extends Speed {
  private _MetresPerSecond: MetresPerSecond
  value: number
  abbreviation = 'm/s'
  
  constructor (value: number) {
    super()
    this.value = value
  }
  
  public toKilometresPerSecond?(): KilometresPerSecond {
    return new KilometresPerSecond(this.value / 1000)
  }
}