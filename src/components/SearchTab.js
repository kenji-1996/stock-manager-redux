/**
 * Created by kenji on 3/9/18.
 */
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import GlobalStyle from '../styles/GlobalStyle';
import Format from '../functions/Format';
import { connect } from 'react-redux';
import { fetchStocklist } from '../redux/stock_list/actions';
import { fetchStockItem } from '../redux/stock/actions';
import { updateLastItem } from '../redux/settings/actions';
import ConnectedSearch from './pieces/SearchInput';
import Stock from '../objects/StockItem';


class SearchStock extends Component {

    static navigationOptions = {
        headerTitle: <ConnectedSearch />,
        headerStyle: { height: 70 },
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: 'Panadol',
            pageSize: 50,
            pageNumber: 1,
            hideSearchInput: false,
            refreshing: false,
        };
    }

    componentDidMount() {
        this._onRefresh();
    }

    _onRefresh = () => {
        this.props.screenProps.fetchStocklist(this.props.screenProps.searchString);
    }

    renderItem = ({ item }) => {
        item = new Stock(item);
        return (
            <ListItem style={styles.listItem} title={item.TradeName}
            subtitle={
                <View>
                    <Text>Retail: {Format.formatPrice(item.Retail)}, Real: {Format.formatPrice(item.RealCost)}</Text>
                    <Text>SOH: {item.SOH}</Text>
                </View>
            }
            onPress={() => {
                this.props.screenProps.fetchStockItem(item.StockID).then(() => {
                    this.props.screenProps.updateLastItem(item);
                    if (!this.props.screenProps.itemLoading) {
                        if (this.props.screenProps.itemError === null) {
                            this.props.navigation.navigate(`StockScreen`, { item: this.props.screenProps.item, parent: 'Search' })
                        }
                    }
                });
    
            }}
            onLongPress={() => {
                this.props.screenProps.fetchStockItem(item.StockID).then(() => {
                    this.props.screenProps.updateLastItem(item);
                    if (!this.props.screenProps.itemLoading) {
                        if (this.props.screenProps.itemError === null) {
                            this.props.navigation.navigate(`StockModal`, { item: this.props.screenProps.item, parent: 'Search' })
                        }
                    }
                });
            }}
            badge={{ value: (item.SOH.toString()), textStyle: {}, containerStyle: { marginTop: -20 } }}
        />
        );
    };

    render() {
        const { list, loading, error } = this.props.screenProps;
        return (
            <View style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                <View style={{marginTop: 0}}>
                    <FlatList
                        styles={{...styles.container, marginBottom: 90}}
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={(item, StockID) => StockID.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={this._onRefresh}
                                size="large"
                                tintColor="#e16969"
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    listItem: {
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        backgroundColor: '#efefef',
    },
    sectionTitle: {
        color: 'black',
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        opacity: 0.8,
    },
});

const mapStateToProps = state => ({
    list: state.stockList.list,
    loading: state.stockList.loading,
    error: state.stockList.error,
    item: state.stockItem.item,
    itemLoading: state.stockItem.loading,
    itemError: state.stockItem.error,
    searchString: state.stockList.searchString
});

const mapDispatchToProps = {
    fetchStocklist, fetchStockItem, updateLastItem
};

const mergeProps = (state, dispatch, ownProps) => {
    return ({
        ...ownProps,
        screenProps: {
            ...ownProps.screenProps,
            ...state,
            ...dispatch,
        }
    })
}

let SearchStack = createStackNavigator({
    SearchStack: {
      screen: SearchStock
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchStack);