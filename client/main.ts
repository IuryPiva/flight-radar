import 'bootstrap'
import './scss/app.scss'
import * as $ from 'jquery'
import 'jquery-ui'
(window as any).$ = $

import { FlightRadarCanvas, FPS } from "./canvas";
import { Grid } from './radar/grid';
import { Rings } from './radar/rings';
import { Airships } from './airship/airships';
import { addControlPanelEventListeners } from './airship/control-panel';
import { addTransformationEventListeners } from './controls/transformation';
import { Table } from './controls/table';

const flightRadarCanvas = new FlightRadarCanvas()
const grid = new Grid(flightRadarCanvas.canvas, 10)
const rings = new Rings(grid, 6)
const airships = new Airships([])
const table = new Table()

function main() {
  flightRadarCanvas.clean()
  flightRadarCanvas.drawGrid(grid)
  flightRadarCanvas.drawGridScale(grid)
  flightRadarCanvas.drawRings(rings)
  flightRadarCanvas.drawAirships(airships, grid)
  airships.animate(table)
}

setTimeout(() => {
  addControlPanelEventListeners(airships, table)
  addTransformationEventListeners(airships)
  setInterval(main, 1000 / FPS)
}, 0)
