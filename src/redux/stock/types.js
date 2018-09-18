/**
 * Created by kenji on 6/9/18.
 */
export const FETCH_STOCKITEM_BEGIN = 'STOCKITEM/FETCH_BEGIN';
export const FETCH_STOCKITEM_SUCCESS = 'STOCKITEM/FETCH_SUCCESS';
export const FETCH_STOCKITEM_FAIL = 'STOCKITEM/FETCH_FAIL';
export const fetchStockItemBegin = () => ({type: FETCH_STOCKITEM_BEGIN});
export const fetchStockItemSuccess = item => ({type: FETCH_STOCKITEM_SUCCESS, payload: item});
export const fetchStockItemError = error => ({type: FETCH_STOCKITEM_FAIL, payload: error});

export const PUT_STOCKITEM_BEGIN = 'STOCKITEM/PUT_BEGIN';
export const PUT_STOCKITEM_SUCCESS = 'STOCKITEM/PUT_SUCCESS';
export const PUT_STOCKITEM_FAIL = 'STOCKITEM/PUT_FAIL';
export const putStockItemBegin = () => ({type: PUT_STOCKITEM_BEGIN});
export const putStockItemSuccess = res => ({type: PUT_STOCKITEM_SUCCESS, payload: res});
export const putStockItemError = error => ({type: PUT_STOCKITEM_FAIL, payload: error});

export const TOGGLE_UPDATE_STOCKITEM = 'STOCKITEM/TOGGLE_UPDATE';
export const toggleCanSave = () => ({type: TOGGLE_UPDATE_STOCKITEM});

export const PUSH_UPDATE_OBJECT = 'STOCKITEM/PUSH_UPDATE_OBJECT';
export const pushUpdateObject = data => ({type: PUSH_UPDATE_OBJECT, payload: data});