const StartView = {
	open(wrapper, canvas) {
		PrimitiveMenuView.open.call(this, wrapper, canvas);
		this.buttons = [
			{x: (640-360)/2, y: 240-40-45, width: 360, height: 80, text: "Play", font: "bold 42px Courier"},
			{x: (640-300)/2, y: 240-40+45, width: 300, height: 60, text: "Help", font: "bold 36px Courier"}
		];
	},
	close() {
		
	},
	update(delta) {
		
	},
	draw(ctx) {
		if (this.shouldDraw) {
			ctx.clearRect(0, 0, this.width, this.height);
			this.drawTitles(ctx);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.buttons.forEach(PrimitiveButtonView.drawButton.bind(this, ctx));
			if (this.animationCountdown <= 0) {
				this.shouldDraw = false;
			}
		}
	},
	onResize(width, height) {
		PrimitiveButtonView.onResize.call(this, width, height);
	},
	isPointInsideButton(x, y, btn) {
		return PrimitiveButtonView.isPointInsideButton.call(this, x, y, btn);
	},
	onButtonPress(id) {
		PrimitiveButtonView.onButtonPress.call(this, id);
	},
	onKeyUp(code) {
		PrimitiveButtonView.onKeyUp.call(this, code);
	},
	onMouseDown(btn, x, y) {
		PrimitiveButtonView.onMouseDown.call(this, btn, x, y);
	},
	onMouseMove(x, y) {
		PrimitiveButtonView.onMouseMove.call(this, x, y);
	},
	onMouseUp(btn, x, y) {
		PrimitiveButtonView.onMouseUp.call(this, btn, x, y);
	}
}