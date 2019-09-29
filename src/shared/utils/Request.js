import root from 'window-or-global';
import xh2 from 'xhr2';
import { ajax } from 'rxjs/ajax';


const baseUrl = root.browserEnv.appUrl;
// global headers for all request
const globalHeaders = {
  Accept: 'application-json',
};

const isServer = typeof XMLHttpRequest === 'undefined';

const XHR = !isServer ? XMLHttpRequest : xh2;

const getUrl = (options) => {
  const { useBaseUrl, url } = options;
  if (typeof useBaseUrl === 'undefined') {
    return isServer ? `${baseUrl}${url}` : url;
  }
  return options.useBaseUrl && options.url ? `${baseUrl}${options.url}` : options.url;
};

export default (options) => {
  const configs = {
    ...options,
    url: getUrl(options),
    headers: { ...globalHeaders, ...options.headers },
  };
  return ajax({
    createXHR: () => new XHR(),
    ...configs,
  });
};
