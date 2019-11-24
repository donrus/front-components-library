/* eslint-disable */
(function($) {
  if (matchMedia('handheld').matches) {
    return;
  }

  const plane = document.getElementById('plane');
  const animationContainerBlock = document.querySelector('.conditions-block');
  let windowScrollY = window.scrollY || window.pageYOffset;

  /**
   * начальные свойства блока, могут быть любые
   */
  const startAngle = 86;
  const startTranslateX = -screen.width;
  const startTranslateY = -screen.height / 3;

  /**
   * инициализация данных для прокрутки
   * animationContainerBlockBottom - конец блока в котором будет происходить анимация по прокрутке
   * на данный момент принимается, что анимация полностью должна закончиться и анимируемый блок
   * должен стать в свою конечную позицию, когда нижняя часть блока в котором происходит анимация
   * совпадает с нижней частью экрана. Возможно сдеалать смещение, тогда нужно от этой величины:
   * отнять, если хотим чтобы анимация закончилась раньше или прибавить, если позже
   */
  const animationContainerBlockBottom =
    getCoords(animationContainerBlock).top + animationContainerBlock.getBoundingClientRect().height;
  /**
   * maxScrollY это величина прокрутки в течение которой будет происходить анимация (100%)
   * эта величина можеть быть равна или длине пути, или высоте какой-либо секции и т.д.
   */
  const maxScrollY = screen.height / 2;
  /**
   * endScrollValue - величина прокрутки, при которой анимация должна закончится
   */
  const endScrollValue = animationContainerBlockBottom - screen.height;
  const startScrollValue = endScrollValue - maxScrollY;
  /**
   * startOffset - это смещение, если при загрузке страницы, часть блока в котором
   * будет происходить анимация уже есть в пределах экрана и поэтому анимируемый элемент
   * нужно передвинуть на величину смещения
   */
  const startOffset = 0;

  /**
   * если величина смещения отрицательная, то значит нужно установить свойства
   * анимации этого элемента на это смещение
   * Затем startScrollValue принимается равным 0, а
   * endScrollValue уменьшается на величину этого смещения
   */
  const angleOffset = 0;
  const translateXOffset = 0;
  const translateYOffset = 0;
  if (startScrollValue < 0) {
    startOffset = -startScrollValue;
    angleOffset = (startAngle * startOffset) / maxScrollY;
    translateXOffset = (startTranslateX * startOffset) / maxScrollY;
    translateYOffset = (startTranslateY * startOffset) / maxScrollY;
    endScrollValue = maxScrollY + startScrollValue;
    startScrollValue = 0;
  }

  // стартовая позиция самолета
  plane.style.transform = `translate(${-startTranslateX - translateXOffset}px, ${-startTranslateY -
    translateYOffset}px) rotate(${startAngle - angleOffset}deg)`;

  function positionPlane() {
    /**
     * устанавливается величина прокрутки
     */
    if (windowScrollY > endScrollValue) {
      scrollY = maxScrollY;
    } else if (windowScrollY < startScrollValue) {
      scrollY = 1;
    } else {
      scrollY = windowScrollY - startScrollValue;
    }

    /**
     * от величины прокрутки рассчитываются свойства анимации
     */
    const angle = (startAngle * scrollY) / maxScrollY;
    const translateX = (startTranslateX * scrollY) / maxScrollY;
    const translateY = (startTranslateY * scrollY) / maxScrollY;

    plane.style.transform = `translate(${startTranslateX -
      translateXOffset -
      translateX}px, ${startTranslateY - translateYOffset - translateY}px) rotate(${startAngle -
      angleOffset -
      angle}deg)`;
    requestAnimationFrame(positionPlane);
  }

  function scrollYHandler(event) {
    windowScrollY = window.pageYOffset || window.scrollY;
  }

  // получаем координаты элемента в контексте документа
  function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }

  window.addEventListener('scroll', scrollYHandler);

  positionPlane();
})(jQuery);
