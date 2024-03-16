/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Footer from '../../components/Footer/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const hotels = [
    {
        id: 1,
        name: 'Vinperl Da Nang',
        score: 9.5,
        rate: 4,
    },
    {
        id: 2,
        name: 'Da Nang Han River',
        score: 9.0,
        rate: 3,
    },
    {
        id: 3,
        name: 'Merry Land Hotel Danang',
        score: 8.0,
        rate: 3,
    },
    {
        id: 4,
        name: 'Royal Family Hotel',
        score: 10.0,
        rate: 5,
    },
];

function ListHotelScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const { location } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SearchHotelScreen')}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.labelHeader}>{location} </Text>
                <Image
                    source={require('../../assets/icon/icon_filter.png')}
                    style={styles.icon}
                />
            </View>
            <ScrollView style={styles.listHotel}>
                {hotels.map(hotel => (
                    <View key={hotel.id} style={styles.itemHotel}>
                        <Image
                            source={require('../../assets/image/hotel/vinperl-da-nang.jpg')}
                            style={styles.hotelImage}
                        />

                        <View style={styles.hotel}>
                            <View style={styles.hotelInfor}>
                                <Text style={styles.hotelName}>{hotel.name}</Text>
                                <Text style={styles.hotelRate}>{hotel.score}</Text>
                            </View>
                            <View style={styles.hotelStar}>
                            {[...Array(hotel.rate)].map((_, index) => (
                                    <Image
                                        key={index}
                                        source={require('../../assets/icon/icon_star.png')}
                                        style={styles.iconStar}
                                    />
                                ))}
                                {[...Array(5 - hotel.rate)].map((_, index) => (
                                    <Image
                                        key={index}
                                        source={require('../../assets/icon/icon_star.png')}
                                        style={styles.iconStarEmpty}
                                    />
                                ))}
                            </View>
                            <View style={styles.hotelAddress}>
                                <Image
                                    source={require('../../assets/icon/icon_gps.png')}
                                />
                                <Text style={styles.addressName}> Đà Nẵng</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
    },
    labelHeader: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#24BAEC',
    },
    icon: {
        tintColor: '#24BAEC',
        width: 32,
        height: 32,
    },
    listHotel: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 52,
    },
    itemHotel: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 20,
    },
    hotelImage: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    hotel: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    hotelInfor: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    hotelName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    hotelRate: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#24BAEC',
    },
    hotelStar: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconStar: {
        tintColor: '#ECE300',
        marginRight: 5,
    },
    iconStarEmpty: {
        marginRight: 5,
    },
    hotelAddress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    addressName: {
        fontSize: 24,
        color: 'black',
    },
});

export default ListHotelScreen;
