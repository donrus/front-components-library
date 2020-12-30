import '../../common/scss/main.scss';
import './horizontal-accordion-page.scss';

const panelsArray = document.querySelectorAll('.panel');
let activePanel = panelsArray[0];

panelsArray.forEach((panel) => {
  panel.addEventListener('click', () => {
    activePanel.classList.remove('active');
    panel.classList.add('active');
    activePanel = panel;
  });
});
