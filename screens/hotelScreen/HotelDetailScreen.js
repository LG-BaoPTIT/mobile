/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../components/Footer/Footer';

const hotel = {
    id: 1,
    name: 'Royal Family Hotel',
    score: 9.5,
    rate: 5,
    minPrice: 2000000,
    maxPrice: 10000000,
    comments: [{
        id: 1,
        content: '10 diem khong co nhung',
        score: 10,
        time: '10/03/2024',
        user: {
            name: 'Dung',
        },
    },
    {
        id: 2,
        content: 'dich vu tot',
        score: 9,
        time: '11/03/2024',
        user: {
            name: 'Bao',
        },
    }],
    describe: `Situated in Da Nang, Royal Family Hotel offers elegant and comfortable accommodation with free WiFi access throughout the property. It operates a 24-hour front desk and provides complimentary parking on site.
    The hotel is just 2.1 km from Song Han Bridge and 2.3 km from Cham Museum. My An Beach is 2.7 km away, while Da Nang International Airport is accessible with a 5 km drive. 
    Fitted with tiled flooring, air-conditioned rooms include a desk, wardrobe, electric kettle, minibar and a flat-screen TV with cable/satellite channels. En suite bathroom comes with shower facility, hairdryer and free toiletries.
    At Royal Family Hotel, the friendly staff can assist guests with luggage storage, laundry services and airport shuttle arrangements. A tasty selection of local meals are served at the restaurant.`,
    timeCheckin: '14:00',
    timeCheckout: '12:00',
};

function evaluateHotel(score) {
    if (score >= 9.0) { return 'Xuất sắc'; }
    if (score >= 8.0) { return 'Tốt'; }
    if (score >= 7.0) { return 'Tạm được'; }
    if (score >= 5.5) { return 'Trung bình'; }
    if (score >= 5.5) { return 'Tệ'; }
    return 'Cực tệ';
}

function HotelDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { location } = route.params;

    const [showAllDescribe, setShowAllDescribe] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const toggleDescribe = () => {
        setShowAllDescribe(!showAllDescribe);
    };
    const toggleComment = () => {
        setShowComment(!showComment);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ListHotelScreen', { location: location, minPrice: 0, maxPrice: Infinity, selectedRatings: [1, 2, 3, 4, 5] })}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>{hotel.name} </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ListRoomScreen', { hotel: hotel, location: location })}>
                    <View style={styles.selectRoom}>
                        <Text style={styles.labelSelectRoom}>Chọn phòng</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.hotelDetail}>
                <View style={styles.hotelInformation}>
                    <Image
                        source={require('../../assets/image/hotel/vinperl-da-nang.jpg')}
                        style={styles.hotelImage}
                    />
                    <Text style={styles.label}>{hotel.name}</Text>
                    <View style={styles.hotelStar}>
                        {[...Array(hotel.rate)].map((_, index) => (
                            <Image
                                key={index}
                                source={require('../../assets/icon/icon_star.png')}
                                style={styles.iconStar}
                            />
                        ))}
                    </View>
                    <View style={styles.hotelAddress}>
                        <Image
                            source={require('../../assets/icon/icon_gps.png')}
                            style={styles.iconAddress}
                        />
                        <Text style={styles.addressName}> Đà Nẵng</Text>
                    </View>
                </View>
                <View style={styles.hotelInformation}>
                    <Text style={styles.label}>Xếp hạng và đánh giá</Text>
                    <View style={styles.hotelReview}>
                        <Text style={styles.hotelScore}>{hotel.score}</Text>
                        <Text style={styles.hotelEvaluation}>{evaluateHotel(hotel.score)}</Text>
                    </View>
                    <Text style={styles.totalComment}>Từ {hotel.comments.length} đánh giá</Text>
                    {showComment && <ScrollView style={styles.listComment}>
                        {hotel.comments.map(comment => (
                            <View key={comment.id} style={styles.commentContainer}>
                                <Image
                                    source={require('../../assets/hero1.jpg')}
                                    style={styles.userImage}
                                />
                                <View style={styles.commentDetail}>
                                    <View style={styles.comment}>
                                        <View style={styles.commentContent}>
                                            <Text style={styles.userName}>{comment.user.name}</Text>
                                            <Text style={styles.commentScore}>{comment.score}/10</Text>
                                        </View>
                                        <Text style={styles.commentContent}>{comment.content}</Text>
                                    </View>
                                    <Text style={styles.commentTime}>{comment.time}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>}
                    <TouchableOpacity onPress={toggleComment}>
                        <Text style={styles.link}>{showComment ? 'Ẩn' : 'Xem toàn bộ đánh giá'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hotelInformation}>
                    <Text style={styles.label}>Mô tả</Text>
                    <Text numberOfLines={showAllDescribe ? undefined : 4} style={styles.describe}>{hotel.describe}</Text>
                    <TouchableOpacity onPress={() => toggleDescribe()}>
                        <Text style={styles.link}>{showAllDescribe ? 'Ẩn bớt' : 'Xem chi tiết'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hotelInformation}>
                    <Text style={styles.label}>Chính sách lưu trú</Text>
                    <View style={styles.time}>
                        <Image
                            source={require('../../assets/icon/icon_clock.png')}
                            style={styles.timeImage}
                        />
                        <Text style={styles.timeLabel}> Giờ nhận phòng/trả phòng</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <View style={styles.timeDetail}>
                            <Text style={styles.labelDetail}>Giờ nhận phòng</Text>
                            <Text style={styles.valueDetail}>từ {hotel.timeCheckin}</Text>
                        </View>
                        <View style={styles.timeDetail}>
                            <Text style={styles.labelDetail}>Giờ trả phòng</Text>
                            <Text style={styles.valueDetail}>trước {hotel.timeCheckout}</Text>
                        </View>
                    </View>
                </View>
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
        backgroundColor: '#24BAEC',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
    },
    labelHeader: {
        fontSize: 26,
        fontWeight: '300',
        color: 'white',
    },
    icon: {
        tintColor: 'white',
        width: 32,
        height: 32,
    },
    selectRoom: {
        backgroundColor: 'white',
        width: 90,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelSelectRoom: {
        color: '#04CDFA',
        fontSize: 14,
    },
    hotelDetail: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 60,
    },
    hotelInformation: {
        backgroundColor: 'white',
        marginBottom: 2,
    },
    hotelImage: {
        width: '100%',
        height: 140,
    },
    label: {
        color: 'black',
        fontSize: 24,
        marginBottom: 2,
        marginLeft: 5,
    },
    hotelStar: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 5,
        marginBottom: 5,
    },
    iconStar: {
        tintColor: '#ECE300',
        marginRight: 2,
        width: 24,
        height: 24,
    },
    hotelAddress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    iconAddress: {
        width: 32,
        height: 32,
    },
    addressName: {
        color: 'black',
        fontSize: 24,
    },
    hotelReview: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },
    hotelScore: {
        color: '#04CDFA',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 20,
    },
    hotelEvaluation: {
        color: '#04CDFA',
        fontSize: 18,
        fontWeight: '300',
    },
    totalComment: {
        fontSize: 18,
        color: 'black',
        opacity: 0.6,
        marginBottom: 10,
    },
    link: {
        color: '#1225D7',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    describe: {
        fontSize: 14,
        color: 'black',
        opacity: 0.6,
        marginBottom: 10,
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        marginLeft: 10,
    },
    timeImage: {
        width: 32,
        height: 32,
        marginRight: 5,
    },
    timeLabel: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
    },
    timeContainer: {
        flexDirection: 'column',
        height: 80,
    },
    timeDetail: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 55,
        marginRight: 20,
        justifyContent: 'space-between',
    },
    labelDetail: {
        fontSize: 16,
        color: 'black',
        opacity: 0.8,
        marginBottom: 2,
    },
    valueDetail: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    listComment: {
        display: 'flex',
        flexDirection: 'column',
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    commentDetail: {

    },
    comment: {
        backgroundColor: '#E1E1E1',
        padding: 10,
        borderRadius: 20,
    },
    commentContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'black',
    },
    userName:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
    },
    commentScore: {
        color: '#24BAEC',
        fontSize: 14,
        fontWeight: '400',
    },
    commentTime: {
        color: 'black',
        marginLeft: 10,
    },
});

export default HotelDetailScreen;
