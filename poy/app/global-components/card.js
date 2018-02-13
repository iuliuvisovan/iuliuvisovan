import React from 'react';
import { View, Image, Platform, TouchableOpacity } from 'react-native'
import { Label, LocalNumber, vw, Icon, Resize } from '../global'
import ReviewRating from '../screens/booking/review-rating'
import moment from 'moment'

const Card = (props) => {
    let firstDescription;
    if (props.type == 'event')
        firstDescription = `${props.data.date} • ${props.data.location}`;
    if (props.type == 'location')
        firstDescription = `${LocalNumber(props.data.distance)} km away`
    if (props.type == 'heroProfile' && props.data.positions && props.data.positions[0])
        firstDescription = props.data.positions[0].title
    let name;
    if (props.type == 'heroProfile')
        name = `${props.data.firstName} ${props.data.lastName}`
    if (props.type == 'event' || props.type == 'location')
        name = props.data.name
    return (
        <View style={{ marginVertical: 3, flexDirection: 'row', padding: 15, paddingVertical: 16, backgroundColor: '#0f171f' }}>
            <Image
                style={{ width: 60, height: 60, borderRadius: 3, position: 'absolute', left: 15, top: 15 }}
                source={{ uri: 'https://i.imgur.com/SFRxsS3.png' }}
            />
            {props.type == 'event' && <Image style={{ width: 60, height: 60, borderRadius: 3 }} source={props.data.imageUrl} />}
            {props.type == 'location' && <Image style={{ width: 60, height: 60, borderRadius: 3 }} source={{ uri: Resize(props.data.imageUrl) }} />}
            {props.type == 'heroProfile' && (
                <Image
                    style={{ width: 60, height: 60, borderRadius: 3 }}
                    source={{ uri: Resize(props.data.profilePictureUrl) }}
                />)}
            <View style={{ marginLeft: 15 }}>
                <Label
                    numberOfLines={2}
                    style={{
                        color: '#fff',
                        fontSize: 16,
                        width: vw - 100,
                        paddingRight: 20,
                        lineHeight: 17,
                    }}
                >
                    {name}
                </Label>
                {firstDescription &&
                    <Label
                        numberOfLines={1}
                        style={{
                            color: '#7c868d',
                            fontSize: 13,
                            width: props.type == 'heroProfile' ? vw - 135 : vw - 100,
                            paddingRight: 20,
                            marginTop: 2,
                            overflow: 'hidden',
                            lineHeight: 17,
                        }}
                    >
                        {firstDescription}
                    </Label>
                }
                <Label
                    numberOfLines={1}
                    style={{
                        color: props.type == 'location' ? '#fff' : '#7c868d',
                        fontSize: 13,
                        width: vw - 100,
                        paddingRight: 20,
                        overflow: 'hidden',
                        lineHeight: 17
                    }}
                >
                    {props.type == 'heroProfile' && `${LocalNumber(props.data.distance)} km away`}
                    {props.type == 'event' && props.data.people}
                    {(props.type == 'location' && props.data.isActiveBooking) &&
                        (`${'Starts in '}${moment.duration(moment().diff(moment(props.data.startTime))).humanize()}`)
                    }
                </Label>
                {(props.type == 'location' && !props.data.isActiveBooking) && (
                    <ReviewRating votes={(props.data.rating || {}).votes} average={(props.data.rating || {}).average} />)}
                {(props.type == 'hero' || props.type == 'location') &&
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 10,
                            width: 40,
                            height: 40,
                            top: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f0b323',
                            borderRadius: 30
                        }}
                        onPress={props.buttonAction}
                    >
                        {props.type == 'location' ?
                            !props.data.isActiveBooking ?
                                <Icon name="quick-booking" size={24} color="#0f171f" />
                                : <Icon name="navigate" color="#f0b323" size={25} />
                            : <Icon size={20} name="send-message" color="#0f171f" />
                        }
                    </TouchableOpacity>}
            </View>
        </View>
    )
}


export default Card;