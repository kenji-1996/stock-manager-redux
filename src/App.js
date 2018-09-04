/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//https://medium.com/@relferreira/react-native-redux-react-navigation-ecec4014d648
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'

import reducers from './redux/reducers/lots_reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import HomeTab from './components/HomeTab';
import SearchTab from './components/SearchTab';
import StockDetails from './components/StockDetails';
import ScannerTab from './components/ScannerTab';
import StockModal from './components/modals/StockModal'

const client = axios.create({
    baseURL: 'http://192.168.0.29:49691',
    responseType: 'json'
});

//https://blog.bam.tech/developper-news/4-ways-to-dispatch-actions-with-redux

const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

const Tabs = createBottomTabNavigator(
    {
        Home: {
            screen: HomeTab
        },
        Search: {
            screen: SearchTab
        },
        Scanner: {
            screen: ScannerTab
        },
        Settings: {
            screen: SearchTab
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName,iconColor;

                if (routeName === 'Home') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-information-circle`;
                } else if (routeName === 'Settings') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-options`;
                }else if (routeName === 'Scanner') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-barcode`;
                }else if (routeName === 'Search') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-search`;
                }

                return <Icon type='ionicon' name={iconName} size={25} color={iconColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

const Stack = createStackNavigator(
    {
        Home: {
            screen: Tabs
        },
        StockDetail: {
            screen: StockDetails
        },
        StockModal: {
            screen: StockModal
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <Stack/>
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