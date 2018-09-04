/**
 * Created by kenji on 4/9/18.
 */
import React from 'react';
import { Button, View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {createStackNavigator,} from 'react-navigation';
import GlobalStyle from '../styles/GlobalStyle';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={GlobalStyle.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox
                        title='RE-ORDER'
                        checked={true}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            alert('test');
                        }}
                    />
                    <CheckBox
                        title='ALLOW DISCOUNT'
                        checked={false}
                        containerStyle={{backgroundColor: 'rgba(0,0,0,0)',borderWidth: 0}}
                        textStyle={{fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)'}}
                        onPress={() => {
                            alert('test');
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default createStackNavigator({
    Home: HomeScreen,
});

