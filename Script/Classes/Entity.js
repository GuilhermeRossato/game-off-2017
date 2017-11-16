const DataInState = 3;
const HistoryPerFrame = 3;
const SecondsToSave = 2;
const TotalToSave = DataInState * HistoryPerFrame * SecondsToSave;

class Entity {
	constructor(polygons) {
		this.state = new ArrayBuffer(DataInState);
		this.past = new ArrayBuffer(TotalToSave);
		this.head = 0;
		this.tail = 0;
		this.length = 0;
		this.polygons = polygons;
	}
	updateState(nx, ny, ns) {
		this.addState(nx, ny, ns);
		if (this.length < TotalToSave) {
			this.past[this.length*HistoryPerFrame] = nx;
			this.past[this.length*HistoryPerFrame+1] = ny;
			this.past[this.length*HistoryPerFrame+2] = ns;
			this.tail = this.length;
			this.length ++;
		}
	}
}
