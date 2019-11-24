/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/** @module
 * Валидация форм
 * на основе библиотеки https://validatejs.org/
 */
import each from 'lodash/each';
import validate from 'validate.js';
import helpers from './helpers';

/** настройка общих сообщений валидации */
validate.validators.presence.message = '_Это поле является обязательным.';
validate.validators.email.message = '_Email может быть формата XX@XXXX.XX';

/**
 * Кастомные валидаторы: функция с заданными полями.
 * Возвращаемое значение будет использоваться как сообщение об ошибке.
 */

/** Кастомный валидатор телефонных номеров phone */
validate.validators.phone = function(value, options, key, attributes) {
  // if(options.isRequired === false && !validate.isDefined(value)){
  //   return;
  // }
  if (!validate.isDefined(value)) {
    return;
  }
  if (/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(value)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return '_Номер телефона должен быть в формате +7DEFXXXXXXX';
};

/** Кастомный валидатор телефонных номеров phone */
validate.validators.onlyDigits = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код может состоять только из цифр';
  }
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор кодов ККТ */
validate.validators.rnkkt = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код ККТ может состоять только из 16 цифр';
  }
  // options.inputElement.value = helpers.leadingZeros(parseInt(value), 16);
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор кодов ФД */
validate.validators.fd = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код ФД может состоять только из 13 цифр';
  }
  // options.inputElement.value = helpers.leadingZeros(parseInt(value), 13);
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор кодов ФД */
validate.validators.fn = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код ФН может состоять только из 16 цифр';
  }
  // options.inputElement.value = helpers.leadingZeros(parseInt(value), 16);
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор кодов ФД */
validate.validators.fpd = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код ФПД может состоять только из 13 цифр';
  }
  // options.inputElement.value = helpers.leadingZeros(parseInt(value), 13);
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор кодов ЗН ККТ */
validate.validators.znkkt = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/[^0-9]/.test(value)) {
    return '_Код  ЗН ККТ может состоять только из 20 цифр';
  }
  // options.inputElement.value = helpers.leadingZeros(parseInt(value), 20);
  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор password */
validate.validators.password = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/^[A-Za-zА-Яа-я0-9_]{5,20}$/.test(value)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return '_Пароль может содержать латиницу, цифры. <br />Длина от 5 до 20 символов.';
};

/** Кастомный валидатор name */
validate.validators.name = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/^[А-Яа-я _-]{2,20}$/.test(value)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return '_Имя может состоять из кириллицы, тире и пробела.<br />Длина от 2 до 20 символов.';
};

/** Кастомный валидатор name */
validate.validators.nickname = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/^[А-ЯЁа-яёa-zA-Z_-]{2,20}$/.test(value)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return '_Никнейм может состоять из кириллицы, латиницы, тире и подчеркивания.<br />Длина от 2 до 20 символов.';
};

/** Кастомный валидатор ИНН */
validate.validators.INN = function(inn, options, key, attributes) {
  let result = false;
  if (!validate.isDefined(inn)) {
    return;
  }
  if (typeof inn === 'number') {
    inn = inn.toString();
  } else if (typeof inn !== 'string') {
    inn = '';
  }
  if (!inn.length) {
    return '_ИНН пуст';
  }
  if (/[^0-9]/.test(inn)) {
    return '_ИНН может состоять только из цифр';
  }
  if ([10, 12].indexOf(inn.length) === -1) {
    return '_ИНН может состоять только из 10 или 12 цифр';
  }
  const checkDigit = function(inn, coefficients) {
    let n = 0;
    for (const i in coefficients) {
      n += coefficients[i] * inn[i];
    }
    return parseInt((n % 11) % 10);
  };
  switch (inn.length) {
  case 10:
    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n10 === parseInt(inn[9])) {
      result = true;
    }
    break;
  case 12:
    var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
    var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
      result = true;
    }
    break;
  default:
    return '_Длина ИНН кода 10 или 12 цифр.';
  }
  if (!result) {
    return '_Неправильное контрольное число';
  }

  // eslint-disable-next-line consistent-return
  return;
};

/** Кастомный валидатор surname */
validate.validators.surname = function(value, options, key, attributes) {
  if (!validate.isDefined(value)) {
    return;
  }
  if (/^[А-Яа-я _-]{1,20}$/.test(value)) {
    return;
  }
  // eslint-disable-next-line consistent-return
  return '_Фамилия может состоять из кириллицы, тире и пробела.<br />Длина от 1 до 20 символов.';
};

/**
 * @function
 * @name validateForm
 * @description Валидирует форму. Вызывается из обработчика события подписки формы или
 * события изменения отдельного инпута
 * @param {DOMForm} form - валидируемая форма
 * @param {Object} rules - список полей с правилами валидации
 * @example <caption>Пример объекта правил</caption>
  rules: {
    modalLoginUserPhone: {
      presence: true,
      phone: true,
    },
    modalLoginUserPassw: {
      presence: true,
      length: {
        minimum: 5,
        maximum: 20,
        message: '_Пароль может содержать латиницу, цифры. <br />Длина от 5 до 20 символов.',
      },
    },
  },
 * @param {DOMInput} input - валидируемый input, если передан
 * @returns {boolean} - true, если валидация успешна и false в противном случае.
 */
