import React from 'react'
import { Platform, View } from 'react-native'
import Button from './button';
import Label from './label';

export default (props) => (
    <Button opaque {...props} style={{}}>
        <View
            style={[
                {
                    backgroundColor: props.disabled ? '#333F48' : '#f0b323',
                    borderRadius: 3,
                    height: 55,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 5
                },
                props.style
            ]}
        >
            {props.hasPlus &&
                <Label style={{ fontSize: 30, color: "#f0b323", marginRight: 5, marginBottom: Platform.OS == 'ios' ? -5 : 0 }}>
                    +
                </Label>
            }
            <Label weight={500} style={[{ color: '#131e29', textAlign: 'center' }, props.labelStyle]}>
                {props.text.toUpperCase()}
            </Label>
        </View>
    </Button >
)