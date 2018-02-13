import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from '../global'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default (officeStatus, isSelected, isConnection) => {
  switch (officeStatus) {
    case 'available':
      return isSelected
        ? (
          <View>
            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
            <MarkerIcon yellow isConnection={isConnection} />
            <Icon name="booking-full" color="#0f171f" size={40} />
          </View>
        )
        : (
          <View>
            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
            <MarkerIcon isConnection={isConnection} />
            <Icon name="booking-full" color="#f0b323" size={30} />
          </View>
        )


    default:
      return isSelected
        ? (
          <View>
            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
            <MarkerIcon yellow isConnection={isConnection} />
            <Icon name="booking-full" color="#0f171f" size={40} />
          </View>
        )
        : (
          <View>
            <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
            <MarkerIcon isConnection={isConnection} />
            <Icon name="booking-full" color="#333f48" size={30} />
          </View>
        )
  }
}

const MarkerIcon = (props) => props.isConnection ? (
  <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', zIndex: 10, alignItems: 'center' }}>
    <Icon style={{ marginBottom: props.yellow ? 3 : 2, elevation: 10 }} color={props.yellow ? '#f0b323' : '#0f171f'} name="menu-connections" size={props.yellow ? 14 : 12} />
  </View>
)
  :
  (
    <View pointerEvents="box-none" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 10 }}>
      <View style={{
        borderWidth: 1.7,
        borderColor: props.yellow ? '#f0b323' : '#0f171f',
        backgroundColor: props.yellow ? '#f0b323' : '#0f171f',
        borderRadius: 4,
        width: props.yellow ? 16 : 13,
        position: 'absolute',
        top: props.yellow ? 16 : 12,
        marginLeft: -2,
        left: props.yellow ? 14 : 10,
        zIndex: 11,
        height: 0.5,
        transform: [{ rotate: '-45deg' }]
      }}
      />
      <View style={{
        borderWidth: 1.7,
        borderColor: props.yellow ? '#f0b323' : '#131e29',
        backgroundColor: props.yellow ? '#f0b323' : '#131e29',
        borderRadius: 4,
        width: props.yellow ? 10 : 8,
        position: 'absolute',
        top: props.yellow ? 18 : 14,
        left: props.yellow ? 7 : 5,
        zIndex: 11,
        height: 0.5,
        transform: [{ rotate: '43deg' }]
      }}
      />
    </View >
  )

const styles = StyleSheet.create({
  markerSelected: {
    width: 132 / 4,
    height: 160 / 4,
  },
  markerBasic: {
    width: 128 / 5,
    height: 160 / 5
  },
  markerDisabled: {
    width: 128 / 4,
    height: 160 / 4
  },
});
