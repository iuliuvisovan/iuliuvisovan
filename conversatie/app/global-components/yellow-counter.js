import React from 'react'
import { View, Platform } from 'react-native'
import { Label } from '../global'

export default YellowCounter = (props) => (
  <View
    style={{
      backgroundColor: '#f0b323',
      borderRadius: 20,
      marginLeft: Platform.OS == 'ios' ? 6 : 8,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginTop: Platform.OS == 'ios' ? -4 : -3,
    }}
  >
    <Label weight={500} style={{ color: '#131e29', fontSize: 13, marginTop: Platform.OS == 'ios' ? -1 : -2 }}>
      {props.count}
    </Label>
  </View>
)