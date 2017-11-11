const Interface = (function() {
	var self;
	function init(wrapper) {
		self = Interface;
		self.wrapper = (typeof wrapper === "string")?document.getElementById(wrapper):wrapper;
		if (!self.wrapper)
			throw new Error("Interface could not retrieve wrapper");
		self.canvas = document.createElement("canvas");
		self.ctx = self.canvas.getContext("2d");
		self.wrapper.appendChild(self.canvas);
		
		self.wrapper.setStyle = (style) => self.wrapper.setAttribute("style", Interface.minifyStyle(style));
		self.canvas.setSize = (width, height) => (self.canvas.width = width)&&(self.canvas.height = height);
		
		self.setCurrentScreen({});
		[
			["keydown", self.onRawKeyDown],
			["keyup", self.onRawKeyUp],
			["mousedown", self.onRawMouseDown],
			["mousemove", self.onRawMouseMove],
			["mouseup", self.onRawMouseUp],
		].forEach(c => window.addEventListener(c[0], c[1].bind(self)));
	}
	function onRawKeyDown(event) {
		(self.currentScreen.onKeyDown) && self.currentScreen.onKeyDown(event.key);
	}
	function onRawKeyUp(event) {
		(self.currentScreen.onKeyUp) && self.currentScreen.onKeyUp(event.key);
	}
	function onRawMouseDown(event) {
		(self.currentScreen.onMouseDown) && self.currentScreen.onMouseDown(event.button, event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function onRawMouseMove(event) {
		(self.currentScreen.onMouseMove) && self.currentScreen.onMouseMove(event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function onRawMouseUp(event) {
		(self.currentScreen.onMouseUp) && self.currentScreen.onMouseUp(event.button, event.clientX - self.canvas.offsetLeft, event.clientY - self.canvas.offsetTop);
	}
	function setCurrentScreen(object) {
		if (!object)
			throw new Error("No screen object given");
		self.currentScreen.close();
		self.currentScreen = object;
		self.currentScreen.open(wrapper, canvas, ctx);
	}
	function update() {
		self.currentScreen.update(delta);
		self.currentScreen.draw(self.ctx);
	}
	static minifyStyle(s, mode=0) {
		return s.replace(/(\r\n|\t|\n|\r)/gm,"").split('').filter((char, index) => (((((mode == 1)&&(mode = 2))||true)&&(((char == ':')&&(mode = 1))||true)&&(char == ';')&&(mode = 0)||true)&&mode == 0)?(char !== ' '):((mode == 2)?((mode = 3)&&(char != ' ')):true)).join('');
	}
	return {
		init: init,
		setCurrentScreen: setCurrentScreen,
		update: update,
		minifyStyle: function(s, mode=0) {
			return s.replace(/(\r\n|\t|\n|\r)/gm,"").split('').filter((char, index) => (((((mode == 1)&&(mode = 2))||true)&&(((char == ':')&&(mode = 1))||true)&&(char == ';')&&(mode = 0)||true)&&mode == 0)?(char !== ' '):((mode == 2)?((mode = 3)&&(char != ' ')):true)).join('');
		}
	}
})();