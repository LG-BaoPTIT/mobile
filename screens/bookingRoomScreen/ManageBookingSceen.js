/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../../components/Footer/Footer';
import Modal from 'react-native-modal';

const data = [
    {
        id: 1,
        hotel: {
            id: 1,
            name: 'Royal Family Hotel',
            score: 9.5,
            rate: 5,
            minPrice: 2000000,
            maxPrice: 10000000,
            timeCheckin: '14:00',
            timeCheckout: '12:00',
        },
        room: {
            id: 1,
            name: 'Deluxe Twin Room',
            area: 40.0,
            numberPeople: 3,
            bigBed: 1,
            smallBed: 1,
            bathtub: true,
            price: 2000000,
            fee: 0.2,
        },
        checkInDate: '2024-03-17T10:29:00.000Z',
        checkOutDate: '2024-03-19T10:29:00.000Z',
        userName: 'Lê Văn Dũng',
        phoneNumber: '0837633760',
        email: 'dung2892002ts@gmail.com',
        status: 'Chưa thanh toán',
    },
    {
        id: 2,
        hotel: {
            id: 1,
            name: 'Royal Family Hotel',
            score: 9.5,
            rate: 5,
            minPrice: 2000000,
            maxPrice: 10000000,
            timeCheckin: '14:00',
            timeCheckout: '12:00',
        },
        room: {
            id: 2,
            name: 'Superior Double Room',
            area: 46.0,
            numberPeople: 3,
            bigBed: 1,
            smallBed: 0,
            bathtub: true,
            price: 3000000,
            fee: 0.15,
        },
        checkInDate: '2024-03-19T10:29:00.000Z',
        checkOutDate: '2024-03-25T10:29:00.000Z',
        userName: 'Lưu Gia Bảo',
        phoneNumber: '0123456789',
        email: 'baoptit@gmail.com',
        status: 'Đã thanh toán',
    },
    {
        id: 3,
        hotel: {
            id: 1,
            name: 'Royal Family Hotel',
            score: 9.5,
            rate: 5,
            minPrice: 2000000,
            maxPrice: 10000000,
            timeCheckin: '14:00',
            timeCheckout: '12:00',
        },
        room: {
            id: 4,
            name: 'Family Suite',
            area: 80.0,
            numberPeople: 6,
            bigBed: 2,
            smallBed: 2,
            bathtub: true,
            price: 7000000,
            fee: 0.2,
        },
        checkInDate: '2024-03-22T10:29:00.000Z',
        checkOutDate: '2024-03-29T10:29:00.000Z',
        userName: 'Dương Xuân Đạt',
        phoneNumber: '0246813579',
        email: 'datbg2002@gmail.com',
        status: 'Chưa thanh toán',
    },
];

function ManageBookingScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const [bookings, setBookings] = useState(data);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [completedBooking, setCompletedBooking] = useState(null);


    useEffect(() => {
        if (route.params && route.params.newBooking) {
            const newBooking = route.params.newBooking;
            setBookings(prevBookings => [newBooking, ...prevBookings]);
        }
    }, [route.params]);

    useEffect(() => {
        if (route.params && route.params.completedBooking) {
            setCompletedBooking(route.params.completedBooking);
        }
    }, [route.params]);


    useEffect(() => {
        if (completedBooking) {
            setBookings(prevBookings => {
                const completedBookingId = completedBooking.id;
                return prevBookings.map(booking => {
                    if (booking.id === completedBookingId) {
                        return {
                            ...booking,
                            status: 'Đã thanh toán',
                        };
                    }
                    return booking;
                });
            });
        }
    }, [completedBooking]);

    const calculateNumberOfDays = (date1, date2) => {
        const start = moment(date1);
        const end = moment(date2);
        const numberOfDays = end.diff(start, 'days');
        return numberOfDays;

    };

    const calculateTotalPrice = (booking) => {
        var numberOfDays = calculateNumberOfDays(booking.checkInDate, booking.checkOutDate);
        var priceRoom = numberOfDays * booking.room.price;
        var priceFee = priceRoom * booking.room.fee;
        return priceFee + priceRoom;

    };

    const handleCancelBooking = (id) => {
        const updatedBookings = bookings.map(booking => {
            if (booking.id === id) {
                return { ...booking, status: 'Đã hủy' };
            }
            return booking;
        });
        setBookings(updatedBookings);
        setModalVisible(false);
    };

    const showModel = (booking) => {
        setSelectedBooking(booking);
        setModalVisible(true);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.iconHeader}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>Quản lý đặt phòng</Text>
            </View>
            <ScrollView style={styles.list}>
                {bookings.map(booking => (
                    <View key={booking.id} style={styles.itemBooking}>
                        <Text style={styles.name}>Khách sạn: {booking.hotel.name}</Text>
                        <Text style={styles.name}>Phòng: {booking.room.name}</Text>
                        <View style={styles.timeDetail}>
                            <View style={styles.time}>
                                <Text style={styles.timeContent}>Nhận phòng: </Text>
                                <Text style={styles.timeContent}>{booking.hotel.timeCheckin}, {moment(booking.checkInDate).format('DD/MM/YYYY')}</Text>
                            </View>
                            <View style={styles.time}>
                                <Text style={styles.timeContent}>Trả phòng: </Text>
                                <Text style={styles.timeContent}>{booking.hotel.timeCheckout}, {moment(booking.checkOutDate).format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={styles.itemDetail}>
                            <Text style={styles.priceLabel}>Chi phí </Text>
                            <Text style={styles.priceValue}>VND {calculateTotalPrice(booking).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.itemDetail}>
                            <Text style={styles.statusLabel}>Trạng thái: </Text>
                            <Text style={booking.status === 'Đã thanh toán' ? styles.statusComplete : styles.statusNotComplete}>{booking.status}</Text>
                        </View>
                        {booking.status === 'Chưa thanh toán' && <View style={styles.itemDetail}>
                            <TouchableOpacity onPress={() => showModel(booking)}>
                                <View style={styles.btnCancel}>
                                    <Text style={styles.btnLabel}>Hủy</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen', {booking: booking, price: calculateTotalPrice(booking).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')})}>
                                <View style={styles.btnPayment}>
                                    <Text style={styles.btnLabel}>Thanh toán</Text>
                                </View>
                            </TouchableOpacity>
                        </View>}
                        <Modal visible={modalVisible} onBackdropPress={toggleModal} backdropOpacity={0.9} backdropColor="rgba(0, 0, 0, 0.6)">
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalContent}>Bạn có chắc muốn hủy đặt phòng này không?</Text>
                                <View style={styles.modalAction}>
                                    <TouchableOpacity onPress={toggleModal}>
                                        <View style={styles.modalButton}>
                                            <Text style={styles.modalButtonLabel}>Không</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleCancelBooking(selectedBooking.id)}>
                                        <View style={styles.modalButtonCancel}>
                                            <Text style={styles.modalButtonLabel}>Hủy</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
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
        color: '#04CDFA',
    },
    iconHeader: {
        tintColor: '#04CDFA',
        width: 40,
        height: 40,
        marginRight: 20,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        marginBottom: 61,
        marginTop: 1,
    },
    line: {
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        opacity: 0.6,
        width: 280,
        marginLeft: 20,
        marginTop: 10,
    },
    itemBooking: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    name: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemDetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    timeDetail: {
        marginBottom: 20,
    },
    time: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center',
        marginBottom: 4,
    },
    timeContent: {
        fontSize: 16,
        color: 'black',
    },
    priceLabel: {
        color: 'black',
        fontSize: 22,
    },
    priceValue: {
        color: '#24BAEC',
        fontSize: 20,
    },
    statusLabel: {
        fontSize: 20,
        color: 'black',
    },
    statusComplete: {
        fontSize: 20,
        color: '#24BAEC',
    },
    statusNotComplete: {
        fontSize: 20,
        color: '#F13838',
    },
    btnCancel: {
        width: 120,
        height: 40,
        backgroundColor: '#F13838',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnPayment: {
        width: 120,
        height: 40,
        backgroundColor: '#24BAEC',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    btnLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalContainer: {
        backgroundColor: '#D9D9D9',
        width: 300,
        height: 160,
        padding: 12,
        borderRadius: 10,
        marginHorizontal: 20,
        marginLeft: 25,
    },
    modalContent: {
        fontSize: 16,
        color: 'black',
    },
    modalAction: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
    modalButton: {
        width: 90,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#24BAEC',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonCancel: {
        width: 90,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F13838',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default ManageBookingScreen;
