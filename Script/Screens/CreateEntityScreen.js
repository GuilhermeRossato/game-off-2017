class CreateEntityScreen {
	constructor(wrapper, canvas) {
		this.points = [];
		this.gridSize = 47.99;
		this.canvasSize = 480;
		wrapper.setStyle(`
			width: ${this.canvasSize}px;
			height: ${this.canvasSize}px;
		`);
		canvas.setSize(this.canvasSize, this.canvasSize);
		this.lastMousePos = [-this.gridSize, -this.gridSize];
	}
	update(delta) {
		
	}
	draw(ctx) {
		const b = (i,j,k) => (i+(j-i)*k);
		var i;
		ctx.clearRect(0, 0, this.canvasSize,this.canvasSize);
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		for(i = 0 ; i < (this.canvasSize/this.gridSize); i++) {
			ctx.moveTo(0, b(0, this.canvasSize, i/(this.canvasSize/this.gridSize)));
			ctx.lineTo(this.canvasSize, b(0, this.canvasSize, i/(this.canvasSize/this.gridSize)));
			ctx.moveTo(b(0, this.canvasSize, i/(this.canvasSize/this.gridSize)), 0);
			ctx.lineTo(b(0, this.canvasSize, i/(this.canvasSize/this.gridSize)), this.canvasSize);
		}
		ctx.stroke();
		ctx.lineWidth = 1;
		ctx.beginPath();
		if (this.points.length > 0)
			ctx.moveTo(this.points[0][0], this.points[0][1]);
		for (i = 1; i < this.points.length; i++)
			ctx.lineTo(this.points[i][0], this.points[i][1]);
		ctx.stroke();
		var pos = this.lastMousePos.map(a=>(a/this.gridSize|0));
		ctx.lineWidth = 0.25;
		ctx.beginPath();
		ctx.arc(pos[0]*this.canvasSize, pos[1]*this.canvasSize, this.gridSize/3, 0, Math.PI*2);
		ctx.stroke();
	}
	onMouseDown(btn, x, y) {
		
	}
	onMouseMove(x, y) {
		this.lastMousePos[0] = x;
		this.lastMousePos[1] = y;
	}
	onMouseUp(btn, x, y) {
		
	}
}