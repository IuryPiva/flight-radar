interface IDegrees {
  value: Number
}

interface ICartesian {
  x: Number,
  y: Number
}

interface ICartesianPerSecond {
  value: Number,
  toKilometresPerHour?(): IKilometresPerHour
}

class CartesianPerSecond implements ICartesianPerSecond {
  value

  toKilometresPerHour(): IKilometresPerHour {
    return {
      value: this.value * 1000
    }
  }
}

interface IKilometresPerHour {
  value: Number,
  toCartesianPerSecond?(): ICartesianPerSecond
}

interface IPixel {
  value: Number
}

class Airship {
  id: String
  position: ICartesian
  direction: IDegrees
  speed: CartesianPerSecond
  width: IPixel = { value: 32 }
  height: IPixel = { value: 32 }
  blinks = 0
  accelerateTo: ICartesianPerSecond
  maxAcceleration: ICartesianPerSecond = { value: 14.7 / 1000 }
  navigateTo: ICartesian
  changeDirectionTo: IDegrees

  constructor( position: ICartesian, direction: IDegrees, speed: IKilometresPerHour ) {
    this.position = position
    this.direction = direction
    this.speed = speed
    this.id
    this.z
  }
}