function onWindowLoad() {
	Interface.init("center");
	Interface.setCurrentScreen(StartView);

	TimeSystem.init();

	Application.init();

	ConstantTimeStep.begin(Interface.update.bind(Interface), TimeSystem.pause.bind(TimeSystem));
}

window.addEventListener("load", onWindowLoad);