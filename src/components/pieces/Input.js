import React from 'react';
import { View, StyleSheet, TextInput, Picker } from 'react-native';
import { Button, Text, Icon, Input, Divider, CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  baseInput: {
    paddingVertical: 6,
  },
});

export const CustomInput = ({ style, value, label, onChange }) => {
    if(value === null || value === undefined) {
        value = '';
    }
    return (
            <Input
                value={value.toString()}
                onChange={onChange}
                keyboardType="default"
                returnKeyType="done"
                containerStyle={{ width: '90%'}}
                label={label}
                labelStyle={{ marginTop: 8, fontWeight: 'normal', fontSize: 12, color: 'rgba(0, 0, 0, .38)' }}
                inputContainerStyle={{borderBottomWidth: StyleSheet.hairlineWidth}}
                inputStyle={{marginLeft: 0, height: 35}}
                onSubmitEditing={() => {  }}
            />
    );
};

export const AppInput = ({ children, value, onChange, ...props }) => (
  <BaseInput {...props}>
    <TextInput value={value} onChangeText={onChange} />
  </BaseInput>
);

export const AppSelect = ({ children, value, onChange, items, ...props }) => (
  <BaseInput {...props}>
    <Picker selectedValue={value} onValueChange={onChange}>
      {items.map(item => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </BaseInput>
);