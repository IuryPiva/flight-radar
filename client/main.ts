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
import { Tracker } from './controls/tracker';
import { renderRings, drawGrid, drawAirships, animateAirships, bounce, mayTrack } from './controls/features'
import { bounceOnBorders } from './airship/animation';

const flightRadarCanvas = new FlightRadarCanvas()
const grid = new Grid(flightRadarCanvas.canvas, 10)
const rings = new Rings(grid, 6)
const airships = new Airships([])
const table = new Table()
const tracker = new Tracker()

function main() {
  flightRadarCanvas.clean()
  if(drawGrid()) flightRadarCanvas.drawGrid(grid)
  flightRadarCanvas.drawGridScale(grid)
  if(renderRings()) flightRadarCanvas.drawRings(rings)
  if(drawAirships()) flightRadarCanvas.drawAirships(airships, grid)
  if(animateAirships()) airships.animate(table)
  if(mayTrack()) tracker.trackThem(airships)
  if(bounce()) bounceOnBorders(airships, grid)
}

setTimeout(() => {
  addControlPanelEventListeners(airships, table)
  addTransformationEventListeners(airships)
  setInterval(main, 1000 / FPS)
}, 0)
