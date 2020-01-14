let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const btnBlock = document.getElementById('btn-block');
const inputColor = document.getElementById('color');
const inputLineWidth = document.getElementById('lineWidth');

let buttonType;
let colorStyle = 'black';
let lineWidth = 1;
let pointX;
let pointY;

inputColor.addEventListener('change', selectColor);
inputLineWidth.addEventListener('input', selectLineWidth);
btnBlock.addEventListener('click', selectGeometricShape);

canvas.addEventListener('mousedown', setBegin);
canvas.addEventListener('mouseup', setEnd);

function setBegin() {
	switch(buttonType) {
        case 'square':
			beginSquare();
            break;
        case 'oval':
            beginCircle();
            break;
        case 'curve':
			beginCurve();
            break;
        case 'line':
			beginLine();
			break;
        default: 
			break;
	}
}

function setEnd(event) {
	switch(buttonType) {
        case 'square':
			endSquare(event);
            break;
        case 'oval':
            endCircle(event);
            break;
        case 'curve':
			endCurve(event);
            break;
        case 'line':
			endLine(event);
			break;
        default: 
			break;
	}
}

function selectGeometricShape(event) {
	buttonType = event.target.id;

	if (!buttonType) {
        return void 0;
	} else if (buttonType === 'clean') {
		cleanScreen();
	}
}

function beginCircle() {
	ctx.beginPath();
	ctx.strokeStyle = colorStyle;
	ctx.lineWidth = lineWidth;
	pointX = event.clientX;
	pointY = event.clientY;
}

function endCircle(event) {

	if (event.clientX > pointX && event.clientY > pointY) {
		ctx.ellipse(pointX, pointY, event.clientX - pointX, event.clientY - pointY, Math.PI,  0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
	} else if ( event.clientX < pointX && event.clientY > pointY) {
		ctx.ellipse(pointX, pointY, pointX - event.clientX, event.clientY - pointY, Math.PI,  0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
	} else if (event.clientX < pointX && event.clientY < pointY) {
		ctx.ellipse(pointX, pointY, pointX - event.clientX, pointY - event.clientY, Math.PI,  0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
	} else {
		ctx.ellipse(pointX, pointY, event.clientX - pointX, pointY - event.clientY, Math.PI,  0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
	}
}

function beginCurve() {
	ctx.beginPath();
	ctx.strokeStyle = colorStyle;
	ctx.lineWidth = lineWidth;
	pointX = event.clientX;
	pointY = event.clientY;
}

function endCurve(event) {
	// const radius = 10;

	// ctx.moveTo(pointX, pointY + radius);

    // ctx.lineTo(pointX, event.clientY - radius);
	// ctx.quadraticCurveTo(pointX, event.clientY, pointX + radius, event.clientY);
	
    // ctx.lineTo(event.clientX - radius, event.clientY);
	// ctx.quadraticCurveTo(event.clientX, event.clientY, event.clientX, event.clientY - radius);
	
    // ctx.lineTo(event.clientX, pointY + radius);
	// ctx.quadraticCurveTo(event.clientX, pointY, event.clientX - radius, pointY);
	
    // ctx.lineTo(pointX + radius, pointY);
	// ctx.quadraticCurveTo(pointX, pointY, pointX, pointY + radius);

	ctx.lineJoin = "round";
	ctx.strokeRect(pointX, pointY, event.clientX - pointX, event.clientY - pointY);
	ctx.stroke();
	ctx.closePath();
}

function beginSquare() {	
	ctx.beginPath();
	ctx.strokeStyle = colorStyle;
	ctx.lineWidth = lineWidth;
	pointX = event.clientX;
	pointY = event.clientY;
}

function endSquare(event) {
	ctx.lineJoin = "miter";
	ctx.strokeRect(pointX, pointY, event.clientX - pointX, event.clientY - pointY);
	ctx.stroke();
	ctx.closePath();
}

function beginLine() {
	ctx.beginPath();
	ctx.strokeStyle = colorStyle;
	ctx.lineWidth = lineWidth;
	ctx.moveTo(event.clientX, event.clientY);
}

function endLine(event) {
	ctx.lineTo(event.clientX, event.clientY);
	ctx.stroke();
	ctx.closePath();
}

function selectLineWidth() {
	lineWidth = this.value;
}

function selectColor() {
	colorStyle = this.value;
}

function cleanScreen() {
	ctx.clearRect(0, 0, 800, 600);
}
