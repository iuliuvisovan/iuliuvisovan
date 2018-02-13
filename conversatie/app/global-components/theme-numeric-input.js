import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { vw } from '../global'

export default class ThemeNumericInput extends Component {
    state = {
        value: (this.props.initialValue || '').toString()
    }

    onChangeText = (value) => {
        if (!(/^\d+$/.test(value))) {
            value = value.replace(/[^\d]/g, '');
        }
        if (!+value)
            value = "";
        this.setState({ value });
    }

    render() {
        return (
            <TextInput
                ref={input => this.input = input}
                style={{
                    borderColor: this.state.value.trim() ? '#131e29' : '#fff',
                    borderWidth: 2,
                    borderRadius: 3,
                    height: 55,
                    width: '100%',
                    padding: 15,
                    paddingBottom: 16,
                    fontFamily: this.state.value.trim() ? 'cera300' : 'cera',
                    fontSize: this.state.value.trim() ? 18 : 14,
                    color: '#131e29'
                }}
                keyboardType="numeric"
                value={this.state.value}
                defaultValue={(this.props.initialValue || '').toString()}
                placeholder={this.props.placeholder}
                onChangeText={this.onChangeText}
                placeholderTextColor="#fff"
                onEndEditing={e => this.props.onValueUpdate(+e.nativeEvent.text)}
            />)
    }

}