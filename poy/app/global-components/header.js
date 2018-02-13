import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform
} from 'react-native';

import { Icon, Button, Label } from '../global'

export default class Header extends Component {
  render() {
    return (
      <View style={styles.this}>
        <View style={{ flex: 1, paddingLeft: 5, paddingRight: 15, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', marginBottom: Platform.OS == 'ios' ? -8 : 0 }}>
            <Label weight={300} numberOfLines={1} style={{ fontSize: 20, color: '#fff' }}>
              {this.props.title}
            </Label>
          </View>
          {this.props.description &&
            <Label style={{ marginLeft: 1, fontSize: 10, marginTop: Platform.OS == 'ios' ? 6 : 0 }}>
              {this.props.description}
            </Label>
          }
        </View>
        {this.props.rightButton &&
          <View>
            {this.props.rightButton}
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  this: {
    elevation: 2,
    paddingTop: 25,
    backgroundColor: '#d62d20',
    height: Platform.OS == 'ios' ? 70 : 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  }
});