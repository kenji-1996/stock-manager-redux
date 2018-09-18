import React, { Component } from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { connect } from 'react-redux';

class TitleView extends Component {

    render() {
        let title = '';
        if(this.props.item === null || this.props.item === undefined, this.props.item === {}) {
            title = '';
        }else{
            title = this.props.item.TradeName;
        }
        return (<Text style={{textAlign: 'center'}}>{title}</Text>)
    }
}

const mapStateToProps = state => ({
    item: state.stockItem.item,
});
      
export default ConnectedTitle = connect(mapStateToProps)(TitleView);

/*
import { connect } from 'react-redux';

const Title = ({}) => {
    if(this.props.item === null || this.props.item === undefined, this.props.item === {}) {
        return '';
    }else{
        return this.props.item.TradeName;
    }
}

const mapStateToProps = state => ({
    item: state.stockItem.item,
});

export default ConnectedTitle = connect(mapStateToProps, {})(Title);

*/