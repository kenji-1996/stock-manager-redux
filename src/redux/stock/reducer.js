/**
 * Created by kenji on 6/9/18.
 */
import {
    FETCH_STOCKITEM_BEGIN, FETCH_STOCKITEM_SUCCESS, FETCH_STOCKITEM_FAIL,
    PUT_STOCKITEM_BEGIN, PUT_STOCKITEM_SUCCESS, PUT_STOCKITEM_FAIL,
    TOGGLE_UPDATE_STOCKITEM, PUSH_UPDATE_OBJECT
} from './types'

const initialState = {
    item: {},
    loading: false,
    error: null,

    updateData: {},
    res: {},
    updating: false,
    updatingError: null,

    canSave: false,
};

export default function stockItemReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STOCKITEM_BEGIN:
            return { ...state, loading: true, error: null, canSave: false, updateData: {} };
        case FETCH_STOCKITEM_SUCCESS:
            return { ...state, loading: false, item: action.payload.data[0] };
        case FETCH_STOCKITEM_FAIL:
            return { ...state, loading: false, error: action.payload.error, item: null };
        case PUT_STOCKITEM_BEGIN:
            return { ...state, updating: true, canSave: false, updatingError: null };
        case PUT_STOCKITEM_SUCCESS:
            return { ...state, updating: false, res: action.payload.data, updatingError: null, updateData: {} };
        case PUT_STOCKITEM_FAIL:
            return { ...state, updating: false, updatingError: action.payload.error, res: null };
        case TOGGLE_UPDATE_STOCKITEM:
            return { ...state, canSave: !state.canSave };
        case PUSH_UPDATE_OBJECT:
            return { ...state, updateData: { ...action.payload}, canSave: true }
        default:
            return state;
    }
}