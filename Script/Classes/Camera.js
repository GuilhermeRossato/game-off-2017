class Camera extends Entity {
	constructor() {
		this.target = new Float32Array(3);
		this.zoomSpeed = 0.4;
		this.movementSpeed = 0.2;
	}
	update(delta) {
		if (delta == 1) {
			this.state[0] = b(this.origin[0], this.target[0], this.movementSpeed);
			this.state[1] = b(this.origin[1], this.target[1], this.movementSpeed);
			this.state[2] = b(this.origin[2], this.target[2], this.zoomSpeed);
		}
		this.updateState();
	}
}