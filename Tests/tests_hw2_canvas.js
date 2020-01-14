app();

describe('HW2 Canvas Bubbles Tests Util functions', () => {
  
    describe('test checkStartPosition function', () => {
        const testData = [
            {
                coordinateX: 100,
                radius: 10,
                canvasWidth: 600,
                expected: 100,
            },
            {
                coordinateX: 10,
                radius: 20,
                canvasWidth: 600,
                expected: 21,
            },
            {
                coordinateX: 560,
                radius: 50,
                canvasWidth: 600,
                expected: 549,
            },
            {
                coordinateX: -5,
                radius: 10,
                canvasWidth: 600,
                expected: 11,
            }
            
        ];
    
        testData.forEach(data => {
        
            const {coordinateX, radius, canvasWidth, expected} = data;
        
            it(`should return ${expected} when coordinateX = ${coordinateX} and radius = ${radius}, canvasWidth = ${canvasWidth}`, () => {
                
                const actual = checkStartPosition(coordinateX, radius, canvasWidth);
    
                assert.strictEqual(actual, expected)
            });
        });
    });
    
    describe('test distanceBetweenDots function', () => {
        const testData = [
            {
                x1: 100,
                y1: 10,
                x2: 30,
                y2: 100,
                expected: 114.0175425099138,
            },
            {
                x1: -10,
                y1: 10,
                x2: 30,
                y2: 50,
                expected: 56.568542494923804,
            },
            {
                x1: -20,
                y1: 30,
                x2: 60,
                y2: 80,
                expected: 94.33981132056604,
            },
            {
                x1: 0,
                y1: 0,
                x2: 25,
                y2: 0,
                expected: 25,
            }
        
        ];
        
        testData.forEach(data => {
            
            const {x1, y1, x2, y2, expected} = data;
            
            it(`should return ${expected} when coordinates of first dot = ${x1}, ${y1}, coordinates of second dot = ${x2}, ${y2}`, () => {
                
                const actual = distanceBetweenDots(x1, y1, x2, y2);
                
                assert.strictEqual(actual, expected)
            });
        });
    });
    
    describe('test border function', () => {
        
        beforeEach(() => {
            
            circles.push(new Circle(50, 50, 20));
        });
        afterEach(() => {
            circles = [];
        });
        it(`should change direction of circle when hi the border`, () => {
            // circles.push(new Circle(50, 50, 20));
            circles[0].x = 100;
            circles[0].y = 100;
            const directionBeforeBorder = circles[0].direction.x;
            
            border(circles[0], canvasWidth, canvasHeight);
            
            assert.strictEqual(circles[0].direction.x, directionBeforeBorder)
        });
        
        it(`should change direction of circle whe`, () => {
            // circles.push(new Circle(50, 50, 20));
            circles[0].x = 590;
            circles[0].y = 300;
            const directionBeforeBorder = circles[0].direction.x;
            
            border(circles[0], canvasWidth, canvasHeight);
            
            assert.strictEqual(circles[0].direction.x, -1 * directionBeforeBorder)
        });
    
        it(`should change direction of circle whe`, () => {
            // circles.push(new Circle(50, 50, 20));
            circles[0].x = 10;
            circles[0].y = 300;
            const directionBeforeBorder = circles[0].direction.x;
        
            border(circles[0], canvasWidth, canvasHeight);
        
            assert.strictEqual(circles[0].direction.x, -1 * directionBeforeBorder)
        });
    
        it(`should change direction of circle whe`, () => {
            // circles.push(new Circle(50, 50, 20));
            circles[0].x = 100;
            circles[0].y = 18;
            const directionBeforeBorder = circles[0].direction.y;
        
            border(circles[0], canvasWidth, canvasHeight);
        
            assert.strictEqual(circles[0].direction.y, -1 * directionBeforeBorder)
        });
    
        it(`should change direction of circle whe`, () => {
            // circles.push(new Circle(50, 50, 20));
            circles[0].x = 100;
            circles[0].y = 390;
            const directionBeforeBorder = circles[0].direction.y;
        
            border(circles[0], canvasWidth, canvasHeight);
        
            assert.strictEqual(circles[0].direction.y, -1 * directionBeforeBorder)
        });
    });
    
    describe('test update function', () => {
        
        beforeEach(() => {
        
            circles.push(new Circle(50, 50, 20));
        });
        afterEach(() => {
            circles = [];
        });
        
        const testData = [
            {
                   speed: 30,
            },
            {
                   speed: 0,
            },
            {
                   speed: 20,
            },
            {
                   speed: -5,
            },
        
        ];
        
        testData.forEach(data => {
            
            const {circle, speed} = data;
            
            it(`should update coordinates centres of circles centres `, () => {
                const expectedX = circles[0].x + circles[0].direction.x * speed / circles[0].radius;
                const expectedY = circles[0].y + circles[0].direction.y * speed / circles[0].radius;
                
                update(circles[0], speed);
                
                
                assert.strictEqual(circles[0].x, expectedX);
                assert.strictEqual(circles[0].y, expectedY)
            });
        });
    });

});

describe('Function generateRandomColor', function() {
    function makeTest() {
        const expected = generateRandomColor();
        
        const actual = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        
        for (let i = 1; i < expected.length-1; i++) {
            let currentActual = false;
            for (let j = 0; j < actual.length; j++) {
                if(expected[i] === actual[j]) {
                    currentActual = actual[j];
                    continue;
                }
            }
            it(`if it located in ${currentActual} should to be color ${expected} `, function() {
                assert.deepEqual(currentActual, expected[i]);
            });
        }
    }
    for (let i = 0; i <=5; i++){
        makeTest();
    }
    
});




describe('Function randomInteger', function() {
    function makeTest(a) {
        const testData = [{
            max: a,
            min: -a,
        },
            {
                max: a,
                min: 0,
            },
            {
                max: 0,
                min: -a,
                
            }];
        testData.forEach(function(value) {
            const {min, max} = value;
            let entry = randomInteger(min, max);
            let out = false;
            if (entry >= min && entry <= max) {
                out = true;
            }
            it(`should return True, when returned value is in interval ${min} and ${max}`, function () {
                const actual = out;
                assert.strictEqual(actual, true);
            });
        });
    }
    for (let i = 5; i <= 10; i+=5){
        makeTest(i);
    }
});
