/**
 * Created by kenji on 6/9/18.
 */
import {
    fetchStockItemFromBarcodeBegin, fetchStockItemFromBarcodeSuccess, fetchStockItemFromBarcodeError
} from './types';


export function fetchStockItemByBarcode(barcode) {
    return dispatch => {
        dispatch(fetchStockItemFromBarcodeBegin());
        return fetch(`http://192.168.0.29:49691/stock/barcode/${barcode}`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                console.log('actions',json);
                dispatch(fetchStockItemFromBarcodeSuccess(json));
                return json;
            })
            .catch(error => dispatch(fetchStockItemFromBarcodeError(error)));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response;
}