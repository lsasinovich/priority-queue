const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.heap = new MaxHeap();
		this.maxSize = maxSize || 30;
	}

	push(data, priority) {
				if(this.size() == this.maxSize)
			throw new Error();
		this.heap.push(data,priority);
	}

	shift() {
		if(this.isEmpty())
			throw new Error();
	  return this.heap.pop();
	}

	size() {
		return this.heap.heap.length;
	}

	isEmpty() {
		return this.heap.root == null;
	}
}

module.exports = PriorityQueue;
