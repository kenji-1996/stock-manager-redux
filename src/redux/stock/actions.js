/**
 * Created by kenji on 6/9/18.
 */
import { fetchStockItemBegin, fetchStockItemSuccess, fetchStockItemError } from './types';

export function fetchStocklist() {
    return dispatch => {
        dispatch(fetchStockItemBegin());
        return fetch("http://192.168.0.29:49691/stock/id/123")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchStockItemSuccess(json.data));
                return json.products;
            })
            .catch(error => dispatch(fetchStockItemError(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}