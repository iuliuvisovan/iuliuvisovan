import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Label, } from '../global'

export default (props) => !props.visible ? null : (
    <View style={[styles.wrapper]} pointerEvents="none" >
        <View style={[styles.box, { backgroundColor: props.backgroundColor || '#f0b323' }]}>
            <Label
                weight={500}
                style={{
                    color: props.backgroundColor ? "#fff" : "rgba(19,30,41, 1)",
                    textAlign: 'center',
                    fontSize: 14,
                }}
            >
                {props.text}
            </Label>
            {props.textSmall &&
                <Label
                    style={{
                        color: "rgba(19,30,41, 1)",
                        textAlign: 'center',
                        fontSize: 11,
                        marginTop: 5
                    }}
                >
                    {props.textSmall}
                </Label>
            }
        </View>
    </View >
)

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10
    },
    box: {
        padding: 30,
        paddingVertical: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});