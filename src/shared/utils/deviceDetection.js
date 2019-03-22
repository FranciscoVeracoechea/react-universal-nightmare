// dependencies
import { fromEvent } from 'rxjs';
import { throttleTime, mapTo, map } from 'rxjs/operators';
// action
import { resolutionKind } from '../actions/deviceActions';
import { match, pipe } from './functional';


const deviceData = {
  isTouch: 'ontouchstart' in window || 'ontouchstart' in document.documentElement,
};

// Get device
export function getResolutionKind() {
  if (match('(max-width: 599px)')) {
    return {
      ...deviceData,
      pagination: 3,
      resolutionKind: 'mobile',
    };
  }
  if (match('(max-width: 960px)')) {
    return {
      ...deviceData,
      pagination: 6,
      resolutionKind: 'tablet',
    };
  }
  if (match('(max-width: 1600px)')) {
    return {
      ...deviceData,
      pagination: 9,
      resolutionKind: 'desktop',
    };
  }
  if (match('(min-width: 1601px)')) {
    return {
      ...deviceData,
      pagination: 12,
      resolutionKind: 'tv',
    };
  }
}

export const setInitialDevice = dispatch => pipe(
  getResolutionKind,
  resolutionKind,
  dispatch
)();

// deveice listener
export const resolution$ = fromEvent(window, 'resize').pipe(
  throttleTime(250),
  mapTo(getResolutionKind()),
  map(resolutionKind),
);
