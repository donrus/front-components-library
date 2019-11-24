import './faq.scss';
import $ from 'jquery';
import EsCustomAccordion from '../../../components/accordions/es-accordion/es-accordion';

const  defaults = {
  dataSource:  'local', // или ajax
};

export default class FAQBlockComponent{
  constructor(options = {}){
    this.options = Object.assign(defaults, options);
  }

  async init(){
      this.__setEventListeners();
    if(this.options.dataSource === 'local'){
        this.accordionComponent = new EsCustomAccordion();
    }
    else if(this.options.dataSource === 'ajax'){
        try{
            this.accordionData = await __getAccordionData('/api/v1/faq');
            this.__render(this.accordionData, 3);
            this.accordionComponent = new EsCustomAccordion();
        }
        catch (e) {

        }
    }
  }

  async __getAccordionData(url){
      return new Promise((resolve, reject) => {
          $.ajax({
              //crossOrigin: true,
              //mode: 'no-cors',
              //url: 'faq.json',
              url: url,
              dataType: 'json',
              success: (data) => {
                  resolve(data);
              },
              error: function(error) {
                  reject(error);
              },
          });
      })
  }

  __setEventListeners(){
      document.addEventListener('click', (e) => {
          if (e.target.classList.contains('faq-section__show-more')) {
              //this.showFaq(this.accordionData, 'all');
              document.querySelector('.faq-section__show-more').classList.add('faq-section__show-none');
              document.querySelector('.faq-section__show-min').classList.remove('faq-section__show-none');
          }
          if (e.target.classList.contains('faq-section__show-min')) {
              //this.showFaq(this.accordionData, 3);
              document.querySelector('.faq-section__show-min').classList.add('faq-section__show-none');
              document.querySelector('.faq-section__show-more').classList.remove('faq-section__show-none');
              $('html, body').animate({
                  scrollTop: $('#faq').offset().top,
              }, 500);
          }
      });
  }

  __render(data, some){
    	if(some=='all'){
    		some=data.length;
    	}
    	if(data){
    		this.accordionData = data;
    		document.querySelector('.es-custom-accordion').innerHTML = '';
	    	for(let i=0; i<some; ++i) {
	            document.querySelector('.es-custom-accordion').innerHTML += '<li><a class="es-accordion-link">'+data[i].title+'</a><div class="es-accordion-content"><p>'+data[i].description+'</p></div>';
	        }
    	}
  }

}