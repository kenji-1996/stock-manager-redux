/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import { Button, Card, Text, Icon, Divider, Input, CheckBox } from 'react-native-elements';
import GlobalStyle from '../../styles/GlobalStyle';
import Format from "../../functions/Format";
import StockObject from '../../objects/StockItem';
import

export default class ScanResult extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item','No item found...');
        return {
            title: item.TradeName
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
        this.props.navigation.state.params.isFocused(false, true);
    }

    _loadSettings = () => {
        AsyncStorage.getItem('tgSettings', (err, result) => {
            if(!err) {
                if(result !== null) {
                    let settings = JSON.parse(result);
                    this.setState({server: settings.servers[settings.selectedServer].value});
                }else{
                    alert('Please ensure your settings are setup and correct in the settings tab')
                }
            }else{
                alert('set server IP in settings');
            }
        }).then(() => {
            //alert('end of promise for getting storage');
        });
    };

    _stockByPackSize = () => {
        if(this.state.item.PackSize > 1) {
            return this.state.item.SOH / this.state.item.PackSize;
        }else{
            return this.state.item.SOH;
        }
    };

    _scrollToInput = () => {

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
                            <Input
                                value={item.TradeName}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="PRODUCT NAME"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35}}
                                onSubmitEditing={(event) => {
                                    this.state.item.TradeName = event.nativeEvent.text;
                                    this.forceUpdate();
                                }}
                                //onFocus={this._scrollToInput.bind(this)}
                            />
                            <Input
                                value={Format.formatPrice(item.Retail)}
                                onSubmitEditing={(event) => {
                                    this.state.item.Retail = event.nativeEvent.text;
                                    this.forceUpdate();
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="RETAIL COST"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35}}
                                onFocus={this._scrollToInput.bind(this)}
                            />
                            <Input
                                value={Format.formatPrice(item.RealCost)}
                                onSubmitEditing={(event) => {
                                    this.state.item.RealCost = event.nativeEvent.text;
                                    this.forceUpdate();
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="REAL COST"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35}}
                                onFocus={this._scrollToInput.bind(this)}
                            />
                            <Input
                                value={this._stockByPackSize().toString()}
                                onSubmitEditing={(event) => {
                                    this.state.canSave = true;
                                    this.state.stock.SOH = event.nativeEvent.text;
                                    this.forceUpdate();
                                    console.log(this.state.stock);
                                }}
                                disabled={true}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="SOH"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35}}
                                onFocus={this._scrollToInput.bind(this)}
                            />
                            <Input
                                value={item.comments}
                                onSubmitEditing={(event) => {
                                    this.state.canSave = true;
                                    this.state.stock.comments = event.nativeEvent.text;
                                    this.forceUpdate();
                                    console.log(this.state.stock);
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="COMMENTS"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35}}
                                onFocus={this._scrollToInput.bind(this)}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <CheckBox
                                title='RE-ORDER'
                                checked={item.Reorder}
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                                onPress={() => {
                                    this.state.item.Reorder = !this.state.item.Reorder;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='ALLOW DISCOUNT'
                                checked={!item.NoDiscount}
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                                onPress={() => {
                                    this.state.item.NoDiscount = !this.state.item.NoDiscount;
                                    this.forceUpdate();
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
                                        /*const query = Network.prepareURL({},'stock/id/' + item.StockID,this.state.server);
                                        console.log('query url',query);
                                        /Network.executeQuery(query).then(res => {
                                            const {success, data} = res;
                                            console.log(success, data);
                                            if(success) {
                                                Network.handleResponse(data).then(res => {
                                                    const {result, data} = res;
                                                    console.log(result,data);
                                                    if(result) {
                                                        console.log(data);
                                                        let item = new StockObject(data[0]);
                                                        //let item = data[0];
                                                        this.props.navigation.navigate('Stock', { item: item, title: `Edit ${item.TradeName}`})
                                                    }
                                                })
                                            }else{
                                                alert('Failed to find stock');
                                            }
                                        });*/
                                    }}
                                    title='FULL EDIT'
                                />
                                <Button
                                    icon={<Icon name="close" type="material-community" color='white' size={20} containerStyle={{paddingLeft: 5}}/>
                                    }
                                    disabled={!this.state.canSave}
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                                    buttonStyle={{backgroundColor: this.state.canSave? 'green' : 'red'}}
                                    onPress={() => {
                                        if(this.state.item.PackSize > 1 && this.state.stock.SOH) {
                                            this.state.stock.SOH = (this.state.stock.SOH * this.state.item.PackSize);
                                            this.forceUpdate();
                                        }
                                        let object = {
                                            method: 'PUT',
                                            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                                            body: JSON.stringify({'stock': this.state.stock})
                                        };
                                        /*const query = Network.prepareURL({},'stock/id/' + this.state.item.StockID,this.state.server);
                                        Network.executeQuery(query, object)
                                            .then(res => {
                                                const {success, data} = res;
                                                console.log(success, data);
                                                if(success) {
                                                    this.props.navigation.goBack();
                                                }else{
                                                    alert('Failed to find stock');
                                                }
                                            })
                                            .catch(err => alert(err));*/
                                    }}
                                    title='UPDATE'
                                />
                                <Button
                                    icon={<Icon name="close" type="material-community"
                                                color='white'
                                                size={20}
                                                containerStyle={{paddingLeft: 5}}
                                    />
                                    }
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                                    buttonStyle={{backgroundColor: 'grey'}}
                                    onPress={() => {
                                        this.props.navigation.state.params.isFocused(true, false);
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
    item: state.stockList.list,
    loading: state.stockList.loading,
    error: state.stockList.error,
});

const mapDispatchToProps = {
    fetchStocklist
};


export default connect(mapStateToProps, mapDispatchToProps)(StockList);