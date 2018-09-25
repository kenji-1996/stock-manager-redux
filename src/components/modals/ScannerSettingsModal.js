 /**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import {View, ScrollView, StyleSheet, AsyncStorage} from 'react-native';
import { Button, Text, Icon, Divider, CheckBox } from 'react-native-elements';
import GlobalStyle from '../../styles/GlobalStyle';
import Format from "../../functions/Format";
import StockObject from '../../objects/StockItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTorch} from '../../redux/settings/actions'; 
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
    }

    render() {
        return (
            <View style={{ flex: 1 ,flexDirection: 'column', justifyContent: 'flex-start'}}>
                <View style={{ height: "100%" ,width: '100%', backgroundColor:"#fff"}}>
                    <ScrollView style={{...GlobalStyle.container}} keyboardShouldPersistTaps="handled" ref="myScrollView">
                        <View style={GlobalStyle.containerWithVerticalMargin}>
                            <Text style={GlobalStyle.headerFont}>SCANNER SETTINGS</Text>
                            <Divider style={{ backgroundColor: 'gray', width: '100%' }} />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <CheckBox
                                title='TORCH'
                                checked={this.props.torch || false}
                                containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 }}
                                textStyle={{ fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                                onPress={() => {
                                    this.props.updateTorch(!this.props.torch);
                                }}
                            />
                        </View>
                        <View style={{margin: 15}}>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
    torch: state.settings.torch
});

const mapDispatchToProps = (dispatch) => {
    return ({
        updateTorch: bindActionCreators(updateTorch, dispatch),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);