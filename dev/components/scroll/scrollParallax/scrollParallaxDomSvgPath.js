(function($) {
  const car = document.getElementById('plane');
  const path = document.getElementById('planePath');
  let startScrollPosition = -1;

  // стартовая позиция самолета
  car.style.transform = `translate(${-screen.width}px, -201px) rotate(30deg)`;

  const translateXStartPoint = -screen.width; // -1150;
  const translateYStartPoint = -201;
  const rotateStartAngle = 30;
  const intersectionMargin = `${-screen.height / 3}px`;

  function positionCar() {
    let scrollY = 0;
    if (startScrollPosition === -1) {
      startScrollPosition = window.scrollY || window.pageYOffset;
      scrollY = 1;
    } else {
      scrollY = (window.scrollY || window.pageYOffset) - startScrollPosition;
    }

    // const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const maxScrollY = screen.height / 2;

    if (maxScrollY < scrollY) {
      scrollY = maxScrollY;
    } else if (scrollY <= 0) {
      scrollY = 1;
    }
    // Calculate distance along the path the car should be for the current scroll amount
    const pathLen = path.getTotalLength();
    const dist = (pathLen * scrollY) / maxScrollY;
    const pos = path.getPointAtLength(dist);
    const posDOM = transformCoordinatesFromSvgToDOM(path, pos);
    // Calculate position a little ahead of the car (or behind if we are at the end), so we can calculate car angle
    if (dist + 1 <= pathLen) {
      const posAhead = path.getPointAtLength(dist + 1);
      const posAheadDOM = transformCoordinatesFromSvgToDOM(path, posAhead);
      var angle = Math.atan2(posAheadDOM.y - posDOM.y, posAheadDOM.x - posDOM.x);
    } else {
      const posBehind = path.getPointAtLength(dist - 1);
      const posBehindDOM = transformCoordinatesFromSvgToDOM(path, posBehind);
      var angle = Math.atan2(posDOM.y - posBehindDOM.y, posDOM.x - posBehindDOM.x);
    }
    // Position the car at "pos" totated by "angle"
    car.style.transform = `translate(${posDOM.x + translateXStartPoint}px, ${posDOM.y
      + translateYStartPoint}px) rotate(${rad2deg(angle) + rotateStartAngle}deg)`;
  }

  function rad2deg(rad) {
    return (180 * rad) / Math.PI;
  }

  function transformCoordinatesFromSvgToDOM(svgElement, pointInSVG) {
    const matrix = svgElement.getCTM();
    return pointInSVG.matrixTransform(matrix);
  }

  function setIntersectionObserver() {
    const options = {
      rootMargin: intersectionMargin,
    };

    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', positionCar);
        }
        if (!entry.isIntersecting) {
          window.removeEventListener('scroll', positionCar);
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector('.plane-path-container'));
  }
  // Position the car initially
  // positionCar();
  setIntersectionObserver();
}(jQuery));
