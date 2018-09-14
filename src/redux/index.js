/**
 * Created by kenji on 7/9/18.
 */
import StockListReducer from './stock_list/reducer';
import StockItemReducer from './stock/reducer';
import StockItemFromBarcodeReducer from './stock_from_barcode/reducer'
import { combineReducers } from 'redux';

const stockMap = combineReducers({
    stockList: StockListReducer,
    stockItem: StockItemReducer,
    stockItemFromBarcode: StockItemFromBarcodeReducer,
});

export default stockMap;