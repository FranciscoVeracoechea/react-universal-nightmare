// @flow
export const actionTypes = {
  setUADevice: 'SET_DEVICE_BY_USER_AGENT',
  resolutionKind: 'SET_DEVICE_BY_RESOLUTION',
};

export const setUADevice = (payload: { isMobile: boolean, isBot: boolean }) => ({
  type: actionTypes.setUADevice,
  payload,
});


export const resolutionKind = (
  payload: {
    pagination: number,
    resolutionKind: string,
    isTouch: boolean,
  }
) => ({
  type: actionTypes.resolutionKind,
  payload,
});
