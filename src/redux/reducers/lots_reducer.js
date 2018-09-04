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
 * /stock/barcode/${barcode}
 * Gets a stock item from the supplied barcode
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
    result: {},
    barcodeList: [],
    stockFromBarcode: {},
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_STOCK_LIST://
            //console.log(state,action);
            return { ...state, loadingStockList: true };
        case GET_STOCK_LIST_SUCCESS:
            //console.log(state,action);
            return { ...state, loadingStockList: false, stockList: action.payload.data.data };
        case GET_STOCK_LIST_FAIL:
            //console.log(state,action);
            return { ...state, loadingStockList: false, stockListError: 'Failed to retrieve stock list' };
        case GET_STOCK://
            return { ...state, loadingStock: true };
        case GET_STOCK_SUCCESS:
            return { ...state, loadingStock: false, stock: action.payload.data.data[0] };
        case GET_STOCK_FAIL:
            return { ...state, loadingStock: false, stockError: 'Failed to retrieve stock list' };
        case PUT_STOCK:
            return { ...state, loadingStockUpdate: true };
        case PUT_STOCK_SUCCESS:
            return { ...state, loadingStockUpdate: false, result: action.payload.data.data[0] };
        case PUT_STOCK_FAIL:
            return { ...state, loadingStockUpdate: false, stockUpdateError: 'Failed to update stock list' };
        case GET_BARCODES:
            return { ...state, loadingBarcodes: true };
        case GET_BARCODES_SUCCESS:
            return { ...state, loadingBarcodes: false, barcodeList: action.payload.data.data };
        case GET_BARCODES_FAIL:
            return { ...state, loadingBarcodes:false, barcodesError: 'Failed to load barcodes' };
        case GET_STOCK_FROM_BARCODE:
            return { ...state, loadingStockFromBarcode: true };
        case GET_STOCK_FROM_BARCODE_SUCCESS:
            return { ...state, loadingStockFromBarcode: false, stockFromBarcode: action.payload.data.data[0] };
        case GET_STOCK_FROM_BARCODE_FAIL:
            return { ...state, loadingStockFromBarcode: false, stockFromBarcodeError: 'Failed to get stock item from barcode' };
        default:
            return state;
    }
}

//https://github.com/svrcekmichal/redux-axios-middleware/issues/6

export function listStockArray(searchQuery, pageSize = 50, pageNumber = 1) {
    return {
        type: GET_STOCK_LIST,
        payload: {
            request: {
                url: `/stock?search=${searchQuery}&pageSize=${pageSize}&pageNumber=${pageNumber}`
            }
        }
    };
}

export function listStockItem(stockID) {
    return {
        type: GET_STOCK,
        payload: {
            request: {
                url: `/stock/${stockID}`
            }
        }
    };
}

export function updateStock(stockID, data) {
    return {
        type: PUT_STOCK,
        payload: {
            request: {
                url: `/stock/${stockID}`,
                method: `PUT`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data,
            }
        }
    };
}

export function listStockBarcodes(stockID) {
    return {
        type: GET_BARCODES,
        payload: {
            request: {
                url: `/stock/${stockID}/barcodes`
            }
        }
    };
}

export function listStockFromBarcode(barcode) {
    return {
        type: GET_STOCK_FROM_BARCODE,
        payload: {
            request: {
                url: `/stock/barcode/${barcode}`
            }
        }
    };
}
