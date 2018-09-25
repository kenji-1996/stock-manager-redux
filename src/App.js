/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//https://medium.com/@relferreira/react-native-redux-react-navigation-ecec4014d648
import React, {Component} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'

import { persistor, store } from './redux/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import HomeTab from './components/HomeTab';
import SearchTab from './components/SearchTab';
import ScannerTab from './components/ScannerTab';
import SettingsTab from './components/SettingsTab';

import StockScreen from './components/StockScreen';

import StockModal from './components/modals/StockModal';
import ScannerSettingsModal from './components/modals/ScannerSettingsModal';

import ConnectedSaveButton from './components/pieces/SaveButton';
import ConnectedTitle from './components/pieces/ItemTitle';

const Tabs = createBottomTabNavigator(
    {
        Home: {
            screen: HomeTab,
            title: '',
        },
        Search: {
            screen: SearchTab
        },
        Scanner: {
            screen: ScannerTab
        },
        Settings: {
            screen: SettingsTab
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
            activeTintColor: '#2196f3',
            inactiveTintColor: 'gray',
            showLabel: false,
        },
    }
);

const Stack = createStackNavigator(
    {
        MainTabs: {
            screen: Tabs,
            navigationOptions: {
                header: null
            },
        },
        StockModal: {
            screen: StockModal,
            navigationOptions: {
                header: null,
            },
        },
        ScannerSettingsModal: {
            screen: ScannerSettingsModal,
            navigationOptions: {
                header: null,
            },
        },
        StockScreen: {
            screen: StockScreen,
            navigationOptions: {
                headerRight: (<ConnectedSaveButton/>),
                headerTitle: (<ConnectedTitle/>),
            },
        },
    },
    {}
);




export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                    <View style={styles.container}>
                        <Stack/>
                    </View>
                </PersistGate>
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