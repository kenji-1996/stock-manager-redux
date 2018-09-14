/**
 * Created by kenji on 11/9/18.
 */
import React from 'react';
import {View, Dimensions, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, Card, Text, Icon, Input, Divider, CheckBox } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import GlobalStyle from '../styles/GlobalStyle';
import Stock from '../objects/StockItem';
import { fetchStockItem } from '../redux/stock/actions';
import { connect } from 'react-redux';

const GeneralTab = () => {
    console.log(this.props);
    return (
        <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">

        </ScrollView>
    );
};

const PricingTab = () => {
    return (
        <View style={[GlobalStyle.container, { backgroundColor: '#232323' }]} />
    );
};

class StockItemScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            newBarcode: '',
            barcodes: [{value: '321',}, {value: '123',}, {value: '9867',}],
            subDepartments: [{value: 'Banana',}, {value: 'Mango',}, {value: 'Pear',}],
            newLocation: '',
            locations: [{value: 'Area 1',}, {value: 'Area 2',}, {value: 'Area 3',}],
            GSTRate: [{value: '0%',}, {value: '10%',}, {value: '20%',}],
            GSTType: [{value: 'Free to End Customer',}, {value: 'Cost to End Customer',}, {value: 'Other',}],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.item || {});
        this.state.subDepartments.unshift({value: this.state.item.ProductGroupName || 'Product Group'});
        this.forceUpdate();
    }

    tabState = {
        index: 0,
        routes: [
            {
                key: 'general',
                title: 'General',
                navigation: this.state,
            },
            { key: 'pricing', title: 'Pricing' },
            { key: 'stock', title: 'Stock' },
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.tabState}
                renderScene={SceneMap({
                    general: GeneralTab,
                    pricing: PricingTab,
                    stock: PricingTab,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width, height: 0 }}
            />
        );
    }
}

const mapStateToProps = state => ({
    item: state.stockItem.item,
    itemLoading: state.stockItem.loading,
    itemError: state.stockItem.error,
});

const mapDispatchToProps = {
    fetchStockItem
};

export default StockItem = connect(mapStateToProps, mapDispatchToProps)(StockItemScreen);
//export default StockTabScreen;