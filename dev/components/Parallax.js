import htmlHelpersAPI from '../services/htmlAPI';

const defaultOptions = {};

const Parallax = class Parallax {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.scrollY = window.scrollY;
    this.parallaxLayers = [];
    this.parallaxElements = document.getElementsByClassName('metro-parallax');
  }

  init() {
    for (let i = 0; i < this.parallaxElements.length; i += 1) {
      const el = this.parallaxElements[i];
      const { height, width } = this.generateNewPosition();
      el.style.top = `${height}px`;
      el.style.left = `${width}px`;
      const { offset } = this.parallaxElements[i].dataset;
      this.parallaxLayers.push({ el, y: 0, x: 0, offset });
    }
    this.initEventListeners();
    requestAnimationFrame(this.animate.bind(this));
  }

  generateNewPosition() {
    return {
      height: htmlHelpersAPI.randomInteger(-100, htmlHelpersAPI.getPageHeight()),
      width: htmlHelpersAPI.randomInteger(-100, htmlHelpersAPI.getPageWidth()),
    };
  }

  initEventListeners() {
    window.addEventListener('scroll', this.onScrollHandle.bind(this));
  }

  onScrollHandle() {
    this.scrollY = window.scrollY;
  }

  animate() {
    for (let i = 0; i < this.parallaxLayers.length; i += 1) {
      const oldY = this.parallaxLayers[i].y;
      // const oldX = this.parallaxLayers[i].x;
      this.parallaxLayers[i].y = this.scrollY * this.parallaxLayers[i].offset;
      // this.parallaxLayers[i].x = this.scrollY * this.parallaxLayers[i].offset;

      if (oldY !== this.parallaxLayers[i].y) {
        this.parallaxLayers[i].el.style.transform = `translateY(${this.parallaxLayers[i].y}px)`; // rotate(${this.parallaxLayers[i].x}deg)`;
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {}
};

export default Parallax;
