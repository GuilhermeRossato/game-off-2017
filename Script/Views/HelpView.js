const HelpView = {
	open(wrapper, canvas) {
		wrapper.setStyle("background: none;");
		canvas.setSize(this.width = 640, this.height = 480);
		this.animationCountdown = 0;
		this.buttons = [
			{x: (640-300)/2, y: 240-40+45+60, width: 300, height: 60, text: "Exit", font: "bold 36px Courier"}
		];
		this.selectedButtonId = -1;
		this.hoverButtonId = -1;
	},
	close() {
		
	},
	update(delta) {
		if (this.animationCountdown) {
			this.animationCountdown--;
		}
	},
	drawTitles(ctx) {
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
	drawContents(ctx) {

	},
	draw(ctx) {
		if (this.shouldDraw || true) {
			ctx.clearRect(0, 0, this.width, this.height);
			this.drawTitles(ctx);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.buttons.forEach(StartView.drawButton.bind(this, ctx));
			if (this.animationCountdown <= 0) {
				this.shouldDraw = false;
			}
		}
	},
	onResize(width, height) {
		this.winWidth = width;
		this.winHeight = height;
		this.shouldDraw = true;
	},
	isPointInsideButton(x, y, btn) {
		return (x > btn.x && x < btn.x+btn.width && y > btn.y && y < btn.y+btn.height);
	},
	onButtonPress(id) {
		StartView.onButtonPress.call(this, id);
	},
	onKeyUp(code) {
		StartView.onKeyUp.call(this, code);
	},
	onMouseDown(btn, x, y) {
		StartView.onMouseDown.call(this, btn, x, y);
	},
	onMouseMove(x, y) {
		StartView.onMouseMove.call(this, x, y);
	},
	onMouseUp(btn, x, y) {
		StartView.onMouseUp.call(this, btn, x, y);
	}
}