/**
 * Created by kenji on 6/9/18.
 */
export const ADD_CONNECTION = 'settings/ADD_CONNECTION';
export const DEL_CONNECTION = 'settings/DEL_CONNECTION';
export const SET_CONNECTION = 'settings/SET_CONNECTION';
export const SET_LICENSE = 'settings/SET_LICENSE';
export const SET_STAFF_ID = 'settings/SET_STAFF_ID';
export const SET_TORCH = 'settings/SET_TORCH'

export const addConnection = connection => ({type: ADD_CONNECTION, payload: connection});
export const delConnection = connection => ({type: DEL_CONNECTION, payload: connection});
export const setConnection = connection => ({type: SET_CONNECTION, payload: connection});
export const setLicense = license => ({type: SET_LICENSE, payload: license});
export const setStaffID = id => ({type: SET_STAFF_ID, payload: id});
export const setTorch = torch => ({type: SET_TORCH, payload: torch});
