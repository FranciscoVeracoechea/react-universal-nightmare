// @flow
import root from 'window-or-global';
import xh2 from 'xhr2';
import { ajax } from 'rxjs/ajax';
import type { Observable } from 'rxjs';
import type { AjaxRequest, AjaxResponse } from 'rxjs/ajax';


type RequestOptions = {
  useBaseUrl?: boolean,
  url: string,
};
const baseUrl = root.browserEnv.appUrl;
const globalHeaders = {
  Accept: 'application-json',
};

const XHR = typeof XMLHttpRequest !== 'undefined' ? XMLHttpRequest : xh2;

export default (options: AjaxRequest & RequestOptions): Observable<AjaxResponse> => {
  const configs = {
    ...options,
    url: options.useBaseUrl && options.url ? `${baseUrl}${options.url}` : options.url,
    headers: { ...globalHeaders, ...options.headers },
  };
  return ajax({
    createXHR: () => new XHR(),
    ...configs,
  });
};
