
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

  drawShape(ctx, x, y, [
    [0,0],
    [-5*u, 3*u],
    [-3*u, 4*u],
    [0,2*u],
    [3*u,4*u],
    [5*u, 3*u],
    [0,0],
  ], colors[1]);
}

function drawShape(ctx, x, y, points, fill) {
  if (!points.length) {
    return;
  }

  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.moveTo(points[0][0] + x, points[0][1] + y);
  for (var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0] + x, points[i][1] + y);
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

      drawShape(ctx, x, y, [
        [0, 0],
        [2 * u, u],
        [4 * u, 0],
        [2 * u, -u],
        [0, 0]
      ], colors[0]);

      drawShape(ctx, x, y, [
        [0, 0],
        [2 * u, u],
        [2 * u, 3 * u],
        [0, 2 * u],
        [0, 0]
      ], colors[2]);

      drawShape(ctx, x, y, [
        [4 * u, 0],
        [4 * u, 2 * u],
        [2 * u, 3 * u],
        [2 * u, 1 * u],
        [4 * u, 0]
      ], colors[1]);
    }
  }
}

draw();