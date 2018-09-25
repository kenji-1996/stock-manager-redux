/**
 * Created by kenji on 6/9/18.
 */
import {
    ADD_CONNECTION, DEL_CONNECTION, SET_CONNECTION,
    SET_LICENSE, SET_STAFF_ID, SET_TORCH
} from './types'

const initialState = {
    licenseError: null,
    licenseLoading: false,
    license: "techgorilla-123abc",

    connectionError: null,
    connectionLoading: false,
    connections: [{value: "192.168.0.29:49691"}],
    selectedConnection: 0,
    
    staffError: null,
    staffLoading: false,
    staffID: '',

    torch: true,
};

export default function stockItemReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_CONNECTION:
            return { ...state, connections: [ ...state.connections, action.payload ] };
        case DEL_CONNECTION:
            return { ...state, connections: action.payload, selectedConnection: 0 };
        case SET_CONNECTION:
            return { ...state, selectedConnection: action.payload };
        case SET_LICENSE:
            return { ...state, license: action.payload };
        case SET_STAFF_ID:
            return { ...state, staffID: action.payload };
        case SET_TORCH:
            return { ...state, torch: action.payload };
        default:
            return state;
    }
}