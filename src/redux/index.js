/**
 * Created by kenji on 7/9/18.
 */
import StockListReducer from './stock_list/reducer';
import StockItemReducer from './stock/reducer';
import StockItemFromBarcodeReducer from './stock_from_barcode/reducer'

import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const reducerMap = combineReducers({
    stockList: StockListReducer,
    stockItem: StockItemReducer,
    stockItemFromBarcode: StockItemFromBarcodeReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducerMap);

/*export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}*/

//createStore(reducers, applyMiddleware(thunk));

export default reducerMap;