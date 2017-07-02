/**
 * Main Class
 */

const defaultOptions = {
	type: 'canvas',
	colors: ['green','red'],
	separators: [0,75,100],
	shape: 'rect',
	border: 2,
	borderColor: '#000',
	showValue: false,
	scaleFactor: 1,
	width: 200,
	height: 30,
	fontSize: 20,
	fontFamily: 'Arial'
};

class MultiColorBar {
	constructor (value, parent, options={}) {
		this._options = {};
		this._value = value;
		this._options = Object.assign({}, defaultOptions, options);
		this._context = this._prepare(parent);
	}

	updateValue(newValue) {
		this.value = newValue;
		this.render();
	}

	render() {
		this._draw();
	}

	 _prepare(element) {
      let canvas = document.createElement('canvas');
      canvas.width = this._options.width;
      canvas.height = this._options.height + (this._options.showValue ? this._options.fontSize: 0);
      element.appendChild(canvas);
      return canvas.getContext('2d');
   }

	_draw() {
		switch(this._options.shape) {
			case 'rect' : 
			this._drawRect();
			break;
		  case 'arc':
			this._drawArc();
			break;
		  case 'circ':
		  case 'circle':
			this._drawCircle();
			break;
		  default: 
			this._drawRect();
		   break;
		}
   }

	_drawRect() {
		let options = this._options;
		let value = this._value;
		let width = options.width;
		let height = options.height;
		let border = options.border;
		let coord = {
			x: 0,
			y: 0
		};
		let context = this._context;
		context.beginPath();
		//clear
		context.clearRect(0,0,width,2*height);
		
		// draw parts of bar
		options.colors.forEach( (color, index) => {
			if(value > options.separators[index]/100) {
				var  currentWidth = width * (value - options.separators[index]/100);
				var x = coord.x + options.separators[index]/100 * width;
			}
			context.fillStyle = color;
			context.fillRect(x, coord.y, currentWidth, height);
		});

		// Draw borders
		context.lineWidth = border;
		context.strokeRect(coord.x, coord.y, width, height);
		
		// Show value
		if(options.showValue) {
			context.font = `${options.fontSize}px ${options.fontFamily}`;
			context.fillStyle = options.borderColor;
			context.textAlign = "center";
			context.fillText(Math.round(value * options.scaleFactor), width/2, height +  options.fontSize); 
		}
	}
}

export default MultiColorBar;
