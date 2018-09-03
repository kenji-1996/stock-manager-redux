/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import reducer from './redux/reducers/git_reducer';
import RepoList from './components/RepoList';
import RepoDetail from './components/RepoDetail';
import Profile from './components/Profile';
const client = axios.create({
    baseURL: 'https://api.github.com',
    responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

const Tabs = createBottomTabNavigator({
    RepoList: {
        screen: RepoList
    },
    Profile: {
        screen: Profile
    }
});

const Stack = createStackNavigator({
    Home: {
        screen: Tabs
    },
    Detail: {
        screen: RepoDetail
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Stack />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});