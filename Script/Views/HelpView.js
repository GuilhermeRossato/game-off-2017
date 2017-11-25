const HelpView = {
	open(wrapper, canvas) {
		wrapper.setStyle("background: none;");
		PrimitiveMenuView.open.call(this, wrapper, canvas);
		this.buttons = [
			{x: (640-300)/2, y: 240-40+45+60, width: 300, height: 60, text: "Exit", font: "bold 36px Courier"}
		];
	},
	close() {
		
	},
	update(delta) {
		
	},
	drawContent(ctx) {
		const mainText = [
			"Avoid enemies not to die",
			"Some enemies kill you more than others",
			"Shoot them if possible"
		]
		const desktopText = [
			"Click to shoot",
			"WASD/arrow keys to move around",
		];
		const mobileText = [
			"Touch to shoot",
			"Drag to move around",
		];
		if (this.winWidth > 640) {
			ctx.textAlign = "center";
			ctx.font = "bold 36px courier";
			ctx.fillStyle = "#333";
			ctx.fillText("Desktop", this.width/4, 140);
			ctx.fillText("Mobile", this.width/2+this.width/4, 140);
			ctx.font = "bold 12px courier";
			mainText.forEach((text,i) => {
				ctx.fillText(text, this.width/2, 60+20*i);
			});
			desktopText.forEach((text,i) => {
				ctx.fillText(text, this.width/4, 190+20*i);
			});
			mobileText.forEach((text,i) => {
				ctx.fillText(text, this.width/2+this.width/4, 190+20*i);
			});
		} else {
			ctx.textAlign = "center";
			ctx.font = "bold 24px courier";
			ctx.fillStyle = "#333";
			ctx.fillText("Mobile", this.width/2, 130);
			ctx.fillText("Desktop", this.width/2, 220);
			ctx.font = "bold 12px courier";
			mainText.forEach((text,i) => {
				ctx.fillText(text, this.width/2, 60+20*i);
			});
			mobileText.forEach((text,i) => {
				ctx.fillText(text, this.width/2, 160+20*i);
			});
			desktopText.forEach((text,i) => {
				ctx.fillText(text, this.width/2, 250+20*i);
			});
		}
	},
	draw(ctx) {
		if (this.shouldDraw) {
			ctx.clearRect(0, 0, this.width, this.height);
			this.drawContent(ctx);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.buttons.forEach(PrimitiveMenuView.drawButton.bind(this, ctx));
			if (this.animationCountdown <= 0) {
				this.shouldDraw = false;
			}
		}
	},
	onResize(width, height) {
		PrimitiveMenuView.onResize.call(this, width, height);
	},
	isPointInsideButton(x, y, btn) {
		return PrimitiveMenuView.isPointInsideButton.call(this, x, y, btn);
	},
	onButtonPress(id) {
		PrimitiveMenuView.onButtonPress.call(this, id);
	},
	onKeyUp(code) {
		PrimitiveMenuView.onKeyUp.call(this, code);
	},
	onMouseDown(btn, x, y) {
		PrimitiveMenuView.onMouseDown.call(this, btn, x, y);
	},
	onMouseMove(x, y) {
		PrimitiveMenuView.onMouseMove.call(this, x, y);
	},
	onMouseUp(btn, x, y) {
		PrimitiveMenuView.onMouseUp.call(this, btn, x, y);
	}
}