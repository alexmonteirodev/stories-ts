export default class Timeout {
  id;
  handler: TimerHandler;
  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = this.handler;
  }
  clear() {
    clearTimeout(this.id);
  }
}
