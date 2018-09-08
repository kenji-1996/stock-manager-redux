/**
 * Created by kenji on 6/9/18.
 */
import { FETCH_STOCKITEM_BEGIN, FETCH_STOCKITEM_SUCCESS, FETCH_STOCKITEM_FAIL} from './types'

const initialState = {
    item: [],
    loading: false,
    error: null
};

export default function stockItemReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_STOCKITEM_BEGIN:
            return { ...state, loading: true, error: null };
        case FETCH_STOCKITEM_SUCCESS:
            return { ...state, loading: false, item: action.payload.data[0] };
        case FETCH_STOCKITEM_FAIL:
            return { ...state, loading: false, error: action.payload.error, item: null };
        default:
            return state;
    }
}