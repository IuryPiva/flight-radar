import { Stats } from './stats'
import { FlightRadarCanvas } from "./canvas";
import { Grid } from './radar/grid';
import { Rings } from './radar/rings';
import { Airships } from './airship/airships';
import { addControlPanelEventListeners } from './airship/control-panel';
import { addTransformationEventListeners } from './controls/transformation';
import { Table } from './controls/table';
import { Tracker } from './controls/tracker';
import { renderRings, drawGrid, drawAirships, animateAirships, bounce, mayTrack, shouldAvoidCollision } from './controls/features'
import { bounceOnBorders } from './airship/animation';
import { testCollisionAirships90Degrees } from './controls/collision-avoidance/tests/airships-90-degrees';
import { testCollisionAirships45Degrees } from './controls/collision-avoidance/tests/airships-45-degrees';
import { testCollisionAirships135Degrees } from './controls/collision-avoidance/tests/airships-135-degrees';
import { testAirshipsRandom } from './controls/collision-avoidance/tests/airships-random';
import { avoidCollisionPairs } from './controls/collision-avoidance/avoid-collision-ai';
import { Config } from './config';
import { testAirshipsSameDirection } from './controls/collision-avoidance/tests/airships-same-direction';
import { Play } from './player/play';

const fpsMeter = new Stats();
fpsMeter.showPanel( 0, true );
document.getElementById('app-status').appendChild( fpsMeter.dom );

const flightRadarCanvas = new FlightRadarCanvas()
const grid = new Grid(flightRadarCanvas.canvas)
const rings = new Rings(grid, 6)
const table = new Table()
const airships = new Airships(table)
const tracker = new Tracker();

async function main() {
  fpsMeter.begin();

  flightRadarCanvas.clean()
  flightRadarCanvas.drawGridScale(grid)
  if(drawGrid()) flightRadarCanvas.drawGrid(grid)
  if(renderRings()) flightRadarCanvas.drawRings(rings)
  if(drawAirships()) flightRadarCanvas.drawAirships(airships, grid)
  if(animateAirships()) airships.animate(table)
  if(mayTrack()) tracker.trackThem(airships)
  if(bounce()) bounceOnBorders(airships, grid)
  if(shouldAvoidCollision()) avoidCollisionPairs(airships)

  table.updateRow(airships)

  fpsMeter.end();
  Config.FPS = fpsMeter.fps
}

setTimeout(() => {
  addControlPanelEventListeners(airships)
  addTransformationEventListeners(airships)
  setInterval(requestAnimationFrame, 1000 / Config.FPS, main)
  new Play()
}, 0)
