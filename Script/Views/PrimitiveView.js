const PrimitiveView = {
	open(wrapper, canvas) {
		wrapper.setStyle(`border: 1px solid #000;`);
		canvas.setSize(640, 480);
	},
	close() {

	},
	update(delta) {

	},
	draw(ctx) {
		ctx.strokeRect(10, 10, 640-20, 480-20);
		ctx.fillText("PrimitiveView",20,20);
	},
	// Optional:
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