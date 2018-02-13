import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Button, Label, vw, vh, Icon } from '../global';

export default class ThemeDropdown extends Component {
    state = {
        isOpen: false,
        selectedValue: this.props.initialValue
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    selectValue(value, text) {
        this.setState({ isOpen: false, selectedValue: value });
        this.props.onValueChange(value, text);
    }

    render() {
        const mainColor = this.props.color || '#fff';
        const { selectedValue } = this.state;
        return (
            <View pointerEvents={this.props.disabled ? 'none' : 'auto'} style={[{ width: vw - 30, marginHorizontal: 15, height: 600, zIndex: this.state.isOpen ? 1100 : 999, paddingHorizontal: 1, opacity: this.props.disabled ? 0.25 : 1 }, this.props.style]}>
                <Button onPress={() => { this.setState({ isOpen: !this.state.isOpen }); this.props.onPress && this.props.onPress() }}>
                    <View style={[styles.this, { borderColor: mainColor, borderBottomRightRadius: this.state.isOpen ? 0 : 3, borderBottomLeftRadius: this.state.isOpen ? 0 : 3 }]}>
                        <Label weight={300} style={{ color: mainColor }}>
                            {selectedValue ? this.props.options.find(x => x.value == selectedValue).text : this.props.caption || 'Select..'}
                        </Label>
                        <Icon
                            style={{ transform: [{ rotate: '90deg' }], position: 'absolute', right: 15 }}
                            name="arrow"
                            size={14}
                            color={mainColor}
                        />
                    </View>
                </Button>
                {this.state.isOpen &&
                    <ScrollView style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: mainColor,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderRadius: 3,
                        position: 'absolute',
                        maxHeight: 150,
                        marginLeft: 1,
                        top: 51,
                        backgroundColor: this.props.bgColor || '#131e29',
                        zIndex: 1500,
                    }}
                    >
                        {this.props.options && this.props.options.map(x => (
                            <TouchableOpacity key={x.value} style={{ paddingLeft: 15, paddingVertical: 15, width: '100%' }} onPress={() => this.selectValue(x.value, x.text)}>
                                <Label weight={300} style={{ color: mainColor }}>
                                    {x.text}
                                </Label>
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    this: {
        borderWidth: 1.7,
        borderRadius: 3,
        padding: 24,
        paddingHorizontal: 15,
        justifyContent: 'center',
        height: 50,
    }
})