/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import { Button, Card, Text, Icon, Divider, Input, CheckBox } from 'react-native-elements';
import GlobalStyle from '../../styles/GlobalStyle';
import Format from "../../functions/Format";
import StockObject from '../../objects/StockItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStockItem, toggleSave, newUpdateData, updateStockItem } from '../../redux/stock/actions'; 
import { CustomInput } from '../pieces/Input';

class StockModal extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item','No item found...');
        return {
            title: ''
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            oldItem: null,
            server: null,
            stock: {},
            canSave: false,
        };
    }

    componentWillMount() {
        this.state.item = new StockObject(this.props.navigation.getParam('item', null));
    }

    _stockByPackSize = () => {
        return this.state.item.SOH / this.state.item.PackSize;
    };

    render() {
        let item = this.state.item;
        return (
            <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-start'}}>
                <View style={{ height: "100%" ,width: '100%', backgroundColor:"#fff"}}>
                    <ScrollView style={{...GlobalStyle.container}} keyboardShouldPersistTaps="handled" ref="myScrollView">
                        <View style={GlobalStyle.containerWithVerticalMargin}>
                            <Text style={GlobalStyle.headerFont}><Text style={{fontSize: 20, color: 'gray'}}>QUICK EDIT:</Text> {item.TradeName}</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={GlobalStyle.mainContainer}>
                            <CustomInput value={item.TradeName} label="TRADE NAME"
                                onChange={(event) => { item.TradeName = event.nativeEvent.text; this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        TradeName: item.TradeName
                                    });
                                }}
                            />
                            <CustomInput value={item.Retail} label="RETAIL COST" keyboardType='numeric'
                                onChange={(event) => { item.Retail = event.nativeEvent.text; this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        Retail: item.Retail
                                    });
                                }}
                            />
                            <CustomInput value={item.RealCost} label="REAL COST" keyboardType='numeric'
                                onChange={(event) => { item.RealCost = event.nativeEvent.text; this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        RealCost: item.RealCost
                                    });
                                }}
                            />
                            <CustomInput value={item.SOH} label="STOCK ON HAND" keyboardType='numeric'
                                onChange={(event) => { item.SOH = event.nativeEvent.text; this.forceUpdate();
                                    //get stock on hand setter 
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        SOH: (item.SOH * item.PackSize)
                                    });
                                }}
                            />
                            <CustomInput value={item.comments} label="COMMENTS"
                                onChange={(event) => { item.comments = event.nativeEvent.text; this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        comments: item.comments
                                    });
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <CheckBox
                                title='RE-ORDER'
                                checked={item.Reorder || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Reorder = !this.state.item.Reorder;
                                    this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        Reorder: item.Reorder? 0 : -1,
                                    });
                                }}
                            />
                            <CheckBox
                                title='ALLOW DISCOUNT'
                                checked={item.NoDiscount || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.NoDiscount = !this.state.item.NoDiscount;
                                    this.forceUpdate();
                                    this.props.newUpdateData({
                                        ...this.props.updateData,
                                        NoDiscount: item.NoDiscount? 0 : -1,
                                    });
                                }}
                            />
                        </View>
                        <View style={{margin: 15}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <Button
                                    icon={<Icon name="table-edit" type="material-community" color='white' size={20} containerStyle={{paddingLeft: 5}}/>}
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                                    buttonStyle={{backgroundColor: '#2196F3'}}
                                    onPress={() => {
                                        this.props.navigation.navigate('StockScreen', { item: this.state.item, parent: 'Scanner'})
                                    }}
                                    title='FULL EDIT'
                                />
                                <Button
                                    icon={<Icon name="close" type="material-community" color='white' size={20} containerStyle={{paddingLeft: 5}}/>}
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                                    buttonStyle={{backgroundColor: 'green'}}
                                    disabled={!this.props.canSave}
                                    onPress={() => {
                                        this.props.updateStockItem(item.StockID,this.props.updateData).then(res => {
                                            this.props.navigation.goBack();
                                        })
                                    }}
                                    title='UPDATE'
                                />
                                <Button
                                    icon={<Icon name="close" type="material-community" color='white' size={20} containerStyle={{paddingLeft: 5}} />}
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                                    buttonStyle={{backgroundColor: 'grey'}}
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                    title='DISMISS'
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    item: state.stockItem.item,
    itemLoading: state.stockItem.loading,
    itemError: state.stockItem.error,
    canSave: state.stockItem.canSave,
    updateData: state.stockItem.updateData,
    updateResult: state.stockItem.res,
    updating: state.stockItem.updating,
    updatingError: state.stockItem.updatingError
});

const mapDispatchToProps = (dispatch) => {
    return ({
        fetchStockItem: bindActionCreators(fetchStockItem, dispatch),
        updateStockItem: bindActionCreators(updateStockItem, dispatch),
        toggleSave: bindActionCreators(toggleSave, dispatch),
        newUpdateData: bindActionCreators(newUpdateData, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);