export const validateForm = (form, rules, input = undefined) => {
  let errors;
  if (!input) {
    errors = validate(form, rules);
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
      return true;
    }
    return false;
  }
  errors = validate(form, rules);
  if (errors) {
    showErrorsForInput(input, errors[input.name]);
  }
};

/**
 * @function
 * @name showErrors
 * Отображает ошибки для каждого поля.
 * Side effects: функция выбирает все поля формы и вызывает для них @see showErrorsForInput
 * @param {DOMForm} form - валидируемая форма
 * @param {Array} errors - массив сообщений об ошибках. Формат массива зависит от настроек библиотеки validate.js
 * @returns - ничего не возвращает.
 */
const showErrors = (form, errors) => {
  each(form.querySelectorAll('input, textarea, select'), input => {
    showErrorsForInput(input, errors && errors[input.name]);
  });
};

/**
 * @function
 * @name showErrorsForInput
 * Отображает ошибки на конкретном поле. В библиотеке validate.js все сообщения об ошибке
 * предваряются именем поля из атрибута name. Чтобы убрать это имя из сообщений об ошибке:
 * - можно написать свой форматтер, но в него уже передается сформированная строка об ошибке,
 * поэтому в нем нужно парсить строку и выбрасывать значение атрибута name.
 * - все кастомные сообщения об ошибке предварять символом "_", а при выводе парсить и отбрасывать
 * часть строки до этого символа. (Вариант реализован в данном методе)
 * Контейнер input должен иметь класс input-field
 * Если валидация успешна, то к контейнеру добавляется класс validation-ok
 * Если валидация вернула ошибку, то к контейнеру добавляется класс validation-false и
 * в элемент с классом helper-text выводится текст ошибки.
 * Side-effects: непосредственно меняет DOM добавляя классы и текст в контейнер для ошибки
 * @param {DOMInput} input - поле, для которого требуется вывести ошибки
 * @param {Array} errors - массив сообщений об ошибках
 * @returns - none
 */
export const showErrorsForInput = (input, errors) => {
  const formField = closestParent(input.parentNode, 'validated-field');
  resetFormField(formField);
  if (errors) {
    formField.classList.add('validation-false');
    let errorText = '';
    each(errors, error => {
      // addError(messages, error);
      error = error.substring(error.indexOf('_') + 1);
      errorText = errorText.concat(`${error} `);
    });
    formField.querySelector('.helper-text').innerHTML = errorText;
  } else {
    formField.classList.add('validation-ok');
  }
};

/**
 * Этот метод отображает сообщение об ошибке, полученное с сервере, для конкретного поля
 * @param {DOMInput} input - поле для которого требуется вывести ошибку валидации полученную с сервера
 * @param {*} errorMessage - строка с сообщением об ошибке
 */
export const showServerErrorsForInput = (input, errorMessage) => {
  const formField = closestParent(input.parentNode, 'validated-field');
  resetFormField(formField);
  formField.classList.add('validation-false');
  formField.querySelector('.helper-text').innerHTML = errorMessage;
};

/**
 * @function
 * @name closestParent
 * Ищет ближайшего родителя input с таким именем класса, чтобы затем к нему
 * добавить классы валидации.
 * Side-effects: none.
 * @param {DOMElement} element - HTML элемент ближайший родитель к input
 * @param {*} className - имя класса
 * @returns {DOMElement || null} - возвращает DOMElement, если родитель с таким классом найден.
 * null - если не найден
 */
export const closestParent = (element, className) => {
  if (!element || element === document) {
    return null;
  }
  if (element.classList.contains(className)) {
    return element;
  }
  return closestParent(element.parentNode, className);
};

/**
 * @function
 * @name resetFormField
 * Очищает ошибки валидации
 * Side-effects: непосредственно меняет элементы DOM, удаляя классы.
 * @param {DOMInput} formField - поле для которого необходимо очистить предыдущие ошибки валидации
 * @returns - none
 */
export const resetFormField = formField => {
  if (formField.classList.contains('g-recaptcha-response')) {
    return;
  }
  if (formField.classList.contains('validation-false')) {
    formField.classList.remove('validation-false');
  }
  if (formField.classList.contains('validation-ok')) {
    formField.classList.remove('validation-ok');
  }

  each(formField.querySelectorAll('.helper-text'), el => {
    el.innerHTML = '';
  });
};

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
// addError(messages, error) {
//   var block = document.createElement("p");
//   block.classList.add("help-block");
//   block.classList.add("error");
//   block.innerText = error;
//   messages.appendChild(block);
// }

/**
 * @function
 * @name showSuccess
 * Этот метод вызывается при успешном прохождении валидации.
 * В нем можно обработать удачную валидацию.
 */
const showSuccess = () => {};
