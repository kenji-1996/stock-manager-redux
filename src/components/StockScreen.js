/**
 * Created by kenji on 9/9/18.
 */
import React from 'react';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Format from "../functions/Format";
import Stock from '../objects/StockItem'
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Text, Icon, Input, Divider, CheckBox } from 'react-native-elements';
import GlobalStyle from '../styles/GlobalStyle';
import { fetchStockItem, toggleSave, newUpdateData } from '../redux/stock/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppInput, CustomInput } from './pieces/Input'

class PricingTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Pricing`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        indicatorStyle: { borderBottomColor: '#000', borderBottomWidth: 2, },
        headerStyle: {
            backgroundColor: 'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            GSTRate: [{ value: '0%', }, { value: '10%', }, { value: '20%', }],
            GSTType: [{ value: 'Free to End Customer', }, { value: 'Cost to End Customer', }, { value: 'Other', }],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.screenProps.item);
        this.forceUpdate();
        this.props.navigation.addListener('willFocus', (route) => { Keyboard.dismiss(); });
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView innerRef={ref => { this.scroll = ref }}>
                    <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                        <View style={GlobalStyle.mainContainerPullLeft}>
                            <Text style={GlobalStyle.stockHeaderFont}>Prices</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={GlobalStyle.mainContainer}>
                            <CustomInput value={item.RealCost} label="REAL COST (EXCL GST)" keyboardType='numeric'
                                onChange={(event) => { item.RealCost = event.nativeEvent.text; this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        RealCost: item.RealCost
                                    });
                                }}
                            />
                            <CustomInput value={item.Retail} label="RETAIL (EXCL GST)" keyboardType='numeric'
                                onChange={(event) => { item.Retail = event.nativeEvent.text; this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        Retail: item.Retail
                                    });
                                }}
                            />
                            <CustomInput value={item.Markup} label="MARKUP PERCENTAGE" editable={false}
                            />
                            <CustomInput value={Format.getGrossProfit(item.RealCost, item.Retail) + '%' || ''} 
                                label="MARKUP PERCENTAGE" editable={false} 
                            />
                            <CustomInput value={item.AverageCost} label="AVERAGE COST (EXCL GST)" keyboardType='numeric' editable={false}
                                onChange={(event) => { item.AverageCost = event.nativeEvent.text; this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        AverageCost: item.AverageCost
                                    });
                                }}
                            />
                            <CustomInput value={item.ListCost} label="LIST COST (EXCL GST)" 
                                keyboardType='numeric' editable={false}
                            />
                            <CustomInput value={item.RetailAfterGST} label="RETAIL (INCL GST)" 
                                keyboardType='numeric' editable={false}
                            />
                            <CustomInput value={item.RecommendedRetail} label="RECOMMENDED RETAIL" 
                                keyboardType='numeric' editable={false}
                            />
                            <CustomInput value={item.AverageRetail} label="AVERAGE RETAIL" 
                                keyboardType='numeric' editable={false}
                            />
                        </View>


                        <View style={GlobalStyle.mainContainerPullLeft}>
                            <Text style={GlobalStyle.stockHeaderFont}>GST</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={GlobalStyle.mainContainer}>
                            <CustomInput value={item.GST} label="GST" 
                                keyboardType='numeric' editable={false}
                            />
                            <CustomInput value={item.StockDiscount} label="Stock Discount" 
                                keyboardType='numeric' editable={false}
                            />
                            <Dropdown
                                label='GST RATE'
                                value={this.state.GSTRate[0].value || ''}
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.GSTRate}
                            />
                            <Dropdown
                                label='GST TYPE'
                                value={this.state.GSTType[0].value || ''}
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.GSTType}
                            />
                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

class OtherTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Other`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        indicatorStyle: { borderBottomColor: '#000', borderBottomWidth: 2, },
        headerStyle: {
            backgroundColor: 'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.screenProps.item);
        this.forceUpdate();
        this.props.navigation.addListener('willFocus', (route) => { Keyboard.dismiss();});
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView innerRef={ref => { this.scroll = ref }}>
                    <ScrollView style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                        <View style={GlobalStyle.mainContainerPullLeft}>
                            <Text style={GlobalStyle.stockHeaderFont}>Other</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}>Work in progress :)</Text>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

