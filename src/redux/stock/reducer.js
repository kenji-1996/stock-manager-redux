/**
 * Created by kenji on 6/9/18.
 */
import { combineReducers } from 'redux'
import { FETCH_STOCKITEM_BEGIN, FETCH_STOCKITEM_SUCCESS, FETCH_STOCKITEM_FAIL} from './types'

const initialState = {
    stockList: [],
    loading: false,
    error: null
};

export default function stockItemReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STOCKITEM_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STOCKITEM_SUCCESS:
            return { ...state, loading: false, stockList: action.payload.data };
        case FETCH_STOCKITEM_FAIL:
            return { ...state, loading: false, error: action.payload.error, stockList: [] };
        default:
            return state;
    }
}