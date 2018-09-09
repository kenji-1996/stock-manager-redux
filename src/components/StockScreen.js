/**
 * Created by kenji on 9/9/18.
 */
import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import Format from "../functions/Format";
import Stock from '../objects/StockItem'
import { Dropdown } from 'react-native-material-dropdown';
import { Button, Card, Text, Icon, Input, Divider, CheckBox } from 'react-native-elements';
import GlobalStyle from '../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

class PricingTab extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: `Pricing`,
        headerTitleStyle: {textAlign: 'center', alignSelf: 'center'},
        indicatorStyle: {borderBottomColor: '#000', borderBottomWidth: 2,},
        headerStyle: {
            backgroundColor: 'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            GSTRate: [{value: '0%',}, {value: '10%',}, {value: '20%',}],
            GSTType: [{value: 'Free to End Customer',}, {value: 'Cost to End Customer',}, {value: 'Other',}],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.navigation.getParam('item',null));
        this.forceUpdate();
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Prices</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Input
                        value={item.RealCost.toString() || '0'}
                        onChange={(event) => {
                            this.state.item.RealCost = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="REAL COST (EXCL GST)"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.Retail.toString() || '0'}
                        onChange={(event) => {
                            this.state.item.Retail = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="RETAIL (EXCL GST)"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.Markup+'%' || ''}
                        onChange={(event) => {
                            //this.state.item.AverageRetail = event.nativeEvent.text;
                            //this.forceUpdate();
                        }}
                        keyboardType="numeric"
                        editable={false}
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="MARKUP PERCENTAGE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={Format.getGrossProfit(item.RealCost,item.Retail)+'%' || ''}
                        onChange={(event) => {
                            //this.state.item.AverageRetail = event.nativeEvent.text;
                            //this.forceUpdate();
                        }}
                        keyboardType="numeric"
                        editable={false}
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="GROSS PROFIT PERCENTAGE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.AverageCost.toString() || ''}
                        onChange={(event) => {
                            this.state.item.AverageCost = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        editable={false}
                        containerStyle={{ width: '90%'}}
                        label="AVERAGE COST (EXCL GST)"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.ListCost.toString() || ''}
                        onChange={(event) => {
                            this.state.item.ListCost = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="LIST COST (EXCL GST)"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.RetailAfterGST.toString() || ''}
                        onChange={(event) => {
                            this.state.item.RetailAfterGST = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="RETAIL (INCL GST)"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.RecommendedRetail.toString() || ''}
                        onChange={(event) => {
                            this.state.item.RecommendedRetail = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="RECOMMENDED RETAIL"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.AverageRetail.toString() || ''}
                        onChange={(event) => {
                            this.state.item.AverageRetail = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="RECOMMENDED RETAIL"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                </View>


                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>GST</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Input
                        value={item.GST.toString() || ''}
                        onChange={(event) => {
                            this.state.item.GST = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        editable={false}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="RECOMMENDED RETAIL"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.StockDiscount || ''}
                        onChange={(event) => {
                            this.state.item.StockDiscount = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        editable={false}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="DISCOUNT PRICE OR PERCENTAGE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Dropdown
                        label='GST RATE'
                        value={this.state.GSTRate[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.GSTRate}
                    />
                    <Dropdown
                        label='GST TYPE'
                        value={this.state.GSTType[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.GSTType}
                    />
                </View>

            </ScrollView>
        );
    }
}

class OtherTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Other`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        indicatorStyle: { borderBottomColor: '#000',  borderBottomWidth: 2, },
        headerStyle:{
            backgroundColor:'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.navigation.getParam('item',null));
        this.forceUpdate();
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Other</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}>Work in progress :)</Text>
                </View>
            </ScrollView>
        );
    }
}

class StockTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Stock`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        indicatorStyle: { borderBottomColor: '#000',  borderBottomWidth: 2, },
        headerStyle:{
            backgroundColor:'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            newLocation: '',
            locations: [{value: 'Area 1',}, {value: 'Area 2',}, {value: 'Area 3',}],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.navigation.getParam('item',null));
        this.forceUpdate();
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Quantities</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Input
                        value={item.SOH.toString() || ''}
                        onChange={(event) => {
                            this.state.item.SOH = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="STOCK ON HAND"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.Expected.toString() || ''}
                        onChange={(event) => {
                            this.state.item.Expected = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="STOCK ON HAND"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.LastOrderDate || ''}
                        onChange={(event) => {
                            this.state.item.LastOrderDate = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="LAST ORDER DATE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.LastCountDate || ''}
                        onChange={(event) => {
                            this.state.item.LastCountDate = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="LAST COUNT DATE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                </View>

                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Flags</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <CheckBox
                        title='UPDATE'
                        checked={item.Update || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Update = !this.state.item.Update;
                            this.forceUpdate();
                        }}
                    />
                    <CheckBox
                        title='GOODS LABELS'
                        checked={item.Labels || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Labels = !this.state.item.Labels;
                            this.forceUpdate();
                        }}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <CheckBox
                        title='ASK PRICE'
                        checked={item.AskPrice || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.AskPrice = !this.state.item.AskPrice;
                            this.forceUpdate();
                        }}
                    />
                    <CheckBox
                        title='SEASONAL'
                        checked={item.Seasonal || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Seasonal = !this.state.item.Seasonal;
                            this.forceUpdate();
                        }}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <CheckBox
                        title='ONLY ORD ON NEG. SOH'
                        checked={item.OnlyOrdNegSOH || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.OnlyOrdNegSOH = !this.state.item.OnlyOrdNegSOH;
                            this.forceUpdate();
                        }}
                    />
                    <CheckBox
                        title='RE-ORDER'
                        checked={item.Reorder || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Reorder = !this.state.item.Reorder;
                            this.forceUpdate();
                        }}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <CheckBox
                        title='PRICE ON LABEL'
                        checked={item.Priced || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Priced = !this.state.item.Priced;
                            this.forceUpdate();
                        }}
                    />
                    <CheckBox
                        title='ALLOW DISCOUNT'
                        checked={!item.NoDiscount || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.NoDiscount = !this.state.item.NoDiscount;
                            this.forceUpdate();
                        }}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <CheckBox
                        title='SHELF LABEL'
                        checked={item.Shelflabel || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Shelflabel = !this.state.item.Shelflabel;
                            this.forceUpdate();
                        }}
                    />
                    <CheckBox
                        title='DISCONTINUED'
                        checked={!item.Discontinued || false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            this.state.item.Discontinued = !this.state.item.Discontinued;
                            this.forceUpdate();
                        }}
                    />
                </View>

                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Locations</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Dropdown
                        label='LOCATIONS'
                        value={this.state.locations[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.locations}
                    />
                    <View style={GlobalStyle.mainContainerHorizontal}>
                        <Input
                            value={this.state.newLocation || ''}
                            onChange={(event) => {this.setState({newLocation: event.nativeEvent.text});}}
                            keyboardType="default"
                            returnKeyType="done"
                            containerStyle={{ width: '90%', }}
                            label="NEW LOCATION"
                            labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                            inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                            inputStyle={{marginLeft: 0, height: 35, color: 'black'}}
                            onSubmitEditing={() => {  }}
                        />
                        <Button
                            icon={<Icon name="add" color='white' size={25}/>}//type="material-community"
                            onPress={() => {
                                this.state.locations.unshift({value:this.state.newLocation});
                                this.setState({newLocation: ''});
                                this.forceUpdate();
                            }}
                            title=''
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}

class GeneralStockTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `General`,
        headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
        indicatorStyle: { borderBottomColor: '#000',  borderBottomWidth: 2, },
        headerStyle:{
            backgroundColor:'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            newBarcode: '',
            barcodes: [{value: '321',}, {value: '123',}, {value: '9867',}],
            subDepartments: [{value: 'Banana',}, {value: 'Mango',}, {value: 'Pear',}],
        };
    }

    componentWillMount() {
        console.log(this.props);
        this.state.item = new Stock();
        //this._loadSettings();
        this.state.subDepartments.unshift({value: this.state.item.ProductGroupName || 'Product Group'});
        this.forceUpdate();
    }

    loadBarcodes() {
        /*const query = Network.prepareURL({},'stock/id/' + this.state.item.StockID + '/barcodes',this.state.server);
        Network.executeQuery(query).then(res => {
            const {success, data} = res;
            console.log(success, data);
            if(success) {
                Network.handleResponse(data).then(res => {
                    const {result, data} = res;
                    if(result) {
                        let barcodeList = [];
                        for(let code in data) {
                            barcodeList.push({value: data[code].Barcode});
                        }
                        this.setState({barcodes: barcodeList});
                    }
                })
            }else{
                alert('Failed to find any results');
            }
        }).catch(err => {
            alert('stock screen ' + err + ' ' + query);
        });*/
    }

    render() {
        if (!this.props.navigation.state.params) {
            return null;
        }
        //Get values to render with
        let item = this.state.item;
        return (
            <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Information</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Input
                        value={item.TradeName || ''}
                        onChange={(event) => {
                            this.state.item.TradeName = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="PRODUCT NAME"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.StockID.toString() || ''}
                        editable={false}
                        keyboardType='numeric'
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="STOCK ID"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35, color: 'gray'}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.PLU || ''}
                        onChange={(event) => {
                            this.state.item.PLU = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType='numeric'
                        returnKeyType="done"
                        containerStyle={{ width: '90%' }}
                        label="PLU"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.UPI.toString() || ''}
                        onChange={(event) => {
                            this.state.item.UPI = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        editable={false}
                        returnKeyType="done"
                        containerStyle={{ width: '90%', }}
                        label="UPI"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35, color: 'gray'}}
                        onSubmitEditing={() => {  }}
                    />
                    <Dropdown
                        label='SUB DEPARTMENT'
                        value={this.state.subDepartments[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.subDepartments}
                    />
                    <Dropdown
                        label='MANUFACTURER'
                        value={this.state.subDepartments[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.subDepartments || []}
                    />
                    <Input
                        value={item.Message || ''}
                        onChange={(event) => {
                            this.state.item.Message = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="POS MESSAGE"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                    <Input
                        value={item.comments || ''}
                        onChange={(event) => {
                            this.state.item.comments = event.nativeEvent.text;
                            this.forceUpdate();
                        }}
                        keyboardType="default"
                        returnKeyType="done"
                        containerStyle={{ width: '90%'}}
                        label="COMMENTS"
                        labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                        inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                        inputStyle={{marginLeft: 0, height: 35}}
                        onSubmitEditing={() => {  }}
                    />
                </View>

                <View style={GlobalStyle.mainContainerPullLeft}>
                    <Text style={GlobalStyle.stockHeaderFont}>Barcodes</Text>
                    <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                </View>
                <View style={GlobalStyle.mainContainer}>
                    <Dropdown
                        label='BARCODES'
                        value={this.state.barcodes[0].value || ''}
                        containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                        data={this.state.barcodes || []}
                    />
                    <View style={GlobalStyle.mainContainerHorizontal}>
                        <Input
                            value={this.state.newBarCode || ''}
                            onChange={(event) => {this.setState({newBarCode: event.nativeEvent.text});}}
                            keyboardType="default"
                            returnKeyType="done"
                            containerStyle={{ width: '90%', }}
                            label="NEW BARCODE"
                            labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                            inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                            inputStyle={{marginLeft: 0, height: 35, color: 'black'}}
                            onSubmitEditing={() => {  }}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="add"
                                    //type="material-community"
                                    color='white'
                                    size={25}
                                />
                            }
                            onPress={() => {
                                this.state.barcodes.unshift({value:this.state.newBarCode});
                                this.setState({newBarCode: ''});
                                this.forceUpdate();
                            }}
                            onLongPress={() => this.props.navigation.navigate('QuickEdit', { price: item.Retail, SOH: item.SOH, item: item})}
                            title=''
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}

let StockTabs = createMaterialTopTabNavigator(
    {
        General: {
            screen: props => <GeneralStockTab {...props} />,
            //navigationOptions:{},
        },
        Pricing:{
            screen: props => <PricingTab {...props} />,
            //navigationOptions:{},
        },
        Stock:{
            screen: props => <StockTabs {...props} />,
            //navigationOptions:{},
        },
        Other:{
            screen: props => <OtherTab {...props} />,
            //navigationOptions:{},
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName,iconColor;

                if (routeName === 'General') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-information-circle`;
                } else if (routeName === 'Pricing') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-options`;
                }else if (routeName === 'Stock') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-barcode`;
                }else if (routeName === 'Other') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-search`;
                }

                return <Icon type='ionicon' name={iconName} size={25} color={iconColor} />;
            },
        }),
        tabBarLabel: 'Settings!',
        tabBarOptions: {
            //activeTintColor: 'black',
            //inactiveTintColor: 'gray',
            showIcon: true,
            //tabStyle: { backgroundColor: '#FFF', },
            indicatorStyle: {
                borderBottomColor: '#FFF',
                borderBottomWidth: 2,
            },
        },
        initialRouteName: 'General',
        mode: 'card',
        headerMode: 'float',
    }
);

/*StockTabs.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];

    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = routeName;

    return {
        headerTitle,
        mode: 'card',
        headerMode: 'float',
        headerRight: (
            <Icon
                name='heartbeat'
                type='font-awesome'
                color='#f50'
                containerStyle={{margin: 8}}
                onPress={() => console.log(navigation.state.routes[navigation.state.index])} />
        ),
    };
};*/

export default StockScreenRoot = createStackNavigator({
    Tabs: {
        screen: StockTabs,
        navigationOptions: { title: 'Header title' }
    }
})

StockScreenRoot.navigationOptions = ({ navigation }) => {
    console.log(navigation);
};