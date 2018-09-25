import React from 'react';
import {StyleSheet,Text,View,ActivityIndicator,ScrollView,AsyncStorage,Keyboard,} from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { createStackNavigator} from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';//https://github.com/n4kz/react-native-material-dropdown/blob/master/example/app.js
import GlobalStyle from '../styles/GlobalStyle';
import { connect } from 'react-redux';
import { CustomInput } from './pieces/Input';

import { newConnection, removeConnection, updateConnection, updateLicense, updateStaffID } from '../redux/settings/actions';

class SettingsScreen extends React.Component {

    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props) {
        super(props);
        this.state = {
            newServer: '',
            newLicense: '',
            tgSettings: {},
            loading: true,
        };
    }

    componentWillMount() {
        console.log(this.props);
        this.setState({loading: false});
    }

    _populateSettings = () => {
        console.log('attempting to get async storage');
        AsyncStorage.getItem('tgSettings', (err, res) =>
        {
            if(!err) {
                if(res !== null) {
                    console.log('raw settings', res);
                    let settingsInfo = JSON.parse(res);
                    console.log('settings ', settingsInfo);
                    this.state.tgSettings = {
                        selectedServer: settingsInfo.selectedServer || 0,
                        servers: settingsInfo.servers || [{value:'192.168.0.29:49691'}],
                        serverError: settingsInfo.serverError ||  '',
                        selectedLicense: settingsInfo.selectedLicense || 0,
                        licenses: settingsInfo.licenses || [{value:'techgorilla-123'}],
                        licenseError: settingsInfo.licenseError ||  '',
                    };
                    this.state.loading = false;
                    this.forceUpdate();
                }else{
                    this.state.tgSettings = {
                        selectedServer: 0,
                        servers: [{value:'192.168.0.29:49691'}],
                        serverError: '',
                        selectedLicense: 0,
                        licenses: [{value:'techgorilla-123'}],
                        licenseError: '',
                    };
                    this.state.loading = false;
                    this.forceUpdate();
                    AsyncStorage.setItem('tgSettings', JSON.stringify(this.state.tgSettings), () => {});
                    console.log('result is null');
                }
            }else{
                console.log('failed');
            }
        });
    };

    _checkLicense = (license) => {
        if(license) {
            var va = /(techgorilla)\-[a-zA-Z0-9]{10}/g;
            if (!va.test(license)) {
                this.setState({tgLicenseErr: 'Invalid TechGorilla License'})
            } else {
                this.setState({tgLicenseErr: ''})
            }
        }
    };

    render() {

        return (
            <View style={GlobalStyle.container} keyboardShouldPersistTaps="handled">
                { this.state.loading ?
                    <View style={GlobalStyle.centerContainer}><ActivityIndicator size="small" /></View>
                    :
                    <View style={GlobalStyle.mainContainer}>
                        <View style={GlobalStyle.mainContainerHorizontal}>
                            <Dropdown
                                label='CURRENT CONNECTION'
                                value={this.props.screenProps.connections[this.props.screenProps.selectedConnection].value}
                                containerStyle={{ width: '90%', height: 50, marginBottom: 12}}
                                data={this.props.screenProps.connections}
                                onChangeText={(text, index) => {
                                    this.props.screenProps.updateConnection(index);
                                }}
                            />
                            <Button
                                icon={<Icon name="delete" color='white' size={25}/>}//type="material-community"
                                onPress={() => {
                                    this.props.screenProps.removeConnection(this.props.screenProps.connections[this.props.screenProps.selectedConnection].value);
                                }}
                                containerStyle={{marginHorizontal: 3}}
                                buttonStyle={{backgroundColor: "red"}}
                                title=''
                            />
                        </View>
                        <View style={GlobalStyle.mainContainerHorizontal}>
                            <Input
                                value={this.state.newServer}
                                onChange={(event) => {this.setState({newServer: event.nativeEvent.text});}}
                                keyboardType="default"
                                returnKeyType="done"
                                containerStyle={{ width: '90%', }}
                                label="NEW CONNECTION (IP:PORT)"
                                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                                inputStyle={{marginLeft: 0, height: 35, color: 'black'}}
                            />
                            <Button
                                icon={<Icon name="add" color='white' size={25}/>}//type="material-community"
                                onPress={() => {
                                    this.props.screenProps.newConnection(this.state.newServer);
                                    this.setState({newServer: ''});
                                }}
                                buttonStyle={{backgroundColor: "green"}}
                                title=''
                            />
                        </View>
                        <CustomInput value={this.props.screenProps.license} label="LICENSE"
                            onChange={(event) => { 
                                this.props.screenProps.updateLicense(event.nativeEvent.text);
                            }}
                        />
                        <CustomInput value={this.props.screenProps.staffID} label="STAFF ID" secureTextEntry={true}
                            onChange={(event) => { 
                                this.props.screenProps.updateStaffID(event.nativeEvent.text);
                            }}
                        />
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    licenseError: state.settings.licenseError,
    licenseLoading: state.settings.licenseLoading,
    license: state.settings.license,

    connectionError: state.settings.connectionError,
    connectionLoading: state.settings.connectionLoading,
    connections: state.settings.connections,
    selectedConnection: state.settings.selectedConnection,
    
    staffError: state.settings.staffError,
    staffLoading: state.settings.staffLoading,
    staffID: state.settings.staffID,
});

const mapDispatchToProps = {
    newConnection, removeConnection, updateConnection, updateLicense, updateStaffID
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

let SettingsTab = createStackNavigator({
    Settings: SettingsScreen,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsTab);