import React, { Component } from 'react';
import { View, StatusBar, AsyncStorage, Image } from 'react-native';
import { Font } from 'expo';
import ChatScreen from './app/chat.screen'
import SocketIOClient from 'socket.io-client';


export default class App extends Component {
  state = {
    isFontLoaded: false,
  };

  componentWillMount = async () => {
    await Font.loadAsync({
      'cera': require('./app/resources/fonts/Cera.otf'),
      'cera300': require('./app/resources/fonts/Cera300.otf'),
      'cera500': require('./app/resources/fonts/Cera500.otf'),
      'icomoon': require('./app/resources/icomoon.ttf')
    });
    this.setState({ isFontLoaded: true });
    this.socket = SocketIOClient('http://localhost:3000');
  }

  render() {
    const { isFontLoaded, isLoggedIn } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        {isFontLoaded ? <ChatScreen/> : null}
      </View>
    );
  }
}