class StockTab extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Stock`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        indicatorStyle: { borderBottomColor: '#000', borderBottomWidth: 2, },
        headerStyle: {
            backgroundColor: 'black',
        },
    });

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            newLocation: '',
            locations: [{ value: 'Area 1', }, { value: 'Area 2', }, { value: 'Area 3', }],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.screenProps.item);
        this.forceUpdate();
        this.props.navigation.addListener('willFocus', (route) => { Keyboard.dismiss();});
    }

    render() {
        //Get values to render with
        let item = this.state.item;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView innerRef={ref => { this.scroll = ref }}>
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
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
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
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
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
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
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
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
                            />
                        </View>

                        <View style={GlobalStyle.mainContainerPullLeft}>
                            <Text style={GlobalStyle.stockHeaderFont}>Flags</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <CheckBox
                                title='UPDATE'
                                checked={item.Update || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Update = !this.state.item.Update;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='GOODS LABELS'
                                checked={item.Labels || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Labels = !this.state.item.Labels;
                                    this.forceUpdate();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <CheckBox
                                title='ASK PRICE'
                                checked={item.AskPrice || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.AskPrice = !this.state.item.AskPrice;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='SEASONAL'
                                checked={item.Seasonal || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Seasonal = !this.state.item.Seasonal;
                                    this.forceUpdate();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <CheckBox
                                title='ONLY ORD ON NEG. SOH'
                                checked={item.OnlyOrdNegSOH || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.OnlyOrdNegSOH = !this.state.item.OnlyOrdNegSOH;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='RE-ORDER'
                                checked={item.Reorder || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Reorder = !this.state.item.Reorder;
                                    this.forceUpdate();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <CheckBox
                                title='PRICE ON LABEL'
                                checked={item.Priced || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Priced = !this.state.item.Priced;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='ALLOW DISCOUNT'
                                checked={!item.NoDiscount || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.NoDiscount = !this.state.item.NoDiscount;
                                    this.forceUpdate();
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <CheckBox
                                title='SHELF LABEL'
                                checked={item.Shelflabel || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.state.item.Shelflabel = !this.state.item.Shelflabel;
                                    this.forceUpdate();
                                }}
                            />
                            <CheckBox
                                title='DISCONTINUED'
                                checked={!item.Discontinued || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
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
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.locations}
                            />
                            <View style={GlobalStyle.mainContainerHorizontal}>
                                <Input
                                    value={this.state.newLocation || ''}
                                    onChange={(event) => { this.setState({ newLocation: event.nativeEvent.text }); }}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    containerStyle={{ width: '90%', }}
                                    label="NEW LOCATION"
                                    labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                    inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                    inputStyle={{ marginLeft: 0, height: 35, color: 'black' }}
                                    onSubmitEditing={() => { }}
                                />
                                <Button
                                    icon={<Icon name="add" color='white' size={25} />}//type="material-community"
                                    onPress={() => {
                                        this.state.locations.unshift({ value: this.state.newLocation });
                                        this.setState({ newLocation: '' });
                                        this.forceUpdate();
                                    }}
                                    title=''
                                />
                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

class GeneralStockTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            newBarcode: '',
            barcodes: [{ value: '321', }, { value: '123', }, { value: '9867', }],
            subDepartments: [{ value: 'Banana', }, { value: 'Mango', }, { value: 'Pear', }],
        };
    }

    componentWillMount() {
        this.state.item = new Stock(this.props.screenProps.item);
        this.state.subDepartments.unshift({ value: this.state.item.ProductGroupName || 'Product Group' });
        this.forceUpdate();
        this.props.navigation.addListener('willFocus', (route) => { Keyboard.dismiss();});
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
        let item = this.state.item;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAwareScrollView innerRef={ref => { this.scroll = ref }}>
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
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        TradeName: this.state.item.TradeName
                                    });
                                    console.log(this.props);
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="PRODUCT NAME"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                            />
                            <Input
                                value={item.StockID.toString() || ''}
                                editable={false}
                                keyboardType='numeric'
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="STOCK ID"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35, color: 'gray' }}
                                onSubmitEditing={() => { }}
                            />
                            <Input
                                value={item.PLU || ''}
                                onChange={(event) => {
                                    this.state.item.PLU = event.nativeEvent.text;
                                    this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        PLU: this.state.item.PLU
                                    });
                                }}
                                keyboardType='numeric'
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="PLU"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
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
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35, color: 'gray' }}
                                onSubmitEditing={() => { }}
                            />
                            <Dropdown
                                label='SUB DEPARTMENT'
                                value={this.state.subDepartments[0].value || ''}
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.subDepartments}
                            />
                            <Dropdown
                                label='MANUFACTURER'
                                value={this.state.subDepartments[0].value || ''}
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.subDepartments || []}
                            />
                            <Input
                                value={item.Message || ''}
                                onChange={(event) => {
                                    this.state.item.Message = event.nativeEvent.text;
                                    this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        Message: this.state.item.Message
                                    });
                                    console.log(this.props);
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="POS MESSAGE"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: undefined }}
                                onSubmitEditing={() => { }}
                            />
                            <Input
                                value={item.comments || ''}
                                onChange={(event) => {
                                    this.state.item.comments = event.nativeEvent.text;
                                    this.forceUpdate();
                                    this.props.screenProps.newUpdateData({
                                        ...this.props.screenProps.updateData,
                                        comments: this.state.item.comments
                                    });
                                    console.log(this.props);
                                }}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%' }}
                                label="COMMENTS"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                inputStyle={{ marginLeft: 0, height: 35 }}
                                onSubmitEditing={() => { }}
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
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12 }}
                                data={this.state.barcodes || []}
                            />
                            <View style={GlobalStyle.mainContainerHorizontal}>
                                <Input
                                    value={this.state.newBarCode || ''}
                                    onChange={(event) => { this.setState({ newBarCode: event.nativeEvent.text }); }}
                                    keyboardType="default"
                                    returnKeyType="done"
                                    containerStyle={{ width: '90%', }}
                                    label="NEW BARCODE"
                                    labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                    inputContainerStyle={{ borderBottomWidth: StyleSheet.hairlineWidth }}
                                    inputStyle={{ marginLeft: 0, height: 35, color: 'black' }}
                                    onSubmitEditing={() => { }}
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
                                        this.state.barcodes.unshift({ value: this.state.newBarCode });
                                        this.setState({ newBarCode: '' });
                                        this.forceUpdate();
                                    }}
                                    onLongPress={() => this.props.navigation.navigate('QuickEdit', { price: item.Retail, SOH: item.SOH, item: item })}
                                    title=''
                                />
                            </View>
                        </View>

                    </ScrollView>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

let StockTabs = createMaterialTopTabNavigator(
    {
        General: {
            screen: GeneralStockTab,
            //navigationOptions:{},
        },
        Pricing: {
            screen: PricingTab,
            //navigationOptions:{},
        },
        Stock: {
            screen: StockTab
            //navigationOptions:{},
        },
        Other: {
            screen: OtherTab,
            //navigationOptions:{},
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName, iconColor;
                if (routeName === 'General') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-information-circle`;
                } else if (routeName === 'Pricing') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-options`;
                } else if (routeName === 'Stock') {
                    iconColor = `${focused ? tintColor : 'gray'}`;
                    iconName = `ios-barcode`;
                } else if (routeName === 'Other') {
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
        toggleSave: bindActionCreators(toggleSave, dispatch),
        newUpdateData: bindActionCreators(newUpdateData, dispatch)
    })
}

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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StockTabs);
//export default StockScreenRoot;



/*let StockScreenRoot = createStackNavigator(
    {
        Tabs: {
            screen: StockTabs,
            navigationOptions: ({ navigation }) => ({
                title: `${navigation.state.routes[navigation.state.index].routeName}`,
                headerTitle: 'xd',
                headerStyle: {
                    backgroundColor: '#2196f3',
                    elevation: null
                },
                headerTitleStyle: {
                    color: '#fff',
                },

                headerRight: (
                    <Button
                        onPress={() => alert('This is a button!')}
                        title="Info"
                        color="#fff"
                    />
                ),
                headerLeft: (
                    <Button
                        onPress={() => {
                            navigation.navigate(navigation.state.params.parent || 'Search')
                        }}
                        title="Info"
                        color="#fff"
                    />
                ),
            }),
        }
    },
    {
        mode: 'card',
        headerMode: 'float',
    }
);*/