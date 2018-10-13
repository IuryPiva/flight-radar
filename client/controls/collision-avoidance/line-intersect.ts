import { Cartesian } from "../../utils/coordinate";

let COLINEAR = intersectResult('colinear');
let PARALLEL = intersectResult('parallel');
let NONE = intersectResult('none');

export class LineIntersection {
  point: Cartesian
  type: string

  constructor(point: Cartesian, type: string) {
    this.point = point
    this.type = type
  }
}

export function colinearPointWithinSegment(point:Cartesian, start: Cartesian, end: Cartesian) {
  if (start.x != end.x) {
    if (start.x <= point.x && point.x <= end.x) return true;
    if (start.x >= point.x && point.x >= end.x) return true;
  } else {
    if (start.y <= point.y && point.y <= end.y) return true;
    if (start.y >= point.y && point.y >= end.y) return true;
  }

  return false;
}

export function checkIntersection(point1: Cartesian, point2: Cartesian, point3: Cartesian, point4: Cartesian) {
  let denom = (point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y);
  let numeA = (point4.x - point3.x) * (point1.y - point3.y) - (point4.y - point3.y) * (point1.x - point3.x);
  let numeB = (point2.x - point1.x) * (point1.y - point3.y) - (point2.y - point1.y) * (point1.x - point3.x);

  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return COLINEAR;
    }

    return PARALLEL;
  }

  let uA = numeA / denom;
  let uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return intersecting({
      x: point1.x + uA * (point2.x - point1.x),
      y: point1.y + uA * (point2.y - point1.y)
    });
  }

  return NONE;
}

function intersecting(point): LineIntersection {
  let result = intersectResult('intersecting');
  result.point = point;
  return result;
}

function intersectResult(type) {
 return new LineIntersection(null, type)
}