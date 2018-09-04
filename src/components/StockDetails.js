/**
 * Created by kenji on 3/9/18.
 */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { listStockItem } from '../redux/reducers/lots_reducer';

class StockDetail extends Component {

    static navigationOptions = {
        title: 'Stock Detail',
    };

    componentDidMount() {
        const { StockID } = this.props.navigation.state.params;
        this.props.listStockItem(StockID).then(res => {
            console.log(res.payload.data.data);
        });
    }

    render() {
        const {stock, loadingStock} = this.props;

        if (loadingStock) return <Text>Loading...</Text>;

        const {
            StockID,
            TradeName,
            SOH,
            Reorder,
            ProductGroupName
        } = stock;
        return (

            <View>
                <Button
                    onPress={() => alert(this.props.stock)}
                    title="Info"
                    color="#000"
                />
                <Text>{StockID}</Text>
                <Text>{TradeName}</Text>
                <Text>{SOH}</Text>
                <Text>{Reorder}</Text>
                <Text>{ProductGroupName}</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ stock, loadingStock }) => ({
    stock, loadingStock
});

const mapDispatchToProps = {
    listStockItem
};

export default connect(mapStateToProps, mapDispatchToProps)(StockDetail);