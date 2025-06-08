export default class Timeout {
  id;
  handler: TimerHandler;
  start;
  timeLeft;
  constructor(handler: TimerHandler, time: number) {
    this.id = setTimeout(handler, time);
    this.handler = handler;
    this.start = Date.now();
    this.timeLeft = time;
  }
  clear() {
    clearTimeout(this.id);
  }
  pause() {
    const passed = Date.now() - this.start;
    this.timeLeft = this.timeLeft - passed;
    this.clear();
  }
  continue() {
    this.clear();
    this.id = setTimeout(this.handler, this.timeLeft);
    this.start = Date.now();
  }
}
// para o storie continuare do momento em que o user pressiona a tela e não resetar, vamos pegar o tempo agora em milisegundos do pc em Date.now e subtrair do time que é o tempo que o dev determinar, no caso 3s.
