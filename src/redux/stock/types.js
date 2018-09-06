/**
 * Created by kenji on 6/9/18.
 */
export const FETCH_STOCKITEM_BEGIN = 'STOCKITEM/FETCH_BEGIN';
export const FETCH_STOCKITEM_SUCCESS = 'STOCKITEM/FETCH_SUCCESS';
export const FETCH_STOCKITEM_FAIL = 'STOCKITEM/FETCH_FAIL';

export const fetchStockItemBegin = () => ({
    type: FETCH_STOCKITEM_BEGIN
});

export const fetchStockItemSuccess = products => ({
    type: FETCH_STOCKITEM_SUCCESS,
    payload: { products }
});

export const fetchStockItemError = error => ({
    type: FETCH_STOCKITEM_FAIL,
    payload: { error }
});