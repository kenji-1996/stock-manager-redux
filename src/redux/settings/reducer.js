/**
 * Created by kenji on 6/9/18.
 */
import {
    ADD_CONNECTION, DEL_CONNECTION, SET_CONNECTION,
    SET_LICENSE, SET_STAFF_ID, SET_TORCH, SET_LAST_ITEM, PUSH_RECENT_ITEM
} from './types'

const initialState = {
    //License settings
    licenseError: null,
    licenseLoading: false,
    license: "techgorilla-123abc",

    //Server connection settings
    connectionError: null,
    connectionLoading: false,
    connections: [{value: "192.168.0.29:49691"}],
    selectedConnection: 0,
    
    //Staff settings
    staffError: null,
    staffLoading: false,
    staffID: '',

    //Camera settings
    torch: true,

    //History settings
    LatestItem: {},
    LastTenItems: [],
    LastUpdatedItem: {},
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
        case SET_LAST_ITEM:
            return { ...state, LatestItem: action.payload };
        case PUSH_RECENT_ITEM:
            return { ...state, LastTenItems: action.payload }
        default:
            return state;
    }
}