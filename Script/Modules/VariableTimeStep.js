const VariableTimeStep = (function() {
	let maxTimeStep = 50,
		last = 0,
		delta = 0,
		update;
	return {
		reset: () => start = performance.now(),
		begin: (callback, pause) => {
			update = function() {
				delta = -last+(last = performance.now());
				if (delta > maxTimeStep * 10) {
					pause(delta);
				} else if (delta > maxTimeStep * 3) {
					// Drop frames silently
				} else if (delta > maxTimeStep * 2) {
					callback(delta/3);
					callback(delta/3);
					callback(delta/3);
				} else if (delta > maxTimeStep) {
					callback(delta/2);
					callback(delta/2);
				} else if (delta > 0 && delta <= maxTimeStep) {
					callback(delta);
				}
				window.requestAnimationFrame(update);
			}
			last = performance.now();
			window.requestAnimationFrame(update);
		},
		stop: () => {
			update = function() {
				console.log("stopped");
			}
		}
	}
})()