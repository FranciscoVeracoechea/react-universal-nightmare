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

// map form inputs with name and values to object
export const serialezeForm = formElement => [...formElement]
  .filter(element => (element.value && element.name))
  .map(input => [input.name, input.value])
  .reduce(arrayToObject, {});

// Try Catch

export class Result {
  constructor(go) {
    this.go = go;
  }

  static Ok(v) {
    return new this((onSuccess, _) => onSuccess(v));
  }

  static Err(r) {
    return new this((_, onFailure) => onFailure(r));
  }

  map(f) {
    return this.go(v => Result.Ok(f(v)), r => Result.Err(r));
  }

  chain(f) {
    return this.go(v => f(v), r => Result.Err(r));
  }

  unwrap() {
    return this.go(v => v, (r) => { throw r; });
  }
}

export const tryCatch = (attempt) => {
  if (typeof attempt !== 'function') {
    throw new Error('tryCatch: the parameters must be of function type');
  }
  try {
    const res = attempt();
    return Result.Ok(res);
  } catch (e) {
    return Result.Err(e);
  }
};
// match media
export const match = media => window.matchMedia(media).matches;

// string capitalizer
export const capitalizer = (string, separator = ' ') => string.split(separator).map(
  word => word.split('').map(
    (char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase())
  ).join('')
).join(' ');

//
export const slugify = (text) => {
  /* eslint-disable */
  return text.toString().toLowerCase()
    .replace(/&/g, '-and-')         // Replace & with 'and'
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    // .replace(/-+$/, '');            // Trim - from end of text
  /* eslint-enable */
};

export const emailValidator = (email) => {
  /* eslint-disable */
  const validator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return validator.test(email);
  /* eslint-enable */
};
