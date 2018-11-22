/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Vibration, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements'
import Camera from 'react-native-camera';
import GlobalStyle from "../styles/GlobalStyle";
import { connect } from 'react-redux';
import { fetchStockItemByBarcode } from '../redux/stock/actions';
import { updateLastItem } from '../redux/settings/actions';
import _ from 'lodash';
import Torch from 'react-native-torch';

class Scanner extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Scan a barcode',
            headerRight: (
                <View>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ScannerSettingsModal') }}
                        style={{ marginRight: 9, marginLeft: 22, marginVertical: 8 }}
                    >
                        <Icon
                            name='ios-settings'
                            type='ionicon'
                            color='#000000'
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: (
                <View>
                    <TouchableOpacity
                        onPress={() => { alert('insert custom input for non-scannable barcodes')}}
                        style={{ marginRight: 9, marginLeft: 9, marginVertical: 8 }}
                    >
                        <Icon
                            name='ios-create'
                            type='ionicon'
                            color='#000000'
                        />
                    </TouchableOpacity>
                </View>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            server: null,
            barcodeFound: false,
            isFocused: true,
            barcode: '',
            torchOn: false,
        }
    }

    componentDidMount() {
        this._willFocusSubscription = this.props.navigation.addListener('willFocus', payload => {
            this.setState({ barcodeFound: false });
            setTimeout(() => {
                Torch.switchState(this.props.screenProps.torch);
            }, 1000);
        });
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
            this.setState({ barcodeFound: false });
            setTimeout(() => {
                Torch.switchState(false);
            }, 1000);
        });

    }

    componentWillUnmount() {
        this._willFocusSubscription && this._willFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
        Torch.switchState(false);
    }

    _actOnBarcode = (e) => {
        if (!this.state.barcodeFound && this.props.navigation.isFocused()) {
            Vibration.vibrate(500);
            let barcode = parseInt(e.data);
            this.setState({ barcodeFound: true, barcode: barcode });
            this.props.screenProps.fetchStockItemByBarcode(this.state.barcode).then(() => {
                if (this.props.screenProps.error === null) {
                    setTimeout(() => {
                        this.setState({ barcodeFound: false })
                    }, 1000);
                    this.props.screenProps.updateLastItem(this.props.screenProps.item);
                    this.props.navigation.navigate(`StockModal`, {
                        item: this.props.screenProps.item,
                        parent: 'Scanner',
                    });
                }

            });
        }
    };

    render() {
        return (
            <View style={{ ...GlobalStyle.container }} keyboardShouldPersistTaps="handled">
                {(!this.state.barcodeFound && this.props.navigation.isFocused()) ?
                    <View>
                        <View style={{ height: "100%", justifyContent: 'flex-end' }}>
                            <Camera
                                style={{ ...GlobalStyle.container }}
                                onBarCodeRead={this._actOnBarcode.bind(this)}
                                ref={(cam) => { this.camera = cam; }}
                                aspect={Camera.constants.Aspect.fill}
                            >
                            </Camera>
                        </View>
                    </View>
                    :
                    <View style={{ ...GlobalStyle.flexColumnContainer, justifyContent: 'center' }}>
                        <ActivityIndicator size={'large'} />
                        {this.state.barcodeFound?
                            <View>
                                <Text>{this.state.barcode}</Text>
                                <Button
                                    icon={<Icon name="stop" type="material-community" color='white' size={20} containerStyle={{ paddingLeft: 5 }} />}
                                    titleStyle={{ fontWeight: 'normal', fontSize: 12, color: 'white', padding: 10 }}
                                    buttonStyle={{ backgroundColor: 'red' }}
                                    containerStyle={{ margin: 5, }}
                                    onPress={() => {
                                        this.setState({ barcodeFound: false })
                                    }}
                                    title='Cancel'
                                />
                            </View>
                            :
                            <View>
                            </View>
                        }
                        
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    item: state.stockItem.item,
    loading: state.stockItem.loading,
    error: state.stockItem.error,
    torch: state.settings.torch,
});

const mapDispatchToProps = {
    fetchStockItemByBarcode, updateLastItem
};

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

let ScannerScreen = createStackNavigator({
    Screen: {
        screen: Scanner
    },
});


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ScannerScreen);


