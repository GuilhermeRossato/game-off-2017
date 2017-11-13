const GameView = {
	scale: {
		position: 128,
		drawing: 8,
	},
	open(wrapper, canvas) {
		wrapper.setStyle("border: 1px solid #333");
		this.canvas = canvas;
		this.enemies = [];
		var entityList = ["soldier", "spike", "shooter", "tank"]
		for (var i = 0 ; i < 10; i++) {
			var poly = EntityProcessor.process(Object.create(entities[entityList[Math.random()*entityList.length|0]]));
			var entity = new Entity(poly);
			entity.position = [Math.random()*2-1, Math.random()*2-1];
			entity.angle = Math.random()*2*Math.PI;
			//entity.position = [0, 0];
			//entity.angle = 0;
			this.enemies.push(entity);
		}
	},
	close() {

	},
	update(delta) {
		this.enemies.forEach(enemy => {
			if (enemy.position[0] > 0.9) {
				enemy.angle += 0.01;
			} else if (enemy.position[0] < -0.9) {
				enemy.angle += 0.01;
			} else if (enemy.position[1] > 0.9) {
				enemy.angle += 0.01;
			} else if (enemy.position[1] < -0.9) {
				enemy.angle += 0.01;
			} else {
				if (Math.random() < 0.04) {
					if (enemy.angleVel) {
						if (enemy.angleVel > 0) {
							enemy.angleVel = 0.005*Math.random();
						} else {
							enemy.angleVel = 0.005*Math.random();
						}
					} else {
						enemy.angleVel = 0.005*(Math.random()*2-1);
					}
				}
				if (enemy.angleVel) {
					enemy.angle += enemy.angleVel;
				}
			}
			enemy.position[0] += Math.cos(enemy.angle)*0.001;
			enemy.position[1] += Math.sin(enemy.angle)*0.001;
		});
	},
	draw(ctx) {
		ctx.clearRect(0, 0, this.size, this.size)
		ctx.strokeStyle = "#444";
		this.enemies.forEach(enemy=>{
			var poly = enemy.polygons,
				px = enemy.position[0]*this.size/2,
				py = enemy.position[1]*this.size/2;
			ctx.save();
			ctx.translate(this.size/2+px, this.size/2+py);
			ctx.rotate(enemy.angle);
			ctx.beginPath();
			ctx.moveTo(poly[0]*this.scale.drawing, poly[1]*this.scale.drawing);
			for (var i = 0 ; i < poly.length; i+=2) {
				ctx.lineTo(poly[i]*this.scale.drawing, poly[i+1]*this.scale.drawing);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		});
	},
	onResize(width, height) {
		this.size = Math.min(width, height)-10;
		this.canvas.setSize(this.size, this.size);
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