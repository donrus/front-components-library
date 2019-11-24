import '../../common/scss/main.scss';
import './tsikloferon-style-page.scss';


import FAQBlockComponent from '../../blocks/tsikloferon/faq/faq';



window.onload = function() {
  let tsikloferonFAQBlock = new FAQBlockComponent({dataSource: 'local'});
  tsikloferonFAQBlock.init();
};
