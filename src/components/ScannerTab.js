/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, Vibration, StyleSheet } from 'react-native';
import { createStackNavigator, withNavigationFocus,  } from 'react-navigation';
import { CheckBox, Button, Icon } from 'react-native-elements'
import Camera from 'react-native-camera';
import GlobalStyle from "../styles/GlobalStyle";
import { listStockFromBarcode } from '../redux/reducers/lots_reducer';
import { connect } from 'react-redux';

class ScannerScreen extends React.Component {

    static navigationOptions = {
        title: 'Scanner',
    };

    constructor(props) {
        super(props);
        this.state = {
            server: null,
            barcodeFound: false,
            isFocused: true,
            barcode: '',
        }
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

    _onBarCodeRead = (e) => {
        if(!this.state.barcodeFound && this.state.isFocused) {
            Vibration.vibrate(500);
            let barcode = parseInt(e.data);
            this.setState({barcodeFound: true, barcode: barcode});
            this.props.listStockFromBarcode(this.state.barcode).then(() => {
                this.state.isFocused = false;
                this.props.navigation.navigate(`StockModal`, {
                    item: this.props.stockFromBarcode,
                    isFocused: this.isFocused.bind(this)
                });
            });
        }
    };

    isFocused(isFocused, barcodeFound) {
        this.setState({isFocused: isFocused, barcodeFound: barcodeFound});
    }

    _scannerSettings = () => {
        return (
            <View style={{...GlobalStyle.container,...GlobalStyle.flexStart}}>
                <View elevation={5} style={{ height: "20%" ,width: '100%', backgroundColor:"#fff", alignItems: 'center',
                    shadowColor: '#000000', shadowOffset: {width: 0, height: 3,}, shadowRadius: 5, shadowOpacity: 1.0}}>
                    <View style={{flexDirection: 'row', justifyContent:"space-evenly"}}>
                        <CheckBox
                            title='SCAN TO LIST'
                            checked={false}
                            containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                            textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                            onPress={() => {
                                alert('pressed')
                            }}
                        />
                        <CheckBox
                            title='QUICK EDIT`'
                            checked={true}
                            containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                            textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                            onPress={() => {
                                alert('pressed')
                            }}
                        />
                    </View>

                    <View style={{flexDirection: 'row', justifyContent:"space-evenly"}}>
                        <CheckBox
                            title='QR SCANNING'
                            checked={true}
                            containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                            textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                            onPress={() => {
                                alert('pressed')
                            }}
                        />
                        <CheckBox
                            title='NOTIFICATION'
                            checked={true}
                            containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                            textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                            onPress={() => {
                                alert('pressed')
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={{...GlobalStyle.container}} keyboardShouldPersistTaps="handled">
                {(this.state.isFocused && !this.state.barcodeFound)?
                    <View>
                    <View style={[GlobalStyle.headerContainer, { backgroundColor: '#e16969' }]}>
                        <View style={{flexDirection: 'row', justifyContent:"space-evenly"}}>
                            <CheckBox
                                title='SCAN TO LIST'
                                checked={false}
                                size={15}
                                checkedColor="white"
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                                onPress={() => {
                                    alert('pressed')
                                }}
                            />
                            <CheckBox
                                title='QUICK EDIT'
                                checked={true}
                                size={15}
                                checkedColor="white"
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                                onPress={() => {
                                    alert('pressed')
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent:"space-evenly"}}>
                            <CheckBox
                                title='QR SCANNING'
                                checked={true}
                                size={15}
                                checkedColor="white"
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                                onPress={() => {
                                    alert('pressed')
                                }}
                            />
                            <CheckBox
                                title='NOTIFICATION'
                                checked={true}
                                size={15}
                                checkedColor="white"
                                containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                                textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(255, 255, 255, 1)'}}
                                onPress={() => {
                                    alert('pressed')
                                }}
                            />
                        </View>
                    </View>
                        <View style={{height: "80%", justifyContent: 'flex-end'}}>
                            <Camera
                                style={{...GlobalStyle.container}}
                                onBarCodeRead={this._onBarCodeRead.bind(this)}
                                ref={(cam) => { this.camera = cam; }}
                                aspect={Camera.constants.Aspect.fill}>

                            </Camera>
                        </View>
                    </View>
                    :
                    <View style={{ ...GlobalStyle.flexColumnContainer, justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'}/>
                        <Text>{this.state.barcode}</Text>
                        <Button
                            icon={<Icon name="stop" type="material-community" color='white' size={20} containerStyle={{paddingLeft: 5}}/>}
                            titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white',padding: 10 }}
                            buttonStyle={{backgroundColor: 'red'}}
                            containerStyle={{margin: 5,}}
                            onPress={() => {this.setState({ barcodeFound: false})}}
                            title='Cancel'
                        />
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = ({ loadingStockFromBarcode, stockFromBarcode }) => ({
    loadingStockFromBarcode, stockFromBarcode
});

const mapDispatchToProps = {
    listStockFromBarcode
};

let ScannerStack = createStackNavigator({
    Scanner: ScannerScreen,
});

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);


