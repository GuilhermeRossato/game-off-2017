function onWindowLoad() {
	if (!Interface.init) return;

	Interface.init("center");

	TimeSystem.init();

	ConstantTimeStep.begin(Interface.update.bind(Interface), TimeSystem.pause.bind(TimeSystem));

	Application.init();
}

window.addEventListener("load", onWindowLoad);