// Implement Queue including Create Queue, Add to Queue, Remove from Queue

// Implementation of Basic Queue
const Queue = class Queue {
  constructor() {
    this.items = [];
  }
  addToQueue(obj) {
    this.items.push(obj);
  }
  checkLength() {
    return this.items.length;
  }
  takeNext() {
    return this.items.splice(0, 1)[0];
  }
};

module.exports = Queue;
