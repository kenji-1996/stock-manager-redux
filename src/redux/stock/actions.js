/**
 * Created by kenji on 6/9/18.
 */

import { STOCK } from './actionTypes';

export function listStockItem(stockID) {
    return {
        type: STOCK.REQUEST_BY_ID,
        payload: {
            request: {
                url: `/stock/${stockID}`
            }
        }
    };
}

export function updateStock(stockID, data) {
    return {
        type: PUT_STOCK,
        payload: {
            request: {
                url: `/stock/${stockID}`,
                method: `PUT`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: data,
            }
        }
    };
}

export function listStockBarcodes(stockID) {
    return {
        type: GET_BARCODES,
        payload: {
            request: {
                url: `/stock/${stockID}/barcodes`
            }
        }
    };
}

export function listStockFromBarcode(barcode) {
    return {
        type: GET_STOCK_FROM_BARCODE,
        payload: {
            request: {
                url: `/stock/barcode/${barcode}`
            }
        }
    };
}