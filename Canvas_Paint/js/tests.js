describe('Sinon test', () => {
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('test selectGeometricShape', () => {
    
        it('function selectGeometricShape calledOnce function cleanScreen', () => {
            const stub = sandbox.stub(window, 'cleanScreen');
            const clean = document.getElementById('clean');
            
            clean.click();

            sandbox.assert.calledOnce(stub);
        });
    });

    describe('test setBegin', () => {

        it('function setBegin calledOnce function beginSquare', () => {
            const stub = sandbox.stub(window, 'beginSquare');
            buttonType = 'square';
            
            setBegin(buttonType);

            sandbox.assert.calledOnce(stub);
        });

        it('function setBegin calledOnce function beginCircle', () => {
            const stub = sandbox.stub(window, 'beginCircle');
            buttonType = 'oval';
            
            setBegin(buttonType);

            sandbox.assert.calledOnce(stub);
        });

        it('function setBegin calledOnce function beginCurve', () => {
            const stub = sandbox.stub(window, 'beginCurve');
            buttonType = 'curve';
            
            setBegin(buttonType);

            sandbox.assert.calledOnce(stub);
        });

        it('function setBegin calledOnce function beginLine', () => {
            const stub = sandbox.stub(window, 'beginLine');
            buttonType = 'line';
            
            setBegin(buttonType);

            sandbox.assert.calledOnce(stub);
        });
    });

    describe('test setEnd', () => {

        it('function setEnd calledOnce function endSquare', () => {
            const stub = sandbox.stub(window, 'endSquare');
            buttonType = 'square';
            
            setEnd(buttonType);

            sandbox.assert.calledOnce(stub);
            sandbox.assert.calledWith(stub, 'square');
        });

        it('function setEnd calledOnce function endCircle', () => {
            const stub = sandbox.stub(window, 'endCircle');
            buttonType = 'oval';
            
            setEnd(buttonType);

            sandbox.assert.calledOnce(stub);
            sandbox.assert.calledWith(stub, 'oval');
        });

        it('function setEnd calledOnce function endCurve', () => {
            const stub = sandbox.stub(window, 'endCurve');
            buttonType = 'curve';
            
            setEnd(buttonType);

            sandbox.assert.calledOnce(stub);
            sandbox.assert.calledWith(stub, 'curve');
        });

        it('function setEnd calledOnce function endLine', () => {
            const stub = sandbox.stub(window, 'endLine');
            buttonType = 'line';
            
            setEnd(buttonType);

            sandbox.assert.calledOnce(stub);
            sandbox.assert.calledWith(stub, 'line');
        });
    });

});