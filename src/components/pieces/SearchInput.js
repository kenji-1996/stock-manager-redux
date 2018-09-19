import React, { Component } from 'react';
//import { View, StyleSheet, TextInput, Picker } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchStocklist, setSearchText } from '../../redux/stock_list/actions';
import { bindActionCreators } from 'redux'

class SearchInput extends Component  {
    render() {
        return (
            <SearchBar
                showLoading={this.props.loading}
                value={this.props.searchString}
                platform="ios"
                cancelButtonTitle="Cancel"
                placeholder='Stock name'
                autoCorrect={false}
                onChangeText={(e) => {
                    this.props.setSearchText(e);
                    setTimeout(() => {
                        this.props.fetchStocklist(this.props.searchString);
                    }, 250);
                }}
                onClear={(e) => {
                    this.props.setSearchText('');
                }}
            />
        );
    }
};

const mapStateToProps = state => ({
    list: state.stockList.item,
    loading: state.stockList.loading,
    error: state.stockList.error,
    searchString: state.stockList.searchString,
});

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchStocklist: bindActionCreators(fetchStocklist, dispatch),
        setSearchText: bindActionCreators(setSearchText, dispatch),
    })
}

export default ConnectedSearch = connect(mapStateToProps,mapDispatchToProps)(SearchInput);