const ViewEntityView = {
	genEntity(s=16,res=[],sm=0.5,bg=0.75, ang, len, i) {
		for (i=0;i<s;i++) {
			ang = i/s;
			len = (i%2)?sm:bg;
			res.push(Math.cos(ang*Math.PI*2)*len, Math.sin(ang*Math.PI*2)*len);
		}
		return res;
	},
	open(wrapper, canvas) {
		this.entity = entities.special;
		wrapper.setStyle("background: none; border:1px solid #777;")
		this.size = 480;
		this.canvas = canvas;
		canvas.setSize(this.size, this.size);
		this.shouldDraw = 100;
	},
	close() {
		
	},
	update(delta) {
		this.shouldDraw++;
	},
	drawGrid(ctx, size, half) {
		ctx.strokeStyle = "#999";
		ctx.beginPath();
		ctx.moveTo(0, half);
		ctx.lineTo(size, half);
		ctx.moveTo(half, 0);
		ctx.lineTo(half, size);
		ctx.rect(half/2,half/2,half,half);
		ctx.stroke();
	},
	draw(ctx) {
		if (this.shouldDraw > 20) {
			var half = this.size/2,
				quarter = this.size/4;
			var i;
			//this.entity = this.genEntity();
			ctx.save();
			ctx.clearRect(0,0,this.size, this.size-20);
			ctx.rect(0,0,this.size, this.size-20);
			ctx.clip();
			this.drawGrid(ctx, this.size, half);
			ctx.translate(half, half);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "#333";
			ctx.beginPath();
			ctx.moveTo(this.entity[0]*quarter, this.entity[1]*quarter);
			for (i = 2 ; i < (this.entity.length-1); i+=2) {
				ctx.lineTo(this.entity[i]*quarter, this.entity[i+1]*quarter);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.font = "11px Calibri";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "#000";
			for (i = 0 ; i < (this.entity.length-1); i+=2) {
				ctx.fillText((i/2|0).toFixed(0), this.entity[i]*quarter, this.entity[i+1]*quarter);
			}
			ctx.restore();

			this.shouldDraw = 0;
		}
		if (this.redrawMousePosition) {
			ctx.clearRect(0, this.size-20, this.size, 20);
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "#000";
			var x = (this.mouse[0]-this.size/2)/(this.size/4),
				y = (this.mouse[1]-this.size/2)/(this.size/4);
			ctx.fillText("x: ", 10, this.size-10);
			ctx.fillText(x.toFixed(3), 10+15, this.size-10);
			ctx.fillText("y: ", 60, this.size-10);
			ctx.fillText(y.toFixed(3), 60+15, this.size-10);
		}
	},
	onMouseMove(x, y) {
		this.redrawMousePosition = true;
		if (!this.mouse) {
			this.mouse = [x, y];
		} else {
			this.mouse[0] = x;
			this.mouse[1] = y;
		}
	},
	onMouseDown(btn, x, y) {
		if (btn === 0)
			this.shouldDraw = 100;
	},
	onResize(width, height) {
		if (this.size+10 > Math.min(width, height)) {
			this.size = (Math.min(width, height)*0.9)|0;
			this.canvas.setSize(this.size, this.size);
			this.shouldDraw = true;
		}
	}
}