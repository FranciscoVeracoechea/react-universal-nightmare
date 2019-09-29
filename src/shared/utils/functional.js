// functional programming styleds functions

// FUNCTIONS COMPOSERS
// pipe
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
// compose (inversed pipe)
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// ------------------------------------------------------
// VALIDATIONS
export const isArray = variable => (variable instanceof Array);

export const isDefined = value => (value !== false && typeof value !== 'undefined' && value !== null && value !== 0);

export const isFunction = variable => typeof variable === 'function';

export const isObject = variable => (isDefined(variable) && typeof variable === 'object');

export const isFloat = n => (n % 1 !== 0);

export const isFirstRender = items => (items && items.length === 0) || !isDefined(items);

export const executeIfFunction = (f, param = null) => ((f instanceof Function) ? f(param) : f);

export const isString = str => (typeof str === 'string');
// ------------------------------------------------------
// FUNCTIONAL STATEMENTS
// if else
export const iif = value => isTrue => isFalse => (
  value
    ? executeIfFunction(isTrue, value)
    : executeIfFunction(isFalse, value)
);

// switch case
export const switchCase = cases => defaultCase => key => executeIfFunction(
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase
);

// --------- TIMERS
// Timeout
export const timeout = (millisecons, func) => {
  const id = setTimeout(func, millisecons);
  return () => clearTimeout(id);
};
// Interval
export const interval = (millisecons, func) => {
  const id = setInterval(func, millisecons);
  return () => clearInterval(id);
};

// ---------- PARSERS
// value to number
export const numberParser = value => (Number.isNaN(Number(value)) ? value : Number(value));
// object keys to number
export const mapToNumber = object => Object.entries(object).reduce(
  (acc, current) => ({ ...acc, [current[0]]: numberParser(current[1]) }),
  {}
);

export const arrayToObject = (acc, current) => ({ ...acc, [current[0]]: numberParser(current[1]) });

export const objectFromEntries = array => array.reduce(arrayToObject, {});

// map form inputs with name and values to object
export const serialezeForm = formElement => [...formElement]
  .filter(element => (element.value && element.name))
  .map(input => [input.name, input.value])
  .reduce(arrayToObject, {});

// match media
export const match = media => window.matchMedia(media).matches;

// string capitalizer
export const capitalizer = (string, separator = ' ') => string.split(separator).map(
  word => word.split('').map(
    (char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase())
  ).join('')
).join(' ');

//
/* eslint-disable */
export const slugify = (text) => text.toString().toLowerCase()
  .replace(/&/g, '-and-')         // Replace & with 'and'
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '');            // Trim - from start of text
  // .replace(/-+$/, '');            // Trim - from end of text
/* eslint-enable */

export const emailValidator = (email) => {
  /* eslint-disable */
  const validator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return validator.test(email);
  /* eslint-enable */
};

export const newError = error => (params = {}) => {
  let e;
  if (error instanceof Error) e = error;
  else e = new Error(error);
  const { message, stack } = e;
  return {
    ...params, message, stack,
  };
};

export const futurize = Future => fn => (...args) => new Future(
  (rej, res) => fn(
    ...args,
    (err, result) => (err ? rej(err) : res(result))
  )
);

export const futurizeP = fn => (...args) => new Promise(
  (resolve, reject) => fn(
    ...args,
    (err, result) => (err ? reject(err) : resolve(result))
  )
);

export const getErrors = state => payload => ({
  ...state,
  loading: false,
  errors: payload.errors || payload.message || payload.error.message,
});

export const classList = (...strArray) => String(strArray.reduce((acc, current) => `${acc} ${current}`, ''));
