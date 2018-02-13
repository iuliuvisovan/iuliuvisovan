import React, { Component } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {
  Header,
  Icon,
  Label,
  vw,
  Alert,
  AnimateNext
} from './global';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ChatService from './chat.service'

export default class Chat extends Component {
  state = {
    name: "John DOE",
    messages: [],
    currentMessage: "",
    isLoaded: false,
    userId: undefined,
    onlineUsers: []
  }

  async componentDidMount() {
    let userId = await AsyncStorage.getItem('userId');
    if (!userId || !userId.length) {
      userId = (+new Date()).toString();
      AsyncStorage.setItem('userId', userId);
    }
    this.setState({ userId });

    ChatService.init();
    ChatService.handleEvents({
      'room history': this.onChatMessage,
      'chat message': this.onChatMessage,
      'join': this.init,
      'online users update': this.onOnlineUsersUpdate,
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollToBottom);
    ChatService.checkIn(userId, 'Telefon', 'start');
    this.setState({ isLoaded: true });
  }

  onOnlineUsersUpdate = (users) => {
    console.log('users', users);
    this.setState({ onlineUsers: users.filter(x => x.userId != this.state.userId).map(x => x.name) });
  }

  init = async (params) => {
    // console.log(params);
    // if (this.state.isLoaded)
    //   return;
    // else {
    //   ChatService.checkIn('dasdasdas', 'CARTOFEL! :D', 'start');
    //   this.setState({ isLoaded: true });
    // }
  }

  onChatMessage = (message) => {
    if (message.length > 1) {
      message.forEach(x => x.type = x.userId == this.state.userId ? 'sent' : 'received',)
      this.setState({ messages: message });
    } else {
      this.pushMessage(message);
    }
    this.scrollToBottom();
  }

  pushMessage = (message) => {
    AnimateNext();
    this.setState({
      messages: [...this.state.messages, {
        id: 2,
        type: message.userId == this.state.userId ? 'sent' : 'received',
        messageText: message.messageText
      }],
    });
  }

  sendMessage = (message) => {
    const { messages, currentMessage } = this.state;
    ChatService.sendMessage(message);
    this.setState({ currentMessage: "" });
    setTimeout(this.scrollToBottom, 0);
  }

  scrollToBottom = () => {
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated: false })
    }, 0);
  }

  render() {
    const { image, messages } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title={this.state.onlineUsers.length ? this.state.onlineUsers.join(', ') : '...'} bgColor="#333f48" description="La 0.4km" />
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <View style={{ flex: 1, paddingVertical: 15 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Label style={{ color: '#7c878e', fontSize: 10, marginBottom: 10 }}>
                Azi
              </Label>
            </View>
            {this
              .state
              .messages
              .map((message, i) => (<Message
                key={i}
                type={message.type}
                messageText={message.messageText} />))}
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', borderTopColor: '#7c878e33', borderTopWidth: 1, alignItems: 'center' }}>
          <TextInput style={{ fontSize: 15, paddingLeft: 20, fontFamily: 'cera', width: vw - 60, height: 60, backgroundColor: '#fff' }}
            ref={(el) => { this.input = el; }}
            onChangeText={currentMessage => this.setState({ currentMessage })}
            value={this.state.currentMessage}
            placeholder="Scrie.."
            onSubmitEditing={() => this.state.currentMessage.trim().length && this.sendMessage(this.state.currentMessage.trim())}
            placeholderTextColor="#7c878e"
            underlineColorAndroid="transparent" />
          <TouchableOpacity disabled={!this.state.currentMessage.trim().length} onPress={() => this.sendMessage(this.state.currentMessage.trim())} style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
            <Icon color={this.state.currentMessage.trim().length ? "#ffa700" : "#7c878e"} name="send" size={27} />
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
      </View >
    );
  }
}

const Message = (props) => (
  <View style={{ alignItems: props.type == 'received' ? 'flex-start' : 'flex-end' }}>
    <View
      style={{
        alignItems: props.type == 'received' ? 'flex-start' : 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        width: vw / 1.8,
        marginLeft: 15,
        marginTop: 5,
        marginRight: 15
      }}>
      <View
        style={{
          flex: -1,
          backgroundColor: props.type == 'received' ? '#008744' : '#ffa700',
          borderRadius: 5,
          padding: 10,
        }}>
        {props.image}
        <Label
          style={{
            fontSize: 14,
            color: '#fff',
            lineHeight: 20
          }}>
          {props.messageText}
        </Label>
      </View>
    </View>
  </View>
)
