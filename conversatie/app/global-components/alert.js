import React, { Component } from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, Alert } from 'react-native'

export default alert = (title, text, cancelable, okButtonText) => new Promise((resolve, reject) => {
  const buttons = [{ text: okButtonText || 'Ok', onPress: resolve }];
  if (cancelable) {
    buttons.unshift({ text: 'Cancel' });
  }
  Alert.alert(title, text, buttons, { cancelable });
})