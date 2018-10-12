let radar = document.getElementById('draw-radar').checked,
      renderRings = document.getElementById('draw-polar').checked,
      drawAirships = document.getElementById('draw-airships').checked,
      animateAirships = document.getElementById('animate-airships').checked,
      drawGrid = document.getElementById('draw-grid').checked,
      drawScaleMark = document.getElementById('draw-scale-mark').checked
      if(drawGrid) grid.drawGrid()
  if(drawScaleMark) grid.drawScaleMark()
  if(renderRings) rings.renderRings()
  if(drawAirships) airship.drawAirships()
  if(animateAirships) airship.animateAirships()
  if(radar) {
    sweep.renderSweep()
    sweep.animateSweep()
  }

