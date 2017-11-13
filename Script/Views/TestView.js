const TestView = {
	open(wrapper, canvas) {
		wrapper.setStyle(`
			width: 640px;
			height: 480px;
			border: 1px solid #000;
		`);
		canvas.setSize(640, 480);
		this.objects = [
			new Entity(),
			new Entity()
		];
	},
	close() {
		
	},
	update(delta) {
		
	},
	draw(ctx) {
		function b(i,j,k) {
			return i+(j-i)*k;
		}
		var pts = TestScreen.setLinePoints(2).first;
		this.pts = [];
		while (pts) {
			this.pts.push(pts.x, pts.y);
			pts = pts.next;
		}
		pts = this.pts;
		ctx.clearRect(0,0,640,480);
		ctx.beginPath();
		ctx.moveTo(b(100, 540, pts[0]),b(120,123,pts[1]));
		for (var i = 2; i<pts.length;i+=2) {
			ctx.lineTo(b(100, 540, pts[i]),b(120,123,pts[i+1]));
		}
		ctx.stroke();
	},
	// Not required:
	onKeyDown(code) {
		
	},
	onKeyUp(code) {
		
	},
	onMouseDown(btn, x, y) {
		
	},
	onMouseMove(btn, x, y) {
		
	},
	onMouseUp(btn, x, y) {
		
	}
}