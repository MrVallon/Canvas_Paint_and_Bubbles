const randomInteger = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

// const generateRandomColor = () =>
//     '#' + randomInteger(0, 256).toString(16) + randomInteger(0, 256).toString(16) + randomInteger(0, 256).toString(16);

function generateRandomColor() {
	let hex = ['0', '1', '2', '3', '4', '5', '6', '7','8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	let color = '#';
	let i;
	for (i = 0; i < 6 ; i++) {
		color = color + hex[Math.floor(Math.random() * 16)];
	}
	return color;
}

const distanceBetweenDots = (x1, y1, x2, y2) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

function pushOffCircles(circle, circles) {
	for (let index = 0; index < circles.length; index++) {
		if (distanceBetweenDots(circle.x, circle.y, circles[index].x, circles[index].y) <=
			circle.radius + circles[index].radius && circle.x != circles[index].x && circle.y != circles[index].y) {
			circle.direction.x *= -1;
			circle.direction.y *= -1;

		}
		// 	if (circle.x > circles[index].x) {
		// 		circle.direction.x = Math.sin(Math.PI - Math.acos(circle.direction.x));;
		// 	} else {
		// 		circle.direction.x = -1*Math.cos(Math.PI - Math.acos(circle.direction.x));
		// 	}
		//
		// 	if (circle.y > circles[index].y)
		// 		circle.direction.y *= -1; //Math.sin(Math.PI - Math.asin(circle.direction.x))
		// 	} else {
		// 		circle.direction.y *= -1;//*Math.sin(Math.PI - Math.asin(circle.direction.x))
		// 	}
		
	}
}


function separateCircles(circle, circles) {
	for (let index = 0; index < circles.length; index++) {
		if (distanceBetweenDots(circle.x, circle.y, circles[index].x, circles[index].y) <
			circle.radius + circles[index].radius - 1 && circle.x != circles[index].x && circle.y != circles[index].y) {

			circle.x += circle.radius/5;
			circle.y += circle.radius/5;
			if (circle.x + circle.radius >= canvasWidth + 1||
				circle.x - circle.radius <= 1) {
				circle.x -= 2*circle.radius;
			}
			if (circle.y + circle.radius>= canvasHeight + 1||
				circle.y - circle.radius <= 1) {
				circle.y -= 2*circle.radius;
			}
			
			separateCircles(circle, circles);
		}
	}
}

function createOrRemove(event) {
	let isDeletedCircle = 0;
	if (!circles[0]) {
		circles.push(new Circle(event.clientX, event.clientY));
	} else {
		for (let index = 0; index < circles.length; index++) {
			if (distanceBetweenDots(event.clientX, event.clientY, circles[index].x, circles[index].y) <=
				circles[index].radius) {
				circles.splice(index, 1);
				isDeletedCircle = 1;
			}
		}
		if (!isDeletedCircle) {
			circles.push(new Circle(event.clientX, event.clientY));
			separateCircles(circles[circles.length - 1], circles)
		}
	}
}

function mergeOfCircles(circle, circles) {
	for (let index = 0; index < circles.length; index++) {
		if (distanceBetweenDots(circle.x, circle.y, circles[index].x, circles[index].y) <=
            circle.radius + circles[index].radius && circle.x != circles[index].x && circle.y != circles[index].y) {
			if (circle.radius >= circles[index].radius) {
				circle.radius = Math.sqrt(Math.pow(circle.radius, 2) + Math.pow(circles[index].radius, 2));
				circles.splice(index, 1);
				if (circle.x + circle.radius >= canvasWidth) {
					circle.x = canvasWidth - circle.radius;
				}
				if (circle.y + circle.radius >= canvasHeight) {
					circle.y = canvasHeight - circle.radius;
					
				}
			}
		}
	}
}

function createOrSeparate(event) {
	let isDeletedCircle = 0;
	if (!circles[0]) {
		circles.push(new Circle(event.clientX, event.clientY));
	} else {
		for (let index = 0; index < circles.length; index++) {
			if (distanceBetweenDots(event.clientX, event.clientY, circles[index].x, circles[index].y) <
				circles[index].radius) {
				const radius = circles[index].radius/6;
				circles.splice(index, 1);
				isDeletedCircle = 1;
				circles.push(new Circle(event.clientX + radius, event.clientY + radius, radius));
				circles.push(new Circle(event.clientX - radius, event.clientY - radius, radius));
				circles.push(new Circle(event.clientX + radius, event.clientY - radius, radius));
				circles.push(new Circle(event.clientX - radius, event.clientY + radius, radius));
				circles.push(new Circle(event.clientX + radius, event.clientY, radius));
				circles.push(new Circle(event.clientX - radius, event.clientY, radius));
				circles.push(new Circle(event.clientX, event.clientY - radius, radius));
				circles.push(new Circle(event.clientX, event.clientY + radius, radius));
			}
		}
		if (!isDeletedCircle) {
			circles.push(new Circle(event.clientX, event.clientY));
		}
	}
}

function checkStartPosition(coordinate, radius, canvasSize) {
	if (coordinate <= radius) {
		return radius + 1;
	} else if (coordinate >= canvasSize- radius) {
		return canvasSize - radius - 1;
	} else {
		return coordinate;
	}
}

function border(circle, canvasWidth, canvasHeight) {
	
	if (circle.x + circle.radius >= canvasWidth + 1||
		circle.x - circle.radius <= 1) {
		circle.direction.x *= -1;
	}
	if (circle.y + circle.radius>= canvasHeight + 1||
		circle.y - circle.radius <= 1) {
		circle.direction.y *= -1;
	}
}

function update(circle, speed) {
	
	circle.x += circle.direction.x * speed / circle.radius;
	circle.y += circle.direction.y * speed / circle.radius;
}

function draw(circle) {
	canvas.beginPath();
	canvas.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
	canvas.closePath();
	canvas.fillStyle = circle.color;
	canvas.fill();
}

setOptionFunction = (mode, circle, circles) => mode === 2 ? mergeOfCircles(circle, circles) : pushOffCircles(circle, circles);
