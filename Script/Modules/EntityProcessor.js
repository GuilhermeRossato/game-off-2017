const EntityProcessor = {
	constants: {
		breaksPerUnit: 4,
		unitsPerDeviationsOnLine: 16,
		unitsPerDeviationsOnPoint: 16
	},
	b: (i,j,t)=>(i+(j-i)*t),
	processLine: function(x0, y0, x1, y1) {
		var b = this.b,
			dist = Math.sqrt((x0-x1)*(x0-x1)+(y0-y1)*(y0-y1)),
			normal = [(y1-y0)/dist, -(x1-x0)/dist],
			nPoints = Math.round(dist*this.constants.breaksPerUnit),
			nDiv = nPoints*3+1,
			result = [];
		//znPoints = 0;
		//nDiv = 1;
		//console.log(x0, y0, x1, y1, dist);
		for (var i = 0 ; i < nPoints ; i++) {
			var t = (1+i*3+2*Math.random())/nDiv;
			var dev = (Math.random()*2-1)/this.constants.unitsPerDeviationsOnLine;
			result.push(b(x0, x1, t)+normal[0]*dev, b(y0, y1, t)+normal[1]*dev);
		}
		return result;
	},
	process: function(polygons, changePoints=true) {
		var newPolygon = [],
			dev = Math.random()/this.constants.unitsPerDeviationsOnPoint,
			ang = Math.random()*2*Math.PI;
		if (polygons.length < 2) { return polygons; }
		if (changePoints) {
			polygons[0] += Math.cos(ang)*dev*0;
			polygons[1] += Math.sin(ang)*dev*0;
		}
		for (var i = 0; i<=polygons.length-1; i+=2) {
			if (i < polygons.length-2) {
				dev = Math.random()/this.constants.unitsPerDeviationsOnPoint;
				ang = Math.random()*2*Math.PI;
				polygons[i+2] += Math.cos(ang)*dev*0;
				polygons[i+3] += Math.sin(ang)*dev*0;
			}
			var next = (i < polygons.length-2)?i+2:0;
			newPolygon.push(polygons[i], polygons[i+1]);
			newPolygon.push(...this.processLine(polygons[i], polygons[i+1], polygons[next], polygons[next+1]));
		}
		return newPolygon;
	}
}