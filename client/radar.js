var radar = document.getElementById('radar'),
  diameter = 220,
  radius = diameter / 2,
  padding = 14,
  ctx = Sketch.create({
    container: radar,
    fullscreen: false,
    width: diameter,
    height: diameter
  }),
  dToR = function (degrees) {
    return degrees * (Math.PI / 180);
  },
  sweepAngle = 270,
  sweepSize = 2,
  sweepSpeed = 1.2,
  rings = 4,
  hueStart = 120,
  hueEnd = 170,
  hueDiff = Math.abs(hueEnd - hueStart),
  saturation = 50,
  lightness = 40,
  lineWidth = 2,
  
  
  radar.style.marginLeft = radar.style.marginTop = (-diameter / 2) - padding + 'px';
gradient = ctx.createLinearGradient(radius, 0, 0, 0);
gradient.addColorStop(0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )');
gradient.addColorStop(1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )');

const renderRings = function () {
  for (let i = 0; i < rings; i++) {
    ctx.beginPath();
    ctx.arc(radius, radius, ((radius - (lineWidth / 2)) / rings) * (i + 1), 0, TWO_PI, false);
    ctx.strokeStyle = 'hsla(' + (hueEnd - (i * (hueDiff / rings))) + ', ' + saturation + '%, ' + lightness + '%, 0.1)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };
};

const renderGrid = function () {
  ctx.beginPath();
  ctx.moveTo(radius - lineWidth / 2, lineWidth);
  ctx.lineTo(radius - lineWidth / 2, diameter - lineWidth);
  ctx.moveTo(lineWidth, radius - lineWidth / 2);
  ctx.lineTo(diameter - lineWidth, radius - lineWidth / 2);
  ctx.strokeStyle = 'hsla( ' + ((hueStart + hueEnd) / 2) + ', ' + saturation + '%, ' + lightness + '%, .03 )';
  ctx.stroke();
};

var renderSweep = function () {
  ctx.save();
  ctx.translate(radius, radius);
  ctx.rotate(dToR(sweepAngle));
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, dToR(-sweepSize), dToR(sweepSize), false);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
};

var renderScanLines = function () {
  var i;
  var j;
  ctx.beginPath();
  for (i = 0; i < diameter; i += 2) {
    ctx.moveTo(0, i + .5);
    ctx.lineTo(diameter, i + .5);
  };
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'hsla( 0, 0%, 0%, .02 )';
  ctx.globalCompositeOperation = 'source-over';
  ctx.stroke();
};

ctx.clear = function () {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla( 0, 0%, 0%, 0.1 )';
  ctx.fillRect(0, 0, diameter, diameter);
};

ctx.update = function () {
  sweepAngle += sweepSpeed;
};

ctx.draw = function () {
  ctx.globalCompositeOperation = 'lighter';
  renderRings();
  renderGrid();
  renderSweep();
  renderScanLines();
};