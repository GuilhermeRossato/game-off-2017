var polygon = [
	-0.7,	-1.25,
	0,		1.25,
	0.7,	-1.25,
	0, 		-1
];

function breakPolygonParts(points, iter=1) {
	const maxDeviation = 0.33;
	if (iter == 0) {
		return poly;
	} else {
		let newPoly = new Float32Array(points.length*2);
		for (let i = 0 ; i < points.length; i ++) {
			
		}
	}
}

function init(canvas) {

}

function update() {

}

function draw(ctx) {
	var width = Application.width, height = Application.height;
	var size = Math.min(width, height)/4;
	ctx.clearRect(0, 0, width, height);
	ctx.shadowBlur = 8;
	ctx.shadowColor = "black";
	var obj = polygon;
	ctx.save();
	ctx.translate(width/2, height/2);
	ctx.beginPath();
	ctx.moveTo(obj[0]*size, obj[1]*size);
	for (var i = 2; i < obj.length; i+=2) {
		ctx.lineTo(obj[i]*size, obj[i+1]*size);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
}

Application.start(init, update, draw);