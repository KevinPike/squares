
let clickCounter = 0;
let u = 15;
function draw() {
  var c = document.getElementById("myCanvas");

  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  var cHeight = c.height;
  var cWidth = c.width;

  var ctx = c.getContext("2d");

  function drawUsingClickCounter() {
    if (clickCounter % 2) {
      drawSquareInSquare(cHeight, cWidth, ctx);
      return;
    }

    drawSquares(cHeight, cWidth, ctx);
  }

  c.onclick = function() {
    clickCounter++;
    u += 5 * Math.cos(Math.PI * (clickCounter % 4) / 3);
    drawUsingClickCounter();
  }

  drawUsingClickCounter();
}

// dark, middle, light
const colors = ['#1b2e65','#4a6cce', '#9aade4'];
const strokeColor = colors[0];

const theta = Math.PI/6;
const adjacent = 2;
const opposite = adjacent * Math.tan(theta);
const hypotenuse = Math.sqrt(adjacent * adjacent + opposite * opposite);

function rotate(points, theta) {
  return points.map(function(point) {
    const x = point[0];
    const y = point[1];
    return [
      x * Math.cos(theta) - y * Math.sin(theta),
      y * Math.cos(theta) + x * Math.sin(theta)
    ];
  });
}

function drawSquareInSquare(cHeight, cWidth, ctx) {

  const outerX = adjacent * 3;

  let rowsDrawn = 0;
  const yDistanceApart = (3 * hypotenuse + outerX * Math.sin(theta)) * u;
  for (let y = 0; y < cHeight + yDistanceApart; y += yDistanceApart) {
    for (let x = 0 + (rowsDrawn % 2) * - outerX * u; x < cWidth; x += outerX * 2 * u) {
      const outer = [
        [0, 0],
        [outerX, -3*opposite],
        [outerX*2, 0],
        [adjacent*5, opposite],
        [outerX, -opposite],
        [adjacent, opposite],
        [0, 0]
      ];

      // top
      drawShape(ctx, x, y, u, outer, colors[0]);
      // right
      drawShape(ctx, x + adjacent*6*u, y, u, rotate(outer, 2/3 * Math.PI), colors[1]);
      // left
      drawShape(ctx, x + outerX*u, y+9*opposite*u, u, rotate(outer, 4/3 * Math.PI), colors[2]);

      const innerX = Math.sqrt(Math.pow(2 * hypotenuse, 2) - Math.pow(hypotenuse, 2));

      const inner = [
        [0, 0],
        [innerX, -hypotenuse],
        [innerX, 0],
        [hypotenuse * Math.sin(2 * theta), hypotenuse * Math.cos(2 * theta)],
        [hypotenuse * Math.sin(2 * theta), 2 * hypotenuse - hypotenuse * Math.cos(2 * theta)],
        [0, 2 * hypotenuse],
        [0, 0]
      ];

      // left
      drawShape(ctx, x + adjacent * u, y + opposite * u, u, inner, colors[1]);
      // right
      drawShape(ctx, x + (adjacent + innerX * 2) * u, y + opposite * u, u, rotate(inner, 2/3 * Math.PI), colors[2]);
      // bottom
      drawShape(ctx, x + (adjacent + innerX) * u, y + (3 *  hypotenuse + opposite) * u, u, rotate(inner, 4/3 * Math.PI), colors[0]);

      const squareFace = [
        [0, 0],
        [adjacent, opposite],
        [2*adjacent, 0],
        [adjacent, -opposite],
        [0, 0]
      ];

      // top
      const squareShiftX = (2 * adjacent)
      drawShape(ctx, x + squareShiftX * u, y + hypotenuse * u, u, squareFace, colors[0]);
      // left
      drawShape(ctx, x + squareShiftX * u, y + hypotenuse * u, u, rotate(squareFace, 1/3 * Math.PI), colors[2]);
      // right
      drawShape(ctx, x + squareShiftX * u + adjacent * 2 * u, y + hypotenuse * u, u, rotate(squareFace, 2/3 * Math.PI), colors[1]);

      if (y % 2 == 1) {
        x += outerX * u;
      }
    }
    rowsDrawn++;
  }
}

function drawShape(ctx, x, y, u, points, fill) {
  if (!points.length) {
    return;
  }

  ctx.beginPath();
  ctx.fillStyle = fill;
  if (fill != strokeColor) {
    ctx.strokeStyle = strokeColor;
  }

  ctx.moveTo(points[0][0] * u + x, points[0][1] * u + y);
  for (var i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0] * u + x, points[i][1] * u + y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawSquares(cHeight, cWidth, ctx) {
  function x_coord(i, j) {
    if (!j) {
      j = 0;
    }
    return i * u * 2 * adjacent + (j % 2) * -adjacent * u;
  }

  function y_coord(j) {
    return j * u * (hypotenuse * (1 + Math.cos(2 * theta)));
  }

  for (var i = 0; x_coord(i, j) < cWidth + 2 * u; i++) {
    for (var j = 0; y_coord(j) < cHeight + 2 * u; j++) {
      var x = x_coord(i, j);
      var y = y_coord(j);

      const squareFace = [
        [0, 0],
        [adjacent, opposite],
        [2*adjacent, 0],
        [adjacent, -opposite],
        [0, 0]
      ];

      // top
      drawShape(ctx, x, y, u, squareFace, colors[0]);
      // left
      drawShape(ctx, x, y, u, rotate(squareFace, 1/3 * Math.PI), colors[2]);
      // right
      drawShape(ctx, x+adjacent * 2 * u, y, u, rotate(squareFace, 2/3 * Math.PI), colors[1]);
    }
  }
}

draw();