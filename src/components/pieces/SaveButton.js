import React, { Component } from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchStockItem, updateStockItem } from '../../redux/stock/actions';
import { bindActionCreators } from 'redux'

class SaveButton extends Component {
    render() {
        return (
            <View>
                {this.props.canSave?
                    <TouchableOpacity 
                        onPress={() => {this.props.updateStockItem(this.props.item.StockID,this.props.updateData).then(res => {alert('Saved!');})}}
                        style={{marginRight: 9, marginLeft: 22, marginVertical: 8}}
                    >
                        <Icon
                            name='ios-save'
                            type='ionicon'
                            color='#000000'
                        />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            
        )
    }
}


const mapStateToProps = state => ({
    item: state.stockItem.item,
    itemLoading: state.stockItem.loading,
    itemError: state.stockItem.error,
    canSave: state.stockItem.canSave,
    updateData: state.stockItem.updateData,
});

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchStockItem: bindActionCreators(fetchStockItem, dispatch),
        updateStockItem: bindActionCreators(updateStockItem, dispatch),
    })
}
      
export default ConnectedButton = connect(mapStateToProps,mapDispatchToProps)(SaveButton);