import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, Image, YellowBox } from 'react-native';
import { Font } from 'expo';
import ChatScreen from './app/chat.screen'
import io from 'socket.io-client';
import ChatService from './app/chat.service'


export default class App extends Component {
  state = {
    isLoaded: false
  };

  componentWillMount = async () => {
    await Font.loadAsync({
      'cera': require('./app/resources/fonts/Cera.otf'),
      'cera300': require('./app/resources/fonts/Cera300.otf'),
      'cera500': require('./app/resources/fonts/Cera500.otf'),
      'icomoon': require('./app/resources/icomoon.ttf')
    });
    YellowBox.ignoreWarnings(['Setting']);
    this.setState({ isLoaded: true });
  }

  render() {
    const { isLoaded, isLoggedIn } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {isLoaded ? <ChatScreen/> : null}
      </View>
    );
  }
}
