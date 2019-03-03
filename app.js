
function draw() {
  var c = document.getElementById("myCanvas");

  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  var cHeight = c.height;
  var cWidth = c.width;

  var ctx = c.getContext("2d");
  var u = 15;

  drawSquares(cHeight, cWidth, ctx, u);
}

function drawSquareInSquare(cHeight, cWidth, ctx, u) {
  let colors = ['#3583C1', '#3A90D5', '#45ADFF'];
  let x = u * 10; y = u * 10;

  drawShape(ctx, [
    [x,y],
    [-5*u+x, 3*u+y],
    [-3*u+x, 4*u+y],
    [x,2*u+y],
    [3*u+x,4*u+y],
    [5*u+x, 3*u+y],
    [x,y],
  ], colors[1]);
}

function twoDPointFunc(func, point) {
  if (!point.length || point.length != 2 || !func) {
    return;
  }
  func(point[0], point[1]);
}

function drawShape(ctx, points, fill) {
  if (!points.length) {
    return;
  }

  ctx.beginPath();
  ctx.fillStyle = fill;
  twoDPointFunc(ctx.moveTo.bind(ctx), points[0]);
  for (var i = 1; i < points.length; i++) {
    twoDPointFunc(ctx.lineTo.bind(ctx), points[i]);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSquares(cHeight, cWidth, ctx, u) {
  function x_coord(i, j, u) {
    if (!j) {
      j = 0;
    }
    return 0 + i * u * 4 + (j % 2) * -2 * u;
  }

  function y_coord(j, u) {
    return 0 + j * u * 3;
  }

  for (var i = 0; x_coord(i, j, u) < cWidth + 2 * u; i++) {
    for (var j = 0; y_coord(j, u) < cHeight + 2 * u; j++) {
      var x = x_coord(i, j, u);
      var y = y_coord(j, u);

      let colors = ['#3583C1', '#3A90D5', '#45ADFF'];

      drawShape(ctx, [
        [x, y],
        [2 * u + x, u + y],
        [4 * u + x, y],
        [2 * u + x, y - u],
        [x, y]
      ], colors[0]);

      drawShape(ctx, [
        [x, y],
        [2 * u + x, u + y],
        [2 * u + x, 3 * u + y],
        [x, 2 * u + y],
        [x, y]
      ], colors[2]);

      drawShape(ctx, [
        [4 * u + x, y],
        [4 * u + x, 2 * u + y],
        [2 * u + x, 3 * u + y],
        [2 * u + x, 1 * u + y],
        [4 * u + x, y]
      ], colors[1]);
    }
  }
}

draw();