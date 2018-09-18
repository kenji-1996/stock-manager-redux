
import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchStockItem, updateStockItem } from '../../redux/stock/actions';
import { bindActionCreators } from 'redux'

class SaveButton extends Component {
    render() {
        return (
            <View>
                <Button
                    icon={
                        <Icon
                        name='save'
                        size={30}
                        
                        color='white'
                        />
                    }
                    onPress={() => {
                        console.log(this.props.item);
                        this.props.updateStockItem(this.props.item.StockID,this.props.updateData).then(res => {
                            console.log(res);
                            alert('saved?');
                        })
                    }}
                    containerStyle={{padding: 5}}
                    disabled={!this.props.canSave}
                    buttonStyle={{
                        backgroundColor: "rgba(124, 252 ,0, 1)",
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                      }}
                    title=''
                />
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