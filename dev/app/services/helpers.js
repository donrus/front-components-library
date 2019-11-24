/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const helpers = {
  isObjectEmpty(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  },
  getJsonFromUrl(url) {
    if (!url) url = window.location.search;
    const query = url.substr(1);
    const result = {};
    query.split('&').forEach(part => {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  /** Промисифицированный таймер
   * delay(1000).then(/* ... do whatever
   * doSomething().then(function(){ return delay(1000); }).then(doSomethingElse);
   *
   * */
  delay(ms) {
    let ctr;
    let rej;
    const p = new Promise((resolve, reject) => {
      ctr = setTimeout(resolve, ms);
      rej = reject;
    });
    p.cancel = function() {
      clearTimeout(ctr);
      rej(Error('Cancelled'));
    };
    return p;
  },
  /**
   * @function Таймер в формате 00:00:00:00 дни:часы:минуты:секунды
   */
  formatTimer(timeInSeconds) {
    const day = Math.floor(timeInSeconds / 60 / 60 / 24);
    const hour = Math.floor((timeInSeconds - day * 60 * 60 * 24) / 60 / 60);
    const mins = Math.floor((timeInSeconds - day * 60 * 60 * 24 - hour * 60 * 60) / 60);
    const seconds = Math.ceil(timeInSeconds - day * 60 * 60 * 24 - hour * 60 * 60 - mins * 60);

    let dayString = '00';
    let hourString = '00';
    let minsString = '00';
    let secondsString = '00';

    if (String(seconds).length > 1) {
      if (String(seconds).length === 60) {
        secondsString = 59;
      }
      secondsString = seconds;
    } else {
      secondsString = `0${seconds}`;
    }

    if (String(mins).length > 1) {
      if (String(mins).length === 60) {
        minsString = 59;
      }
      minsString = mins;
    } else {
      minsString = `0${mins}`;
    }

    if (String(hour).length > 1) {
      if (String(hour).length === 60) {
        hourString = 59;
      }
      hourString = hour;
    } else {
      hourString = `0${hour}`;
    }

    if (String(day).length > 1) {
      dayString = day;
    } else {
      dayString = `0${day}`;
      if (day < 1) {
        dayString = '00';
      }
    }
    return {
      days: dayString,
      hours: hourString,
      minutes: minsString,
      seconds: secondsString,
    };
  },

  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let dayString = '';
    let monthString = '';
    let yearString = '';
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';

    const prepareString = input => {
      let output;
      if (String(input).length > 1) {
        output = input;
      } else {
        output = '0'+input;
      }
      return output;
    };

    dayString = prepareString(day);
    monthString = prepareString(month);
    yearString = prepareString(year);
    hoursString = prepareString(hours);
    minutesString = prepareString(minutes);
    secondsString = prepareString(seconds);

    return `${dayString}.${monthString}.${yearString} ${hoursString}:${minutesString}`;
  },

  leadingZeros(number, numberOfDigits) {
    let s = String(number);
    while (s.length < (numberOfDigits || 2)) {
      s = `0${s}`;
    }
    return s;
  },
};

export default helpers;
