/**
 * Created by kenji on 6/9/18.
 */
import { loop } from 'redux-loop';
import { handleActions } from 'redux-actions';
import { STOCK } from './types';
import { stockRequest } from './cmds';

const initialState = {
    stock: null,
    error: null,
    loading: false
};

export default handleActions({
    [STOCK.REQUEST]: state => loop(
        { stock: null, loading: true, error: null },
        stockRequest
    ),
    [STOCK.RESPONSE]: {
        next: (state, {payload}) =>
            ({loading: false, stock: payload, error: null}),
        throw: (state, {payload}) =>
            ({loading: false, stock: null, error: payload })
    },
},initialState)