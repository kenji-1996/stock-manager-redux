/**
 * Created by kenji on 6/9/18.
 */
import { fetchStocklistBegin, fetchStocklistSuccess, fetchStocklistError, setStocklistSearch } from './types';
import { store } from '../index';

export function fetchStocklist(searchParam, pageNumber = 1, pageSize = 50) {
    return dispatch => {
        dispatch(fetchStocklistBegin());
        return fetch(`http://${store.getState().settings.connections[store.getState().settings.selectedConnection].value}/stock?search=${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchStocklistSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchStocklistError(error)));
    };
}

export function setSearchText(searchParam) {
    return dispatch => {
        dispatch(setStocklistSearch(searchParam));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}