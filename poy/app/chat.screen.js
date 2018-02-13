import React, {Component} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import {
  Header,
  Icon,
  Button,
  Label,
  vw,
  Alert,
  AnimateNext
} from './global';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ChatService from './chat.service'

export default class Chat extends Component {
  state = {
    name: "Ionuț SALAM",
    messages: [],
    currentMessage: ""
  }

  async componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollToBottom);
    const messages = ChatService.getConversation();
    this.setState({messages});
    this.scrollToBottom();
    this.input.focus();
    Alert(await ChatService.auth());
  }

  sendMessage = () => {
    AnimateNext();
    const {messages, currentMessage} = this.state;
    this.setState({
      messages: [ ...this.state.messages, { id: 2, type: "sent", messageText: this.state.currentMessage } ],
      currentMessage: ""
    });
    setTimeout(this.scrollToBottom, 0);
    ChatService.sendMessage(this.state.currentMessage);
  }

  scrollToBottom = () => {
    setTimeout(() => {
      this.scrollView.scrollToEnd({animated: false})    
    }, 0);
  }

  render() {
    const {image, messages} = this.state;
    return (
      <View style={{ flex: 1,backgroundColor: '#fff' }}>
        <Header title={`${this.state.name}`} bgColor="#333f48" description="La 0.4km"/>
        <ScrollView ref={scrollView => this.scrollView = scrollView}>
          <View
            style={{
            flex: 1,
            paddingVertical: 15
          }}>
            <View
              style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Label
                style={{
                color: '#7c878e',
                fontSize: 10,
                marginBottom: 10
              }}>
                Azi
              </Label>
            </View>
            {this
              .state
              .messages
              .map(message => (<Message
                key={message.id}
                type={message.type}
                messageText={message.messageText}/>))}
          </View>
        </ScrollView>
        <View
          style={{
          flexDirection: 'row',
          borderTopColor: '#7c878e33',
          borderTopWidth: 1,
          alignItems: 'center'
        }}>
          <TextInput
            style={{
            fontSize: 15,
            paddingLeft: 20,
            fontFamily: 'cera',
            width: vw - 50,
            height: 60,
            backgroundColor: '#fff'
          }}
            ref= {(el) => { this.input = el; }}
            onChangeText={currentMessage => this.setState({currentMessage})}
            value={this.state.currentMessage}
            placeholder="Scrie.."
            placeholderTextColor="#7c878e"
            underlineColorAndroid="transparent"/>
          <Button onPress={this.sendMessage}>
            <Icon color={this.state.currentMessage.trim().length ? "#ffa700" : "#7c878e"} name="navigate" size={30}/>
          </Button>
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}

const Message = (props) => (
  <View style={{ alignItems: props.type == 'received' ? 'flex-start' : 'flex-end' }}>
    <View
      style={{
      alignItems: props.type == 'received' ? 'flex-start': 'flex-end',
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
