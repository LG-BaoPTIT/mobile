/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../../components/Footer/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HotelDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { location, hotelId } = route.params;
    const [showAllDescribe, setShowAllDescribe] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [hotel, setHotel] = useState();
    const [reviewHotel, setReviewHotel] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newReviewContent, setNewReviewContent] = useState('');
    const [newReviewRating, setNewReviewRating] = useState(0);
    const [error, setError] = useState(null);
    const [reviewError, setReviewError] = useState('');
    const URl_API = 'http://192.168.2.24:8080';

    const toggleDescribe = () => {
        setShowAllDescribe(!showAllDescribe);
    };
    const toggleComment = () => {
        setShowComment(!showComment);
    };
    useEffect(() => {
        const fetchHotelAndReviews = async () => {
            try {
                const hotelResponse = await fetch(`${URl_API}/api/v1/hotel/${hotelId}`);
                const hotelData = await hotelResponse.json();
                setHotel(hotelData);

                const reviewResponse = await fetch(`${URl_API}/api/v1/review/hotel/${hotelId}`);
                const reviewData = await reviewResponse.json();
                setReviewHotel(reviewData);

                setIsLoading(false);
            } catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };

        fetchHotelAndReviews();
    }, [hotelId]);

    const calculationAverageRating = (reviews) => {
        if (reviews.length === 0) {
            return 0;
        }
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return parseFloat(averageRating.toFixed(2));
    };

    function evaluateHotel(score) {
        if (score === 0) { return 'Chưa có đánh giá từ khách hàng'; }
        if (score >= 9.0) { return 'Xuất sắc'; }
        if (score >= 8.0) { return 'Tốt'; }
        if (score >= 7.0) { return 'Khá'; }
        if (score >= 5.5) { return 'Trung bình'; }
        if (score >= 4.0) { return 'Tệ'; }
        return 'Cực tệ';
    }

    const shortenName = (name) => {
        if (name.length > 20) {
            return name.slice(0, 20 - 3) + '...';
        } else {
            return name;
        }
    };

    const renderRatingOptions = () => {
        const ratingOptions = [];
        for (let i = 1; i <= 10; i++) {
            ratingOptions.push(
                <TouchableOpacity
                    key={`rating_option_${i}`}
                    onPress={() => setNewReviewRating(i)}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.ratingOption, newReviewRating === i && styles.selectedRatingOption, { backgroundColor: newReviewRating === i ? '#24BACE' : 'transparent' }]}
                >
                    <Text>{i}</Text>
                </TouchableOpacity>
            );
        }
        return ratingOptions;
    };

    const submitReview = async () => {
        if (newReviewRating === null) {
            setReviewError('Chọn mức điểm muốn đánh giá');
            return;
        }
        if (newReviewContent.length === 0) {
            setReviewError('Nhập đánh giá của bạn');
            return;
        }
        const userData = await AsyncStorage.getItem('user');
        const user = JSON.parse(userData);
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const reviewRequest = {
            userId: user.id,
            hotelId: hotel.id,
            content: newReviewContent,
            rating: newReviewRating,
            time: formattedDate,
        };
        console.log('ReviewRequest: ' + reviewRequest);

        try {
            const response = await fetch(`${URl_API}/api/v1/review/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewRequest),
            });
            if (!response.ok) {
                throw new Error('Failed to save booking');
            }
            const newReview = {
                content: newReviewContent,
                rating: newReviewRating,
                time: formattedDate,
                user: user,
                hotel: hotel,
            };
            const updateReviews = [...reviewHotel];
            updateReviews.push(newReview);
            setReviewHotel(updateReviews);
            const responseData = await response.text();
            console.log('Booking saved successfully:', responseData);
        } catch (e) {
            console.error('Error saving booking:', e);
        }
    };

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ListHotelScreen', { location: location, minPrice: 0, maxPrice: Infinity, selectedRatings: [1, 2, 3, 4, 5] })}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>{shortenName(hotel.name)} </Text>
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
                        {calculationAverageRating(reviewHotel) > 0 && <Text style={styles.hotelScore}>{calculationAverageRating(reviewHotel)}</Text>}
                        <Text style={styles.hotelEvaluation}>{evaluateHotel(calculationAverageRating(reviewHotel))}</Text>
                    </View>
                    <Text style={styles.totalComment}>Từ {reviewHotel.length} đánh giá</Text>
                    {showComment && <ScrollView style={styles.listComment}>
                        {reviewHotel.map(review => (
                            <View key={review.id} style={styles.commentContainer}>
                                <Image
                                    source={require('../../assets/hero1.jpg')}
                                    style={styles.userImage}
                                />
                                <View style={styles.commentDetail}>
                                    <View style={styles.comment}>
                                        <View style={styles.commentContent}>
                                            <Text style={styles.userName}>{review.user.name}</Text>
                                            <Text style={styles.commentScore}>{review.rating}/10</Text>
                                        </View>
                                        <Text style={styles.commentContent}>{review.content}</Text>
                                    </View>
                                    <Text style={styles.commentTime}>{review.time}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>}
                    <View style={styles.newSubmitReview}>
                        <View style={styles.newReviewRating}>
                            <Text style={styles.ratingLabel}>Đánh giá: </Text>
                            <View style={styles.ratingOptionsContainer}>
                                {renderRatingOptions()}
                            </View>
                        </View>
                        <View style={styles.newReviewBottom}>
                            <View style={styles.newReviewContent}>
                                <TextInput
                                    style={styles.newReviewContentValue}
                                    onChangeText={text => setNewReviewContent(text)}
                                    value={newReviewContent}
                                    placeholder="Nhập nội dung đánh giá"
                                />
                            </View>
                            <TouchableOpacity onPress={submitReview} style={styles.btnReview}>
                                <Text style={styles.labelBtnReview}>Gửi đánh giá</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {reviewError.length > 0 && (
                        <Text style={styles.reviewError}>{reviewError}</Text>
                    )}
                    <TouchableOpacity onPress={toggleComment}>
                        <Text style={styles.link}>{showComment ? 'Ẩn' : 'Xem toàn bộ đánh giá'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.hotelInformation}>
                    <Text style={styles.label}>Mô tả</Text>
                    <Text numberOfLines={showAllDescribe ? undefined : 4} style={styles.describe}>{hotel.description}</Text>
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
                            <Text style={styles.valueDetail}>từ {hotel.checkIn}</Text>
                        </View>
                        <View style={styles.timeDetail}>
                            <Text style={styles.labelDetail}>Giờ trả phòng</Text>
                            <Text style={styles.valueDetail}>trước {hotel.checkOut}</Text>
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
        fontSize: 24,
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
    userName: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginRight: 2,
    },
    commentScore: {
        color: '#24BAEC',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 3,
    },
    commentTime: {
        color: 'black',
        marginLeft: 10,
    },
    newSubmitReview: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 2,
    },
    newReviewBottom: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    newReviewContent: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        width: 280,
        marginRight: 10,
        marginLeft: 2,
    },
    newReviewContentValue: {

    },
    newReviewRating: {

    },
    ratingLabel: {

    },
    ratingOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnReview: {
        backgroundColor: '#24BAEC',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
    },
    labelBtnReview: {
        color: 'black',
        fontSize: 14,
    },
    ratingOption: {
        color: 'black',
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#24BACE',
    },
    selectedRatingOption: {
        color: '#24BAEC',
    },
    reviewError: {
        color: 'red',
    },
});

export default HotelDetailScreen;
