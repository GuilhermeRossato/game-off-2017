const DataInState = 3;
const StatePerSecond = 3;
const SecondsToSave = 2;
const TotalToSave = DataInState * StatePerSecond * SecondsToSave;

class Entity {
	constructor(polygons) {
		this.state = new Float32Array(DataInState);
		this.past = new Float32Array(TotalToSave);
		this.head = 0;
		this.tail = 0;
		this.length = 0;
		this.polygons = polygons;
	}
	updateState() {
		if (this.length < TotalToSave) {
			this.past[this.length*StatePerSecond+0] = this.state[0];
			this.past[this.length*StatePerSecond+1] = this.state[1];
			this.past[this.length*StatePerSecond+2] = this.state[2];
			this.tail = this.length;
			this.length ++;
		} else {
			this.past[this.head*StatePerSecond+0] = this.state[0];
			this.past[this.head*StatePerSecond+1] = this.state[1];
			this.past[this.head*StatePerSecond+2] = this.state[2];
			this.head = (this.head+1)%TotalToSave;
			this.tail = (this.tail+1)%TotalToSave;
		}
	}
}
