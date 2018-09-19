/**
 * Created by kenji on 6/9/18.
 */
export const FETCH_STOCKLIST_BEGIN = 'stocklist/FETCH_BEGIN';
export const FETCH_STOCKLIST_SUCCESS = 'stocklist/FETCH_SUCCESS';
export const FETCH_STOCKLIST_FAIL = 'stocklist/FETCH_FAIL';
export const SET_STOCKLIST_SEARCH = 'stocklist/SET_SEARCH';

export const fetchStocklistBegin = () => ({
    type: FETCH_STOCKLIST_BEGIN
});

export const fetchStocklistSuccess = list => ({
    type: FETCH_STOCKLIST_SUCCESS,
    payload: list
});

export const fetchStocklistError = error => ({
    type: FETCH_STOCKLIST_FAIL,
    payload: error
});

export const setStocklistSearch = search => ({
    type: SET_STOCKLIST_SEARCH,
    payload: search
});