/**
 * Created by kenji on 6/9/18.
 */
import { fetchStocklistBegin, fetchStocklistSuccess, fetchStocklistError } from './types';

export function fetchStocklist(searchParam) {
    return dispatch => {
        dispatch(fetchStocklistBegin());
        return fetch(`http://192.168.0.29:49691/stock?search=${searchParam}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchStocklistSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchStocklistError(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}