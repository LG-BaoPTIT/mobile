/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../components/Footer/Footer';

function ListRoomScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { hotel, location } = route.params;
    const rooms = hotel.rooms;

    const shortenName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.slice(0, maxLength - 3) + '...';
        } else {
            return name;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HotelDetailScreen', { location: location, hotelId:hotel.id })}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.iconHeader}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>{shortenName(hotel.name, 30)} </Text>
            </View>
            <ScrollView style={styles.listRoom}>
                {rooms.map(room => (
                    <View key={room.id} style={styles.itemRoom}>
                        <Image
                            source={require('../../assets/image/room/room.png')}
                            style={styles.roomImage}
                        />
                        <Text style={styles.roomName}>{room.name}</Text>
                        <View style={styles.room}>
                            <View style={styles.leftBlock}>
                                <View style={styles.roomInformation}>
                                    <Image
                                        source={require('../../assets/icon/icon_home.png')}
                                        style={styles.informationIcon}
                                    />
                                    <Text style={styles.informationValue}> {room.area} m²</Text>
                                </View>
                                <View style={styles.roomInformation}>
                                    <Image
                                        source={require('../../assets/icon/icon_people.png')}
                                        style={styles.informationIcon}
                                    />
                                    <Text style={styles.informationValue}> {room.numberPeople} người</Text>
                                </View>
                                <View style={styles.roomInformation}>
                                    <Image
                                        source={require('../../assets/icon/icon_bed.png')}
                                        style={styles.informationIcon}
                                    />
                                    <View>
                                        {room.bigBed > 0 && <Text style={styles.informationValue}> {room.bigBed} giường lớn</Text>}
                                        {room.smallBed > 0 && <Text style={styles.informationValue}> {room.smallBed} giường nhỏ</Text>}
                                    </View>
                                </View>
                                <View style={styles.roomInformation}>
                                    <Image
                                        source={require('../../assets/icon/icon_bathtub.png')}
                                        style={styles.informationIcon}
                                    />
                                    <Text style={styles.informationValue}> {room.bathtub ? 'Có bồn tắm' : 'Vòi tắm đứng'}</Text>
                                </View>
                            </View>
                            <View style={styles.rightBlock}>
                                <View style={styles.roomPrice}>
                                    <Text style={styles.priceValue}>VND {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                                    <Text style={styles.roomPerNight}>/phòng/đêm</Text>
                                </View>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookingRoomScreen', {hotel: hotel, room: room, location: location})}>
                                    <Text style={styles.buttonLabel}> Chọn </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#24BAEC',
        width: '100%',
        height: '100%',
    },
    header: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
    },
    labelHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#24BAEC',
    },
    iconHeader: {
        tintColor: '#24BAEC',
        width: 40,
        height: 40,
        marginRight: 20,
    },
    listRoom: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        marginBottom: 80,
    },
    itemRoom: {
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    roomImage: {
        height: 140,
        overflow: 'hidden',
    },
    room: {
        display: 'flex',
        flexDirection: 'row',
    },
    leftBlock: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
    },
    roomInformation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    roomName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginLeft: 10,
    },
    informationIcon: {
        width: 32,
        height: 32,
        tintColor: '#04CDFA',
        marginRight: 10,
    },
    informationValue: {
        color: 'black',
        fontSize: 16,
    },
    rightBlock: {
        marginLeft: 30,
        padding: 10,
        alignItems: 'flex-end',
    },
    roomPrice: {
        marginTop: 40,
        alignItems: 'flex-end',
    },
    priceValue: {
        color: '#04CDFA',
        fontSize: 20,
    },
    roomPerNight: {
        fontSize: 16,
        color: 'black',
        opacity: 0.6,
    },
    button: {
        width: 90,
        height: 40,
        backgroundColor: '#04CDFA',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    buttonLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
export default ListRoomScreen;
