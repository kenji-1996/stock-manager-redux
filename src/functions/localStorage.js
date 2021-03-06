/**
 * Created by kenji on 6/9/18.
 */
import { AsyncStorage } from 'react-native';

export const loadState = async() => {
    try {
        const serializedState = await AsyncStorage.getItem('state');
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined
    }
};

export const saveState = async(state ) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('state', serializedState);
    } catch (error) {
        // Error saving data
    }
};