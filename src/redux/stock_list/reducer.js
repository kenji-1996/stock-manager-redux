/**
 * Created by kenji on 6/9/18.
 */
import { FETCH_STOCKLIST_BEGIN, FETCH_STOCKLIST_SUCCESS, FETCH_STOCKLIST_FAIL, SET_STOCKLIST_SEARCH } from './types'

const initialState = {
    list: [],
    loading: false,
    error: null,
    searchString: 'Panadol',
};

export default function stockListReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STOCKLIST_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STOCKLIST_SUCCESS:
            return { ...state, loading: false, list: action.payload.data };
        case FETCH_STOCKLIST_FAIL:
            return { ...state, loading: false, error: action.payload.error, list: [] };
        case SET_STOCKLIST_SEARCH:
            return { ...state, searchString: action.payload };
        default:
            return state;
    }
}