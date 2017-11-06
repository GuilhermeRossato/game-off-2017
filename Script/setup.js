var app;

function onWindowLoad() {
	if (!app)
		app = new Application();
}

window.addEventListener("load", onWindowLoad);