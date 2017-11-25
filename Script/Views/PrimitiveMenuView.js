const PrimitiveMenuView = {
	open(wrapper, canvas) {
		wrapper.setStyle("background: #fff;");
		canvas.setSize(this.width = 640, this.height = 480);
		this.shouldDraw = true;
		this.animationCountdown = 0;
		this.selectedButtonId = -1;
		this.hoverButtonId = -1;
		this.buttons = [];
	},
	close() {
	},
	update(delta) {
		if (this.animationCountdown) {
			this.animationCountdown--;
		}
	},
	drawButton: function(ctx, btn, id) {
		var mid = [btn.x+btn.width/2, btn.y+btn.height/2];
		ctx.save();
		ctx.font = btn.font || "48px courier";
		if (id == this.hoverButtonId) {
			ctx.translate(mid[0], mid[1]);
			var scale = (id == this.selectedButtonId)?0.96:0.99;
			ctx.scale(scale, scale);
			ctx.translate(-mid[0], -mid[1]);
		}
		ctx.strokeStyle = "#333";
		ctx.fillStyle = "#DDD";
		ctx.beginPath();
		ctx.moveTo(btn.x, btn.y);
		ctx.lineTo(btn.x+btn.width, btn.y);
		ctx.lineTo(btn.x+btn.width, btn.y+btn.height);
		ctx.lineTo(btn.x, btn.y+btn.height);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = "#333";
		ctx.fillText(btn.text, btn.x+btn.width/2, btn.y+btn.height/2);
		ctx.restore();
	},
	draw(ctx) {
		if (this.shouldDraw) {
			ctx.clearRect(0, 0, this.width, this.height);
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.buttons.forEach(this.drawButton.bind(this, ctx));
			if (this.animationCountdown <= 0) {
				this.shouldDraw = false;
			}
		}
	},
	onResize(width, height) {
		if (width < 410) {
			this.buttons[0].x = (640-(this.buttons[0].width = (3*width-510)/2))/2;
			this.buttons[1].x = (640-(this.buttons[1].width = (3*width-630)/2))/2;
		} else {
			this.buttons[0].x = (640-(this.buttons[0].width = 360))/2;
			this.buttons[1].x = (640-(this.buttons[1].width = 300))/2;
		}
		this.shouldDraw = true;
	},
	onButtonPress(id) {
		if (id !== -1) {
			Interface.onMenuButtonPress(this, id);
		}
	},
	isPointInsideButton(x, y, btn) {
		return (x > btn.x && x < btn.x+btn.width && y > btn.y && y < btn.y+btn.height);
	},
	onKeyUp(code) {
		if (code == "Enter") {
			this.onButtonPress(this.hoverButtonId);
		} else if (code == "ArrowDown" || code == "ArrowRight" || code == "s" || code == "S") {
			if (this.hoverButtonId < this.buttons.length-1) {
				this.hoverButtonId++;
			} else {
				this.hoverButtonId = this.buttons.length-1;
			}
		} else if (code == "ArrowUp" || code == "ArrowLeft" || code == "w" || code == "W") {
			if (this.hoverButtonId > 0) {
				this.hoverButtonId--;
			} else {
				this.hoverButtonId = 0;
			}
		}
	},
	onMouseDown(btn, x, y) {
		if (btn != 0) return;
		var selectedId = -1;
		this.buttons.some((btn,i)=>{
			if (this.isPointInsideButton(x, y, btn)) {
				selectedId = i;
				return true;
			}
			return false;
		});
		if (selectedId != this.selectedButtonId) {
			this.selectedButtonId = selectedId;
			this.shouldDraw = true;
		}
	},
	onMouseMove(x, y) {
		var selectedId = -1;
		this.buttons.some((btn,i)=>{
			if (this.isPointInsideButton(x, y, btn)) {
				selectedId = i;
				return true;
			}
			return false;
		});
		if (selectedId != this.hoverButtonId) {
			this.hoverButtonId = selectedId;
			this.shouldDraw = true;
		}
	},
	onMouseUp(btn, x, y) {
		if (btn != 0) return;
		var selectedId = -1;
		this.buttons.some((btn,i)=>{
			if (this.isPointInsideButton(x, y, btn)) {
				selectedId = i;
				return true;
			}
			return false;
		});
		if (selectedId !== -1 && selectedId == this.selectedButtonId) {
			this.onButtonPress(selectedId);
			this.shouldDraw = true;
			this.selectedButtonId = -1;
		}
	}
}