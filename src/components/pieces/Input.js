import React from 'react';
import { View, StyleSheet, TextInput, Picker } from 'react-native';
import { Input } from 'react-native-elements';

export const CustomInput = ({ style, value, label, onChange, editable = true, keyboardType = 'default' }) => {
    if(value === null || value === undefined) {
        value = '';
    }
    inputStyle = editable? {marginLeft: 0, height: 35, } : {marginLeft: 0, height: 35, color: 'gray' }
    return (
            <Input
                value={value.toString()}
                onChange={onChange}
                keyboardType={keyboardType}
                returnKeyType="done"
                editable={editable}
                containerStyle={{ width: '90%'}}
                label={label}
                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                inputStyle={inputStyle}
                onSubmitEditing={() => {  }}
                autoCorrect={false}
            />
    );
};