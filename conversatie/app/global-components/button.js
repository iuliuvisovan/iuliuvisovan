import React from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'

export default (props) => {
    const rippleColor = props.darkRipple ? '51,63,72' : '255,255,255';
    if (Platform.OS === 'ios')
        return (<TouchableOpacity {...props} />)
    return (
    <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(props.opaque ? `rgba(${rippleColor}, 1)` : `rgba(${rippleColor}, 0.2)`, false)}
        {...props}
    />)
}