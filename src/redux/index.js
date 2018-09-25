/**
 * Created by kenji on 7/9/18.
 */
import StockListReducer from './stock_list/reducer';
import StockItemReducer from './stock/reducer';
import SettingsReducer from './settings/reducer';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducerMap = combineReducers({
    stockList: StockListReducer,
    stockItem: StockItemReducer,
    settings: SettingsReducer,
});

const persistConfig = {
    key: 'storage',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, reducerMap);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);