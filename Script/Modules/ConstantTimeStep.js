const ConstantTimeStep = (function() {
	let timeStepLimit = 200,
		last = 0,
		delta = 0,
		update = null,
		performancer = new Performancer({compact: settings.performancer.startCompact})
	return {
		reset: () => start = performance.now(),
		begin: (callback, pause) => {
			update = function() {
				delta = -last+(last = performance.now());
				performancer.update(delta);
				if (delta > timeStepLimit) {
					pause(delta);
				} else {
					while (delta >= 16) {
						callback();
						delta -= 16;
					}
					last -= delta;
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