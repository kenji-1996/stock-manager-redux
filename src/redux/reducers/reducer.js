/**
 * Created by kenji on 3/9/18.
 */
/**
 * /stock?search=String
 * Searches Stock table, checking for given search value
 * and returns an array that contains that value
 * @action GET
 * @returns [array]
 * @type {string}
 */
export const GET_STOCK_LIST = 'ReduxStarter/stock_list/LOAD';
export const GET_STOCK_LIST_SUCCESS = 'ReduxStarter/stock_list/LOAD_SUCCESS';
export const GET_STOCK_LIST_FAIL = 'ReduxStarter/stock_list/LOAD_FAILURE';

/**
 * /stock/${id}
 * Gets an ID passed to it and returns an object if it exists
 * @action GET
 * @returns {object}
 * @type {string}
 */
export const GET_STOCK = 'ReduxStarter/stock/LOAD';
export const GET_STOCK_SUCCESS = 'ReduxStarter/stock/LOAD_SUCCESS';
export const GET_STOCK_FAIL = 'ReduxStarter/stock/LOAD_FAIL';

/**
 * /stock/${id}
 * Updates Stock by passing an object with new variables to update with
 * @action PUT
 * @returns {null}
 * @type {string}
 */
export const PUT_STOCK = 'ReduxStarter/stock/CHANGE';
export const PUT_STOCK_SUCCESS = 'ReduxStarter/stock/CHANGE_SUCCESS';
export const PUT_STOCK_FAIL = 'ReduxStarter/stock/CHANGE_FAIL';

/**
 * /stock/${id}/barcodes
 * Gets the barcodes of an a stock item if the ID is valid
 * @action: GET
 * @returns [array]
 * @type {string}
 */
export const GET_BARCODES = 'ReduxStarter/stock/barcodes/LOAD';
export const GET_BARCODES_SUCCESS = 'ReduxStarter/stock/barcodes/LOAD_SUCCESS';
export const GET_BARCODES_FAIL = 'ReduxStarter/stock/barcodes/LOAD_FAIL';

/**
 * /stock/${id}/barcodes
 * Gets the barcodes of an a stock item if the ID is valid
 * @action: GET
 * @returns [array]
 * @type {string}
 */
export const GET_STOCK_FROM_BARCODE = 'ReduxStarter/stock/barcode/LOAD';
export const GET_STOCK_FROM_BARCODE_SUCCESS = 'ReduxStarter/stock/barcode/LOAD_SUCCESS';
export const GET_STOCK_FROM_BARCODE_FAIL = 'ReduxStarter/stock/barcode/LOAD_FAIL';

const initialState = {
    stockList: [],
    stock: {},
    barcodes: [],
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_STOCK_LIST:
            return { ...state, loadingStockList: true };
        case GET_STOCK_LIST_SUCCESS:
            return { ...state, loadingStockList: false, stockList: action.payload.data };
        case GET_STOCK_LIST_FAIL:
            return { ...state, loadingStockList: false, stockListError: 'Failed to retrieve stock list' };
        case GET_STOCK:
            return { ...state, loadingStock: true };
        case GET_STOCK_SUCCESS:
            return { ...state, loadingStock: false, stock: action.payload.data };
        case GET_STOCK_FAIL:
            return { ...state, loadingStock: false, stockError: 'Failed to retrieve stock list' };
        default:
            return state;
    }
};


