/**
 * Created by kenji on 6/9/18.
 */
import {
    addConnection, delConnection, setConnection, 
    setLicense, setStaffID, setTorch,
    setLastItem, pushLatestItem
} from './types';
import { store } from '../index';


export function newConnection(connection) {
    return dispatch => {
        dispatch(addConnection({value: connection}));
    }
}

export function removeConnection(connection) {
    return dispatch => {
        if(store.getState().settings.connections.length <= 1) {
            alert('CANNOT DELETE LAST VALUE');
        }else{
            let newConnections = store.getState().settings.connections;
            newConnections.remByVal(connection);
            dispatch(delConnection(newConnections));
        }
    }
}

export function updateConnection(connectionID) {
    return dispatch => {
        dispatch(setConnection(connectionID));
    }
}

export function updateLicense(license) {
    return dispatch => {
        dispatch(setLicense(license));
    }
}

export function updateStaffID(id) {
    return dispatch => {
        dispatch(setStaffID(id));
    }
}

export function updateLastItem(item) {
    return dispatch => {
        dispatch(setLastItem(item));
        var recentList = store.getState().settings.LastTenItems;
        recentList.unshift(item);
        var test = recentList.splice(0,5);
        dispatch(pushLatestItem(test));
    }
}

export function updateTorch(bool) {
    return dispatch => {
        dispatch(setTorch(bool));
    }
}

Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].value === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}
