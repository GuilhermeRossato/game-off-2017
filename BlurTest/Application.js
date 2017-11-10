const Application = (function() {
	const scale = 4, width = 640, height = 480;

	let keys = {}, mouse = [0, 0, 0];
	let wrapper, canvas, ctx, loaded;
	function load() {
		canvas = document.getElementsByTagName("canvas")[0];
		wrapper = canvas.parentNode;
		document.body.setAttribute("style", "padding:0;margin:0");
		wrapper.setAttribute("style", "width:99vw;height:99vh;display:flex;justify-content:flex-start;align-items:left");
		Application.width = canvas.width = (width/scale+0.5)|0;
		Application.height = canvas.height = (height/scale+0.5)|0;
		canvas.setAttribute("style", `image-rendering:pixelated;border:1px solid #000;width:${(Application.width*scale).toFixed(2)}px;height:${(Application.height*scale).toFixed(2)}px`);
		ctx = canvas.getContext("2d");
		if (loaded instanceof Function) {
			loaded();
		} else {
			loaded = true;
		}
	}
	function keydown(e) { keys[e.code] = true; }
	function keyup(e) { keys[e.code] = false; }
	function mouseup(e) { mousemove(e); mouse[2] = e.button+1; }
	function mousemove(e) { mouse[0] = e.clientX - canvas.offsetLeft; mouse[1] = e.clientY - canvas.offsetTop; }
	function mousedown(e) { mousemove(e); mouse[2] = 0; }
	window.onload = load;
	window.onkeydown = keydown;
	window.onkeyup = keyup;
	window.onmousedown = mousedown;
	window.onmousemove = mousemove;
	window.onmouseup = mouseup;
	return {
		start: (init, update, draw) => {
			let last = performance.now();
			function step() {
				let delta = -(last = performance.now())+last;
				if (delta < 250) {
					while (delta >= 16) {
						delta -= 16;
						update();
					}
					draw(ctx);
					last -= delta;
				}
				window.requestAnimationFrame(step);
			}
			function entryPoint() {
				init(canvas);
				window.requestAnimationFrame(step);
			}
			if (loaded === true) {
				entryPoint();
			} else {
				loaded = entryPoint;
			}
			Application.start = undefined;
		},
		getKeys() {
			return keys;
		},
		getKeyDown(name) {
			return keys[name];
		},
		getMouseX() {
			return mouse[0];
		},
		getMouseY() {
			return mouse[1];
		},
		getMouseDown() {
			return mouse[2];
		}
	}
})()