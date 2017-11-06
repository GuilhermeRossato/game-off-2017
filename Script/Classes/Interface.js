class Interface {
	constructor(wrapper) {
		this.wrapper = (typeof wrapper === "string")?document.getElementById(wrapper):wrapper;
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.wrapper.appendChild(this.canvas);
		
		this.wrapper.setStyle = (style) => this.wrapper.setAttribute("style", Interface.minifyStyle(style));
		this.canvas.setSize = (width, height) => (this.canvas.width = width)&&(this.canvas.height = height);
		
		//var playButton = new PlayButtonScreen(this.wrapper, this.canvas);
		//this.setCurrentScreen(playButton);
		this.setCurrentScreen(new CreateEntityScreen(this.wrapper, this.canvas));
		window.addEventListener("keydown", (ev)=>(ev.code === "KeyP")&&(this.paused)&&(this.unpause()));
	}
	setCurrentScreen(screen) {
		this.currentScreen = screen;
	}
	update(delta) {
		this.currentScreen.update(delta);
		this.currentScreen.draw(this.ctx);
	}
	pause(delta) {
		if (this.paused) return;
		if (!this.currentScreen.pausable) return;
		(this.currentScreen.pause) && this.currentScreen.pause();
		this.paused = true;
	}
	unpause() {
		if (!this.paused) return;
		if (this.currentScreen.pausable) return;
		(this.currentScreen.unpause) && this.currentScreen.unpause();
		this.paused = false;
	}
	static minifyStyle(s, mode=0) {
		return s.replace(/(\r\n|\t|\n|\r)/gm,"").split('').filter((char, index) => (((((mode == 1)&&(mode = 2))||true)&&(((char == ':')&&(mode = 1))||true)&&(char == ';')&&(mode = 0)||true)&&mode == 0)?(char !== ' '):((mode == 2)?((mode = 3)&&(char != ' ')):true)).join('');
	}
}