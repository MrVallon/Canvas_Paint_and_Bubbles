const app = function (mode) {
	
	const canvasWidth = 600;
	const canvasHeight = 400;
	
	circles = [];
	
	const options = {
		mode: mode,
		speed: 20,
	};
	
	Circle = function (x, y, radius) {
		
		this.radius = radius ? radius : randomInteger(7, 20);
		this.color = generateRandomColor();
		this.x = checkStartPosition(x, this.radius, canvasWidth);
		this.y = checkStartPosition(y, this.radius, canvasHeight);
		this.direction = {
			x: Math.cos((Math.random() * 2 * Math.PI - 0.0174532925)),
			y: Math.sin((Math.random() * 2 * Math.PI + 0.0174532925)),
		};
	};
	
	function loop() {
		canvas.clearRect(0, 0, canvasWidth, canvasHeight);
		for (let index = 0; index < circles.length; index++) {
			// separateCircles(circles[index], circles);
			border(circles[index], canvasWidth, canvasHeight);
			draw(circles[index]);
			update(circles[index], options.speed);
			checkStartPosition(circles[index].x, circles[index].radius, canvasWidth);
			checkStartPosition(circles[index].y, circles[index].radius, canvasHeight);
			setOptionFunction(options.mode, circles[index], circles);
		}
		requestAnimationFrame(loop);
	}
	
	loop();
	
	if (options.mode === 3) {
		canvasBody.addEventListener('mousedown', createOrSeparate);
	} else {
		canvasBody.addEventListener('mousedown', createOrRemove);
	}
	
};