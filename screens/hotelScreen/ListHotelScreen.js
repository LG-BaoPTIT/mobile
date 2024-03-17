/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../components/Footer/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const data = [
    {
        id: 1,
        name: 'Royal Family Hotel',
        score: 9.5,
        rate: 5,
        minPrice: 2000000,
        maxPrice: 10000000,
    },
    {
        id: 2,
        name: 'Vinperl Da Nang',
        score: 9.5,
        rate: 4,
        minPrice: 400000,
        maxPrice: 8000000,
    },
    {
        id: 3,
        name: 'Da Nang Han River',
        score: 9.0,
        rate: 3,
        minPrice: 200000,
        maxPrice: 5000000,
    },
    {
        id: 4,
        name: 'Merry Land Hotel Danang',
        score: 8.0,
        rate: 3,
        minPrice: 350000,
        maxPrice: 6000000,
    },
];

function ListHotelScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const { location, minPrice, maxPrice, selectedRatings } = route.params;
    const hotels = data.filter(hotel => {
        return selectedRatings.includes(hotel.rate) && !(hotel.minPrice > maxPrice) && !(hotel.maxPrice < minPrice);
    });
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('SearchHotelScreen')}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>{location.name} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('FilterHotelScreen', { location: location })}>
                    <Image
                        source={require('../../assets/icon/icon_filter.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.listHotel}>
                {hotels.map(hotel => (
                    <TouchableOpacity key={hotel.id} onPress={() => navigation.navigate('HotelDetailScreen', { location: location })}>
                        <View style={styles.itemHotel}>
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
                    </TouchableOpacity>
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
