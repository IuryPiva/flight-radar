import 'bootstrap'
import $ from 'jquery'
import 'jquery-ui'
(window as any).$ = $

import { FlightRadarCanvas } from "./canvas";
import { Grid } from './radar/grid';
import { Rings } from './radar/rings';
import { Airships } from './airship/airships';

const flightRadarCanvas = new FlightRadarCanvas()
const grid = new Grid(flightRadarCanvas.canvas, 10)
const rings = new Rings(grid, 6)
const airships = new Airships

function main() {
  flightRadarCanvas.clean()
  flightRadarCanvas.drawGrid(grid)
  flightRadarCanvas.drawGridScale(grid)
  flightRadarCanvas.drawRings(rings)
  flightRadarCanvas.drawAirships(airships, grid)
}

setTimeout(() => {
  table.drawTable()
  tracker.trackThem()
  setInterval(main, 1000 / FPS)
}, 0)


function masain() {
  if (drawGrid) grid.drawGrid()
  if (drawScaleMark) grid.drawScaleMark()
  if (renderRings) rings.renderRings()
  if (drawAirships) airship.drawAirships()
  if (animateAirships) airship.animateAirships()
  if (radar) {
    sweep.renderSweep()
    sweep.animateSweep()
  }
}

setTimeout(() => {
  table.drawTable()
  tracker.trackThem()
  setInterval(draw, 1000 / FPS)
}, 0)
