import 'bootstrap'
import './scss/app.scss'
import * as $ from 'jquery'
import 'jquery-ui'
(window as any).$ = $
const fpsMeter = new (window as any).Stats();
fpsMeter.showPanel( 0 );
document.getElementById('app-status').appendChild( fpsMeter.dom );
const msMeter = new (window as any).Stats();
msMeter.showPanel( 1 );
document.getElementById('app-status').appendChild( msMeter.dom );
const mbMeter = new (window as any).Stats();
mbMeter.showPanel( 2 );
document.getElementById('app-status').appendChild( mbMeter.dom );

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
import { testCollisionAirships90Degrees } from './controls/collision-avoidance/tests/airships-90-degrees';

const flightRadarCanvas = new FlightRadarCanvas()
const grid = new Grid(flightRadarCanvas.canvas, 10)
const rings = new Rings(grid, 6)
const table = new Table()
const airships = new Airships(table, testCollisionAirships90Degrees)
const tracker = new Tracker()

function main() {

	fpsMeter.begin();
	msMeter.begin();
	mbMeter.begin();

  flightRadarCanvas.clean()
  flightRadarCanvas.drawGridScale(grid)
  if(drawGrid()) flightRadarCanvas.drawGrid(grid)
  if(renderRings()) flightRadarCanvas.drawRings(rings)
  if(drawAirships()) flightRadarCanvas.drawAirships(airships, grid)
  if(animateAirships()) airships.animate(table)
  if(mayTrack()) tracker.trackThem(airships)
  if(bounce()) bounceOnBorders(airships, grid)

  fpsMeter.end();
  msMeter.end();
  mbMeter.end();
}

setTimeout(() => {
  addControlPanelEventListeners(airships)
  addTransformationEventListeners(airships)
  setInterval(requestAnimationFrame, 1000 / FPS, main)
}, 0)
