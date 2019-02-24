
function draw() {
  var c = document.getElementById("myCanvas");

  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  var cHeight = c.height;
  var cWidth = c.width;

  var ctx = c.getContext("2d");
  var u = 15;

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

      ctx.beginPath();
      ctx.fillStyle = '#45ADFF';
      // x, y
      // move to point 1
      ctx.moveTo(0 * u + x, 0 * u + y);
      // line 1
      ctx.lineTo(2 * u + x, u + y);
      // line 2
      ctx.lineTo(4 * u + x, 0 * u + y);
      // line 8
      ctx.lineTo(2 * u + x, y - u);
      // line 9
      ctx.moveTo(0 * u + x, 0 * u + y);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#3A90D5';
      ctx.moveTo(0 * u + x, 0 * u + y);
      // line 1
      ctx.lineTo(2 * u + x, u + y);
      // line 7
      ctx.lineTo(2 * u + x, 3 * u + y)
      // line 5
      ctx.lineTo(0 * u + x, 2 * u + y);
      // line 6
      ctx.lineTo(0 * u + x, 0 * u + y);
      ctx.closePath()
      ctx.fill();


      ctx.beginPath();
      ctx.fillStyle = '#3583C1';
      ctx.moveTo(4 * u + x, 0 * u + y);
      // line 3
      ctx.lineTo(4 * u + x, 2 * u + y);
      // line 4
      ctx.lineTo(2 * u + x, 3 * u + y);
      // line 7
      ctx.lineTo(2 * u + x, 1 * u + y);
      // line 2
      ctx.lineTo(4 * u + x, 0 * u + y);
      ctx.closePath();
      ctx.fill();
    }
  }
}

draw();