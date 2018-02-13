import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, View, Image} from 'react-native'
import {Icon, Label, vw, vh} from '../global'

export default class LoadingLayout extends Component {
    render() {
        if (!this.props.visible) 
            return null;
        return (
            <View style={[styles.wrapper]}>
                <View
                    style={[
                    styles.box, {
                        backgroundColor: this.props.inverted
                            ? 'rgba(240, 179, 35, 1)'
                            : 'rgba(19,30,41,0.85)'
                    },
                    this.props.style
                ]}>
                    <Icon
                        color={(this.props.inverted
                        ? "rgba(19,30,41, 1)"
                        : "#f0b323")}
                        name="w-logo"
                        size={50}/>
                    <Label
                        style={{
                        color: (this.props.inverted
                            ? "rgba(19,30,41, 1)"
                            : "#f0b323"),
                        textAlign: 'center',
                        fontSize: 12,
                        lineHeight: 18,
                        marginTop: 20,
                    }}>
                        {this.props.text}
                    </Label>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        height: 150,
        width: 150,
        padding: 15,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});