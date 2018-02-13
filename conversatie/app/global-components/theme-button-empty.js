import React, { Component } from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import Label from './label';
import Button from './button';

export default (props) => (
    <Button darkRipple {...props} onPress={props.disabled ? () => { } : props.onPress}>
        <View
            style={[
                {
                    borderWidth: 2,
                    borderColor: props.disabled ? '#FFD866' : '#131e29',
                    backgroundColor: 'transparent',
                    borderRadius: 3,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                props.style
            ]}
        >
            <Label weight={500} style={{ color: props.disabled ? '#FFD866' : '#131e29' }}>
                {props.text.toUpperCase()}
            </Label>
        </View>
    </Button>
)