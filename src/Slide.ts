import Timeout from "./Timeout.js";

export default class Slide {
  container;
  slides;
  controls;
  time;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  pausedTimeout: Timeout | null;
  paused: boolean;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index];
    this.init();
    this.timeout = null;
    this.pausedTimeout = null;
    this.paused = false;
  }

  hide(el: Element) {
    el.classList.remove("active");
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((el) => this.hide(el));
    this.slide.classList.add("active");
    this.auto(this.time);
  }
  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }
  prev() {
    if (this.paused) return;
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }
  next() {
    if (this.paused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }
  pause() {
    console.log("paused");
    this.pausedTimeout = new Timeout(() => {
      this.paused = true;
    }, 300);
  }
  continue() {
    console.log("continue");
    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.auto(this.time);
    }
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
    this.controls.addEventListener("pointerdown", () => this.pause());
    this.controls.addEventListener("pointerup", () => this.continue());
  }

  private init() {
    this.addControls();
    this.show(this.index);
  }
}
