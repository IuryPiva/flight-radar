function geometricTransformation(object, tx, ty) {
  if (!object) {
      throw new 'Invalid parameters. Should be a object.';
  }
  if ((tx !== 0 && !tx) || typeof tx !== 'number') {
      throw new 'Invalid parameters. Tx should be a number.';
  }
  if ((ty !== 0 && !ty) || typeof ty !== 'number') {
      throw new 'Invalid parameters. Ty should be a number.';
  }

  if ((object.axisX !== 0 && !object.axisX) || (object.axisY !== 0 && !object.axisY)) {
      throw new 'Invalid object in index ' + index + '. Should have axisX and axisY.';
  }
  object.axisX = object.axisX + tx;
  object.axisY = object.axisY + ty;
  ConvertPolarCartesianService.convertCartesianToPolar(object);

  return object;
}

function scaleTransformation(object, scaleX, scaleY) {
  scaleX = scaleX / 100;
  scaleY = scaleY / 100;

  if (!object.axisX || !object.axisY) {
      throw new 'Invalid object in index ' + index + '. Should have x and y.';
  }

  object.axisX = parseFloat((object.axisX * scaleX)).toFixed(2);
  object.axisY = parseFloat((object.axisY * scaleY)).toFixed(2);
  ConvertPolarCartesianService.convertCartesianToPolar(object);

  return object;
}

function rotationTransformation(object, angleToRotation) {
  if (!object) {
      throw new 'Invalid parameters. Should be a object';
  }
  if ((angleToRotation !== 0 && !angleToRotation) || typeof angleToRotation !== 'number' || angleToRotation < 0 || angleToRotation > 100) {
      throw new 'Invalid parameters. AngleToRotation should be a number, and between 0 and 100.';
  }

  var xCos, ySin, yCos, xSin;

  if ((object.axisX !== 0 && !object.axisX) || (object.axisY !== 0 && !object.axisY)) {
      throw new 'Invalid object. Should have x and y.';
  }

  xCos = parseFloat(object.axisX * (Math.cos(angleToRotation * Math.PI / 180).toFixed(3))).toFixed(3);
  ySin = parseFloat(object.axisY * (Math.sin(angleToRotation * Math.PI / 180).toFixed(3))).toFixed(3);
  yCos = parseFloat(object.axisY * (Math.cos(angleToRotation * Math.PI / 180).toFixed(3))).toFixed(3);
  xSin = parseFloat(object.axisX * (Math.cos(angleToRotation * Math.PI / 180).toFixed(3))).toFixed(3);

  object.axisX = parseFloat((xCos - ySin)).toFixed(2);
  object.axisY = parseFloat(parseFloat(yCos) + parseFloat(xSin)).toFixed(2);
  ConvertPolarCartesianService.convertCartesianToPolar(object);

  return object;
}