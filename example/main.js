(function () {
	// Get some variables 
var canvas = document.getElementById('range');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height
var value = +canvas.dataset.value;

// draw range with width 50px, and blue / red hard colors
function drawRange( value, x, y, context ) {
	// clear full canvas
	context.clearRect(0, 0, 2 * x, y);
  
  var radius = x - 25;
  
  context.beginPath();
  // set first color
  context.strokeStyle = 'blue';
  context.lineWidth = 50;
  // draw arc center = x,y, start = Pi, end = Pi + value, clockwise
  context.arc(x,y, radius, Math.PI, Math.PI * (1 + value / 100), false);
  
  // Finaly draw arc
  context.stroke();
  context.closePath();
  
  if(value > 50) {
  // draw another part from 90deg
    context.beginPath();
   	context.strokeStyle = 'red';
    context.lineWidth = 50;
 		context.arc(x,y, radius, 3 * Math.PI / 2, Math.PI * (1 + value / 100), false);
 		context.stroke();
    context.closePath();
  }
  // draw contur
  context.beginPath();
  context.arc(x,y, radius + 25, Math.PI, 2 * Math.PI, false);
	context.arc(x,y, radius - 25, Math.PI, 2 * Math.PI, false);
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
  context.closePath();
  // add text
  context.font = "30px Arial";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText(value + "%", canvas.width/2, canvas.height/2 + 20); 
}

drawRange(value,x, y, ctx);

document.querySelector('input[type="range"]').addEventListener('change', function (e) {
	console.log(e.target.value);
	drawRange(e.target.value, x, y, ctx);
})

})();
