import React from 'react';
import { Text, Platform } from 'react-native'

const Label = (props) => {
    const fontFamily = (props.weight == 500 ? 'cera500' : props.weight == 300 ? 'cera300' : 'cera');
    return (
        <Text
            {...props}
            style={[{
                fontFamily,
                color: '#fff',
                backgroundColor: 'transparent',
                marginBottom: Platform.OS == 'ios'
                    ? -3
                    : 0,
            }, props.style]}

        />)
}


export default Label;