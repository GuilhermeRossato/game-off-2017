const GameView = {
	open(wrapper, canvas) {
		this.canvas = canvas;
	},
	close() {

	},
	update(delta) {

	},
	draw(ctx) {
		ctx.clearRect(0,0, this.width, this.height)
		ctx.fillRect(100,100,50,50);
	},
	onResize(width, height) {
		this.width = width;
		this.height = height;
		this.canvas.setSize(width, height);
	},
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