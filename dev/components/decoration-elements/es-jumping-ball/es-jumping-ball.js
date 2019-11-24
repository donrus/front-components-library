import './es-jumping-ball.scss';

import {Power0, TimelineMax, TweenMax} from 'gsap';


export default class EsJumpingBall{
  constructor() {
    this.isAnimationPaused = false;
    this.ballsArray = document.getElementsByClassName('es-jumping-ball');
    this.ballsAnimationTimeLine = {};
    if (window.outerWidth >= 980) {
      this.init();
    }
  }

  init(){
    this.ballsAnimationTimeLine = new TimelineMax({repeat: -1, paused: true});

    for (let i = 0; i < this.ballsArray.length; i++) {

      for(let j = 0; j < 10; j++) {
        let x = Math.floor(Math.random() * 61) - 30;
        let y = Math.floor(Math.random() * 61) - 30;
        //let duration = 3;
        let animationTween = TweenMax.to(this.ballsArray[i],
          3,
          {x: x, y: y, ease: Power0.easeNone, delay: 0.2,
          }
        );
        let revertAnimationTween = TweenMax.to(this.ballsArray[i],
          3,
          {x: 0, y: 0, ease: Power0.easeNone,
          }
        );
        //animationTween.progress(1).reverse();
        this.ballsAnimationTimeLine.add(animationTween,'start' + j);
        this.ballsAnimationTimeLine.add(revertAnimationTween,'start'+ j +'+=3.2');
      }
    }
    this.ballsAnimationTimeLine.play();

    window.addEventListener('scroll', this.__stopAnimationOnScroll.bind(this));
  }

  __stopAnimationOnScroll(){
    if(!this.isAnimationPaused){
      this.isAnimationPaused = true;
      this.ballsAnimationTimeLine.pause();
      setTimeout(() => {
        this.isAnimationPaused = false;
        this.ballsAnimationTimeLine.play();
      },1000);
    }
  }

}