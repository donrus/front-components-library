/* eslint-disable quote-props */
/* eslint-disable indent */
const defaults = {
  videoFrameID: '',
  observableElementSelector: '',
  observer: {
    options: {
      rootMargin: '-45%',
    },
  },
};
const YoutubeVideo = class YoutubeVideo {
  constructor(options = {}) {
    this.options = Object.assign(defaults, options);
  }

  init() {
    this.observableElement = document.querySelector(this.options.observableElementSelector);
    this.canPlay = false;
    this.isPlaying = false;
    this.loadYoutubeAPI();
    this.createPlayer();
    this.initObserver();
  }

  loadYoutubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  createPlayer() {
    window.onYouTubeIframeAPIReady = () => {
      this.player = new YT.Player(this.options.videoFrameID, {
        playerVars: {
          enablejsapi: 1,
        },
        events: {
          onReady: event => {
            this.canPlay = true;
          },
        },
      });
    };
  }

  initObserver() {
    this.options.observer.callback = (entries, observer) => {
      entries.forEach(entry => {
        if (this.player) {
          const playerState = this.player.getPlayerState();
          if (!this.canPlay) {
            return;
          }
          if (entry.isIntersecting) {
            this.play();
          }
          if (!entry.isIntersecting) {
            this.pause();
          }
        }
      });
    };
    this.observer = new IntersectionObserver(
      this.options.observer.callback,
      this.options.observer.options
    );
    this.observer.observe(this.observableElement);
  }

  destroy() {}

  play() {
    this.player.playVideo();
    this.isPlaying = true;
  }

  pause() {
    this.player.pauseVideo();
    this.isPlaying = false;
  }
};

export default YoutubeVideo;
