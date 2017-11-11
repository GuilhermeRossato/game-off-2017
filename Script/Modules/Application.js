const Application = (function() {
	var self, paused;
	function init() {
		self = Application;
		Interface.init("center");
		Interface.setCurrentScreen(StartView);
		VariableTimeStep.begin(Interface.update.bind(Interface), pause);
		paused = false;
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
		init: init,
		pause: pause,
		resume: resume
	}
})();