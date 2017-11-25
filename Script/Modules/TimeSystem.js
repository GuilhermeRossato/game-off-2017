const TimeSystem = (function() {
	var self, paused;
	function init() {
		self = TimeSystem;
		paused = false;
		self.init = undefined;
	}
	function pause() {
		if (paused ) return;
		document.title = "Paused - "+document.title;
		Interface.sendPause();
		paused = true;
	}
	function resume() {
		if (!paused) return;
		document.title = document.title.substr(("Paused - ").length);
		Interface.sendResume();
		paused = false;
	}
	return {
		init: init, pause: pause, resume: resume
	}
})();