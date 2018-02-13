import React, { Component } from 'react';
import { TouchableOpacity, View, Platform, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Icon, vw, Button } from '../global'

export default class TopRightAction extends Component {
    navigate = (routeName) => {
        this.props.tabNavigator.dispatch(NavigationActions.navigate({ routeName }));
    }

    state = {
        showsGrid: false
    }

    render() {
        switch (this.props.currentPage) {
            case 'More':
                return (<View />);
            case 'Messages':
                return (
                    <TouchableOpacity onPress={() => this.props.stackNavigation.navigate('NewMessage')}>
                        <Icon style={{ marginHorizontal: 15, marginLeft: 0 }} color="#f0b323" name="send-message" size={25} />
                    </TouchableOpacity>
                )
            case 'Booking':
                return (
                    <GridToggle
                        showsGrid={this.state.showsGrid}
                        onGridClick={() => {
                            this.setState({ showsGrid: !this.state.showsGrid });
                            this.props.onClick(!this.state.showsGrid);
                        }}
                    />
                )
            default:
                return (
                    <TouchableOpacity onPress={() => this.navigate('Notifications')}>
                        <Icon style={{ marginHorizontal: 15, marginLeft: 0 }} color="#f0b323" name="menu-notifications" size={25} />
                    </TouchableOpacity>
                )
        }
    }
}


const GridToggle = (props) => <Button onPress={props.onGridClick}>
    <View style={{ marginRight: 12, marginLeft: 5 }}>
        {props.showsGrid ? <Icon color="#7c878e" size={23} name="map" /> :
            <Icon color="#7c878e" size={23} name="grid" />}
    </View>
</Button>


const styles = StyleSheet.create({
    buttonLabel: {
        color: '#7c878e',
        fontSize: 13,
        marginLeft: 10
    },
    button: {
        padding: 10,
        paddingVertical: 10,
        borderRadius: 4,
        marginRight: Platform.OS == 'ios' ? 10 : 0,
        backgroundColor: Platform.OS == 'ios' ? 'rgba(26, 35, 47, 0.7)' : '#28343c',
    },
    rowAligned: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: Platform.OS == 'ios' ? 'flex-start' : 'space-between',
        marginBottom: 5
    },
    this: {
        backgroundColor: Platform.OS == 'ios' ? 'transparent' : '#333f48',
        width: vw,
        paddingHorizontal: 10,
        paddingTop: 10
    }
});