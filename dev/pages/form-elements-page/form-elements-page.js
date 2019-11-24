import '../../common/scss/main.scss';
import './form-elements-page.scss';
import '../../components/form-components/inputs/es-custom-input/es-custom-input';
import '../../components/form-components/checkboxes/es-custom-checkbox/es-custom-checkbox';
import '../../components/form-components/checkboxes/es-rubber-checkbox/es-rubber-checkbox';

import EsCustomSelectComponent from '../../components/form-components/selects/es-custom-select/es-custom-select';
import EsCustomAnimatedInput from '../../components/form-components/inputs/es-custom-animated-input/es-custom-animated-input';


window.onload = function() {
  let askQuestionSelect = new EsCustomSelectComponent();
  let inputFloatingLabel = new EsCustomAnimatedInput({inputContainerClassNameSelector:'.es-custom-animated-input__floating-label'});
  inputFloatingLabel.init();
  let inputMixedEffects = new EsCustomAnimatedInput({inputContainerClassNameSelector:'.es-custom-animated-input__mixed-effects'});
  inputMixedEffects.init();
};