/**
 * Created by kenji on 6/9/18.
 */
import { combineReducers } from 'redux'
import { FETCH_STOCKLIST_BEGIN, FETCH_STOCKLIST_SUCCESS, FETCH_STOCKLIST_FAIL } from './types'

const initialState = {
    list: [],
    loading: false,
    error: null
};

export default function stockListReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STOCKLIST_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STOCKLIST_SUCCESS:
            console.log(action.payload.data);
            return { ...state, loading: false, list: action.payload.data };
        case FETCH_STOCKLIST_FAIL:
            return { ...state, loading: false, error: action.payload.error, list: [] };
        default:
            return state;
    }
}