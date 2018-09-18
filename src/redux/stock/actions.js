/**
 * Created by kenji on 6/9/18.
 */
import {
    fetchStockItemBegin, fetchStockItemSuccess, fetchStockItemError, 
    putStockItemBegin, putStockItemSuccess, putStockItemError,
    toggleCanSave, pushUpdateObject
} from './types';

export function fetchStockItem(id) {
    return dispatch => {
        dispatch(fetchStockItemBegin());
        return fetch(`http://192.168.0.29:49691/stock/id/${id}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchStockItemSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchStockItemError(error)));
    };
}

export function updateStockItem(id, newStock) {
    return dispatch => {
        dispatch(putStockItemBegin());
        return fetch(`http://192.168.0.29:49691/stock/id/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({'stock': newStock})
        })
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(putStockItemSuccess(json));
                return json;
            })
            .catch(error => dispatch(putStockItemError(error)));
    };
}

export function toggleSave() {
    return dispatch => {
        dispatch(toggleCanSave());
    }
}

export function newUpdateData(data) {
    return dispatch => {
        dispatch(pushUpdateObject(data));
    }
}


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}