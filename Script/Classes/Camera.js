class Camera {
	constructor() {
		this.origin = new Float32Array(3);
		this.target = new Float32Array(3);
		this.zoomSpeed = 0.4;
		this.movementSpeed = 0.2;
	}
	update(delta) {
		if (delta == 1) {
			this.origin[0] = b(this.origin[0], this.target[0], this.movementSpeed);
			this.origin[1] = b(this.origin[1], this.target[1], this.movementSpeed);
			this.origin[2] = b(this.origin[2], this.target[2], this.zoomSpeed);
		}
	}
}