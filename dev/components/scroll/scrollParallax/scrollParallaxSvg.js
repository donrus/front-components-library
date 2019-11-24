// https://ru.stackoverflow.com/questions/849330/%D0%9A%D0%B0%D0%BA-%D0%B0%D0%BD%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%B4%D0%B2%D0%B8%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0-%D0%B2%D0%B4%D0%BE%D0%BB%D1%8C-svg-%D0%BF%D1%83%D1%82%D0%B8-%D0%BF%D1%80%D0%B8-%D0%BF%D1%80%D0%BE%D0%BA%D1%80%D1%83%D1%82%D0%BA%D0%B5

(function($) {
  function positionCar() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const path = document.getElementById('planePath');
    // Calculate distance along the path the car should be for the current scroll amount
    const pathLen = path.getTotalLength();
    const dist = (pathLen * scrollY) / maxScrollY;
    const pos = path.getPointAtLength(dist);
    // Calculate position a little ahead of the car (or behind if we are at the end), so we can calculate car angle
    if (dist + 1 <= pathLen) {
      const posAhead = path.getPointAtLength(dist + 1);
      var angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
    } else {
      const posBehind = path.getPointAtLength(dist - 1);
      var angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
    }
    // Position the car at "pos" totated by "angle"
    const car = document.getElementById('plane');
    car.setAttribute('transform', `translate(${pos.x},${pos.y}) rotate(${rad2deg(angle)})`);
  }

  function rad2deg(rad) {
    return (180 * rad) / Math.PI;
  }

  // Reposition car whenever there is a scroll event
  window.addEventListener('scroll', positionCar);

  // Position the car initially
  positionCar();
}(jQuery));
