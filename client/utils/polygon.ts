import { Cartesian } from "./coordinate";
import { Grid } from "../radar/grid";
import { PixelCoordinate } from "../canvas";

export class Polygon {
  private _Polygon: Polygon
  points: Cartesian[] = []

  constructor(points: Cartesian[] = []){
    this.points = points
  }

  add(point: Cartesian){
    this.points.push(point)
  }
  
  checkCollision(point: Cartesian) {
    const {x, y} = point
  
    let inside = false;
    for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
      let xi = this.points[i].x, yi = this.points[i].y
      let xj = this.points[j].x, yj = this.points[j].y
      
      let intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside;
    }    
    return inside
  }

  toPixels(grid: Grid) {
    const pixelPolygon = []
    
    this.points.forEach(point => {
      pixelPolygon.push(point.toPixelCoordinate(grid))
    })
    
    return new PolygonPixels(pixelPolygon)
  }
}


export class PolygonPixels {
  private _PolygonPixels: PolygonPixels
  points: PixelCoordinate[] = []

  constructor(points: PixelCoordinate[] = []){
    this.points = points
  }        
}