/**
 * Created by kenji on 6/9/18.
 */
export const FETCH_STOCKITEM_FROMBARCODE_BEGIN = 'STOCKITEM_BARCODE/FETCH_BEGIN';
export const FETCH_STOCKITEM_FROMBARCODE_SUCCESS = 'STOCKITEM_BARCODE/FETCH_SUCCESS';
export const FETCH_STOCKITEM_FROMBARCODE_FAIL = 'STOCKITEM_BARCODE/FETCH_FAIL';

export const fetchStockItemFromBarcodeBegin = () => ({type: FETCH_STOCKITEM_FROMBARCODE_BEGIN});
export const fetchStockItemFromBarcodeSuccess = item => ({type: FETCH_STOCKITEM_FROMBARCODE_SUCCESS, payload: item});
export const fetchStockItemFromBarcodeError = error => ({type: FETCH_STOCKITEM_FROMBARCODE_FAIL, payload: error});