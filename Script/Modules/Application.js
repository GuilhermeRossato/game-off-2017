const Application = (function() {
	var self;
	function init() {
		self = Application;
		Interface.init("center");
		Interface.setCurrentScreen(StartView);
		VariableTimeStep.begin(Interface.update.bind(Interface), pause);
	}
	function pause() {
		if (self.paused) return;
		Interface.sendPause();
		(self.currentScreen.pause) && self.currentScreen.pause();
		self.paused = true;
	}
	function unpause() {
		if (!self.paused) return;
		Interface.sendResume();
		(self.currentScreen.unpause) && self.currentScreen.unpause();
		self.paused = false;
	}
	return {
		init: init,
		pause: pause,
		unpause: unpause
	}
})();