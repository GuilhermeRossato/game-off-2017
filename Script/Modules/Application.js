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
	function onMenuButtonPress(origin, id) {
		if (origin === StartView) {
			if (id === 0) {
				Interface.setCurrentScreen(GameView);
			} else if (id === 1) {
				Interface.setCurrentScreen(HelpView);
			}
		} else if (origin === HelpView) {
			Interface.setCurrentScreen(StartView);
		}
	}
	return {
		init: init,
		pause: pause,
		resume: resume,
		onMenuButtonPress: onMenuButtonPress,
	}
})();