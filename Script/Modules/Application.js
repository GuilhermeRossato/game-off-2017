class Application {
	constructor() {
		this.interface = new Interface("center");
		VariableTimeStep.begin(this.interface.update.bind(this.interface), this.interface.pause.bind(this.interface));
	}
}