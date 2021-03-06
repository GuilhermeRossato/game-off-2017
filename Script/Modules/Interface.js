const Interface = (function() {
	var self, currentScreen;
	function init(wrapper) {
		self = Interface;
		self.wrapper = (typeof wrapper === "string")?document.getElementById(wrapper):wrapper;
		if (!self.wrapper)
			throw new Error("Interface could not retrieve wrapper");
		self.canvas = document.createElement("canvas");
		self.ctx = self.canvas.getContext("2d");
		self.wrapper.appendChild(self.canvas);

		self.wrapper.setStyle = (style) => self.wrapper.setAttribute("style", minifyStyle(style));
		self.canvas.setSize = (width, height) => (self.canvas.width = width)&&(self.canvas.height = height);

		self.setCurrentScreen(StartView);
		[
			["keydown", onRawKeyDown],
			["keyup", onRawKeyUp],
			["mousedown", onRawMouseDown],
			["mousemove", onRawMouseMove],
			["mouseup", onRawMouseUp],
			["resize", onRawResize],
		].forEach(c => addEventListener(c[0], c[1]));
		self.init = undefined;
	}
	function onRawKeyDown(event) {
		(currentScreen.onKeyDown) && currentScreen.onKeyDown(event.key);
	}
	function onRawKeyUp(event) {
		(currentScreen.onKeyUp) && currentScreen.onKeyUp(event.key);
	}
	function onRawMouseDown(event) {
		(currentScreen.onMouseDown) && currentScreen.onMouseDown(event.button, event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function onRawMouseMove(event) {
		(currentScreen.onMouseMove) && currentScreen.onMouseMove(event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function onRawMouseUp(event) {
		(currentScreen.onMouseUp) && currentScreen.onMouseUp(event.button, event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function onRawResize(event) {
		(currentScreen.onResize) && currentScreen.onResize(window.innerWidth, window.innerHeight);
	}
	function setCurrentScreen(object) {
		if (!object)
			throw new Error("No screen object given");
		if (currentScreen)
			currentScreen.close();
		currentScreen = object;
		currentScreen.open(self.wrapper, self.canvas);
		(currentScreen.onResize) && currentScreen.onResize(window.innerWidth, window.innerHeight);
		currentScreen.draw(self.ctx);
	}
	function onMenuButtonPress(origin, id) {
		if (origin === StartView) {
			if (id === 0) {
				self.setCurrentScreen(GameView);
			} else if (id === 1) {
				self.setCurrentScreen(HelpView);
			}
		} else if (origin === HelpView) {
			self.setCurrentScreen(StartView);
		}
	}
	function update(delta) {
		currentScreen.update(delta);
		currentScreen.draw(self.ctx);
	}
	function minifyStyle(s, mode=0) {
		return s.replace(/(\r\n|\t|\n|\r)/gm,"").split('').filter((char, index) => (((((mode == 1)&&(mode = 2))||true)&&(((char == ':')&&(mode = 1))||true)&&(char == ';')&&(mode = 0)||true)&&mode == 0)?(char !== ' '):((mode == 2)?((mode = 3)&&(char != ' ')):true)).join('');
	}
	function sendPause() {
		currentScreen.pause && currentScreen.pause();
	}
	function sendResume() {
		currentScreen.resume && currentScreen.resume();
	}
	return {
		init: init,
		setCurrentScreen: setCurrentScreen,
		onMenuButtonPress: onMenuButtonPress,
		update: update,
		minifyStyle: minifyStyle,
		sendPause: sendPause,
		sendResume: sendResume
	}
})();