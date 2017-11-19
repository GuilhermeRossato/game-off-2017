const DataInState = 3;
const HistoryPerFrame = 3;
const SecondsToSave = 2;
const TotalToSave = DataInState * HistoryPerFrame * SecondsToSave;

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
			this.past[this.length*HistoryPerFrame+0] = this.state[0];
			this.past[this.length*HistoryPerFrame+1] = this.state[1];
			this.past[this.length*HistoryPerFrame+2] = this.state[2];
			this.tail = this.length;
			this.length ++;
		}
	}
}
