/**
 * Created by kenji on 3/9/18.
 */
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Icon, Input, SearchBar, CheckBox, ListItem } from 'react-native-elements';
import GlobalStyle from '../styles/GlobalStyle'
import Format from '../functions/Format'
import { connect } from 'react-redux';

import { fetchStocklist } from '../redux/stock_list/actions';

class StockList extends Component {

    /**
     * Todo: On search, hide search dialog (button on top right corner to show and hide)
     */

    static navigationOptions = {
        title: 'Search',
    };

    constructor(props) {
        super(props);
        this.state = {
            searchString: 'Panadol',
            pageSize: 50,
            pageNumber: 1,
            hideSearchInput: false,
        };
    }

    componentDidMount() {
        //console.log('dispatch', this.props);
        this.props.fetchStocklist(this.state.searchString);
    }

    _renderItem = ({ item }) => (
        <ListItem
            style={styles.listItem}
            title={item.TradeName}
            subtitle={
                <View>
                    <Text>Retail: {Format.formatPrice(item.Retail)}, Real: {Format.formatPrice(item.RealCost)}</Text>
                </View>
            }
            onPress={() => { this.props.navigation.navigate(`StockDetail`, { StockID: item.StockID }) }}
            badge={{ value: (item.SOH), textStyle: {  }, containerStyle: { marginTop: -20 } }}
        />
    );

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                this.props.navigation.navigate(`StockDetail`, { StockID: item.StockID })
            }}
        >
            <Text>{item.TradeName}</Text>
        </TouchableOpacity>
    );

    render() {
        const { list, loading, error } = this.props;
        return (
        <View style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
            <View style={[GlobalStyle.headerContainer, { backgroundColor: '#e16969' }]}>
                <Input
                    inputStyle={GlobalStyle.heading}
                    placeholder='Search String'
                    value={this.state.searchString}
                    //onCancel={this._cancelSearch}
                    returnKeyType="search"
                    onSubmitEditing={(e) => {this.setState({ searchString: e.nativeEvent.text});}}
                    onChange={((e) => this.setState({ searchString: e.nativeEvent.text}))}
                    rightIcon={
                        <Icon
                            color="white"
                            name="search"
                            onPress={() => {
                                this.props.listStockArray(this.state.searchString, this.state.pageSize, this.state.pageNumber)
                            }}
                        />
                    }
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Input
                        value={this.state.pageNumber.toString()}
                        keyboardType="numeric"
                        returnKeyType="done"
                        containerStyle={{ width: '40%' }}
                        label="PAGE NUMBER"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, .6)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 2, height: 25, color: 'white'}}
                        onSubmitEditing={(event) => {this.setState({pageNumber: event.nativeEvent.text})}}
                        onChange={((event) => this.setState({pageNumber: event.nativeEvent.text}))}
                    />
                    <Input
                        value={this.state.pageSize.toString()}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '40%' }}
                        label="PAGE SIZE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, .6)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 25, color: 'white'}}
                        onSubmitEditing={(event) => {this.setState({pageSize: event.nativeEvent.text})}}
                        onChange={((event) => this.setState({pageSize: event.nativeEvent.text}))}
                    />
                </View>
            </View>
            {loading?
                <ActivityIndicator size="large" color="#e16969"/>
                :
                error === null?
                    <View>
                        <FlatList
                            styles={styles.container}
                            data={list}
                            renderItem={this._renderItem}
                            keyExtractor={(item, StockID) => StockID.toString()}
                        />
                        <Text></Text>
                    </View>
                    :
                    <Text>Failed to load data.. {error}</Text>
            }
        </View>


        );
    }
}
/*

 */

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
});

const mapDispatchToProps = {
    fetchStocklist
};


export default connect(mapStateToProps, mapDispatchToProps)(StockList);