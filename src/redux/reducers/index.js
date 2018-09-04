/**
 * Created by kenji on 3/9/18.
 */
import { combineReducers } from 'redux';
import GitReducer from './git_reducer';
import LOTSReducer from './lots_reducer';

export default combineReducers({ GitReducer, LOTSReducer })
