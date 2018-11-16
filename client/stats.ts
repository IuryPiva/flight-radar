import { Config } from "./config";

export class Stats {
  mode = 0;
  beginTime
  prevTime
  panelTime
  frames
  panelFrames
  fpsPanel
  msPanel
  memPanel
  fps = Config.FPS

  container: HTMLDivElement = document.createElement('div');

  constructor() {
    this.container.style.cssText = 'cursor:pointer;opacity:0.9;';

    this.beginTime = Date.now()
    this.prevTime = this.beginTime
    this.panelTime = this.beginTime
    this.frames = 0
    this.panelFrames = 0

    this.fpsPanel = this.addPanel(Stats.Panel('FPS', '#0ff', '#002'));

    this.showPanel(0)
  }

  showPanel(id, showAll?) {
    if(showAll) {
      for (var i = 0; i < this.container.children.length; i++) {
        (this.container.children[i] as HTMLElement).style.display = 'inline'
      }
    } else {
      for (var i = 0; i < this.container.children.length; i++) {
        (this.container.children[i] as HTMLElement).style.display = i === id 
            ? 'block' 
            : 'none';
      }
    }
    this.mode = id;
  }

  addPanel(panel) {
    this.container.appendChild(panel.dom);
    return panel;

  }

  REVISION = 16
  dom = this.container

  begin() {
    this.beginTime = Date.now()
  }

  end() {
    this.frames++;
    this.panelFrames++;
    var time = Date.now();

    if(time > this.prevTime + 50) {
      this.prevTime = time;
      this.frames = 0;
    } else
    if (time >= this.prevTime+40) {
      this.fps = (this.frames * 1000) / (time - this.prevTime)

      this.prevTime = time;
      this.frames = 0;
    }
    if (time >= this.panelTime + 1000) {
      this.fpsPanel.update((this.panelFrames * 1000) / (time - this.panelTime), 100);

      this.panelTime = time;
      this.panelFrames = 0;
    }
    return time;
  }

  update() {
    this.beginTime = this.end();
  }

  static Panel(name, fg, bg) {

    var min = Infinity,
      max = 0,
      round = Math.round;
    var PR = round(window.devicePixelRatio || 1);

    var WIDTH = 80 * PR,
      HEIGHT = 48 * PR,
      TEXT_X = 3 * PR,
      TEXT_Y = 2 * PR,
      GRAPH_X = 3 * PR,
      GRAPH_Y = 15 * PR,
      GRAPH_WIDTH = 74 * PR,
      GRAPH_HEIGHT = 30 * PR;

    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.cssText = 'width:80px;height:48px';

    var context = canvas.getContext('2d');
    context.font = 'bold ' + (9 * PR) + 'px Helvetica,Arial,sans-serif';
    context.textBaseline = 'top';

    context.fillStyle = bg;
    context.fillRect(0, 0, WIDTH, HEIGHT);

    context.fillStyle = fg;
    context.fillText(name, TEXT_X, TEXT_Y);
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

    context.fillStyle = bg;
    context.globalAlpha = 0.9;
    context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

    return {

      dom: canvas,

      update: function (value, maxValue) {

        min = Math.min(min, value);
        max = Math.max(max, value);

        context.fillStyle = bg;
        context.globalAlpha = 1;
        context.fillRect(0, 0, WIDTH, GRAPH_Y);
        context.fillStyle = fg;
        context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);

        context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);

        context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);

        context.fillStyle = bg;
        context.globalAlpha = 0.9;
        context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - (value / maxValue)) * GRAPH_HEIGHT));
      }
    };
  }
}