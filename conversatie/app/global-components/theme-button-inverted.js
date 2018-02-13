import React from 'react'
import { View } from 'react-native'
import Label from './label';
import Button from './button';

export default (props) => (
    <Button {...props} onPress={props.disabled ? () => { } : props.onPress} style={{}}>
        <View
            style={[
                {
                    backgroundColor: props.disabled ? '#FFD866' : '#131e29',
                    borderRadius: 3,
                    height: 55,
                    width: '100%',
                    zIndex: props.disabled ? 0 : 1000,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                props.style
            ]}
        >
            {props.leftImage &&
                <View style={{ width: 35, marginLeft: 15 }}>
                    {props.leftImage}
                </View>
            }
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <Label weight={500} numberOfLines={1} style={{ color: props.textColor || '#f0b323' }}>
                    {props.text.toUpperCase()}
                </Label>
            </View>
        </View>
    </Button>
)