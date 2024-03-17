/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Modal from 'react-native-modal';

function BookingRoomScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const { hotel, room, location } = route.params;

    const [checkInVisible, setCheckInVisible] = useState(false);
    const [checkOutVisible, setCheckOutVisible] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [bookingResult, setBookingResult] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const showCheckInDatePicker = () => {
        setCheckInVisible(true);
    };

    const hideCheckInDatePicker = () => {
        setCheckInVisible(false);
    };
    const serializeDate = (date) => {
        return date ? moment(date).toISOString() : null;
    };
    const handleCheckInConfirm = (selectedDate) => {
        setCheckInDate(selectedDate);
        hideCheckInDatePicker();
    };

    const showCheckOutDatePicker = () => {
        setCheckOutVisible(true);
    };

    const hideCheckOutDatePicker = () => {
        setCheckOutVisible(false);
    };

    const handleCheckOutConfirm = (selectedDate) => {
        setCheckOutDate(selectedDate);
        hideCheckOutDatePicker();
    };

    const calculateNumberOfDays = () => {
        if (checkInDate && checkOutDate) {
            const start = moment(checkInDate);
            const end = moment(checkOutDate);
            const numberOfDays = end.diff(start, 'days');
            return numberOfDays;
        }
    };

    const calculatePrice = () => {
        if (calculateNumberOfDays()) {
            return calculateNumberOfDays() * room.price;
        }
    };

    const calculateFee = () => {
        if (calculatePrice()) {
            return calculatePrice() * room.fee;
        }
    };

    const handleSubmit = () => {
        const data = {
            room: room,
            checkInDate: serializeDate(checkInDate),
            checkOutDate: serializeDate(checkOutDate),
            name: name,
            phoneNumber: phoneNumber,
            email: email,
        };
        console.log('data: ', data);

        const state = true;
        setBookingResult(state);

        if (bookingResult) {
            setModalVisible(true);
        }
    };

    const handlePayment = () => {
        const data = {
            id: Math.floor(Math.random() * 100) + 10,
            hotel: hotel,
            room: room,
            checkInDate: serializeDate(checkInDate),
            checkOutDate: serializeDate(checkOutDate),
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            status: 'Chưa thanh toán',
        };
        navigation.navigate('ManageBookingScreen', { newBooking: data });
    };
    useEffect(() => {
        if (bookingResult) {
            setModalVisible(true);
        }
    }, [bookingResult]);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('ListRoomScreen', { hotel: hotel, location: location })}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.iconHeader}
                    />
                </TouchableOpacity>
                <Text style={styles.labelHeader}>Điền thông tin</Text>
            </View>
            <ScrollView style={styles.list}>
                <View style={styles.detail}>
                    <View>
                        <Text style={styles.label}> {hotel.name} </Text>
                        <View style={styles.date}>
                            <Text style={styles.dateLabel}>Nhận phòng:</Text>
                            <Button onPress={showCheckInDatePicker} title={checkInDate ? moment(checkInDate).format('DD/MM/YYYY') : 'Select date'} />
                            <DateTimePickerModal
                                isVisible={checkInVisible}
                                mode="date"
                                onConfirm={handleCheckInConfirm}
                                onCancel={hideCheckInDatePicker}
                            />
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.dateLabel}>Trả phòng:</Text>
                            <Button onPress={showCheckOutDatePicker} title={checkOutDate ? moment(checkOutDate).format('DD/MM/YYYY') : 'Select date'} />
                            <DateTimePickerModal
                                isVisible={checkOutVisible}
                                mode="date"
                                onConfirm={handleCheckOutConfirm}
                                onCancel={hideCheckOutDatePicker}
                            />
                        </View>
                        {bookingResult === false && (
                            <Text style={styles.error}>
                                Phòng không còn trống trong khoảng thời gian này
                            </Text>
                        )}
                    </View>
                    <View style={styles.line} />
                    <View style={styles.detail}>
                        <Text style={styles.label}> {room.name} </Text>
                        <View style={styles.blockDetail}>
                            <Text style={styles.roomDetail}>Diện tích {room.area} m²</Text>
                            <View style={styles.bedRoom}>
                                {room.bigBed > 0 && <Text style={styles.roomDetail}>{room.bigBed} giường lớn</Text>}
                                {room.bigBed > 0 && room.smallBed > 0 && <Text style={styles.roomDetail}>,</Text>}
                                {room.smallBed > 0 && <Text style={styles.roomDetail}>{room.smallBed} giường nhỏ</Text>}
                            </View>
                            <Text style={styles.roomDetail}>{room.numberPeople} người/phòng</Text>
                            <Text style={styles.roomDetail}>{room.bathtub ? 'Có bồn tắm' : 'Không có bồn tắm'}</Text>
                            <Text style={styles.roomDetail}>Wifi miễn phí</Text>
                            <Text style={styles.roomDetail}>Giá: {room.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}/đêm</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.label}>Thông tin liên hệ</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.labelInput}>Tên</Text>
                        <TextInput
                            style={styles.inputValue}
                            placeholder="Nhập tên..."
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                        <View style={styles.lineInput} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.labelInput}>Số di động</Text>
                        <TextInput
                            style={styles.inputValue}
                            placeholder="Nhập số di động..."
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                        <View style={styles.lineInput} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.labelInput}>Email</Text>
                        <TextInput
                            style={styles.inputValue}
                            placeholder="Nhập email..."
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <View style={styles.lineInput} />
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.label}>Chi tiết giá</Text>
                    <View style={styles.price}>
                        <View style={styles.priceDetail}>
                            <View>
                                <Text style={styles.totalTimeDetail}>{room.name} </Text>
                                <Text style={styles.totalTimeDetail}>{calculateNumberOfDays() ? calculateNumberOfDays() : '0'} đêm</Text>
                            </View>
                            <Text style={styles.priceDetailValue}>VND {calculateNumberOfDays() ? calculatePrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0'}</Text>
                        </View>
                        <View style={styles.priceDetail}>
                            <Text style={styles.priceDetailLabel}>Thuế và phí</Text>
                            <Text style={styles.priceDetailValue}>VND {calculateNumberOfDays() ? calculateFee().toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0'}</Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.totalPrice}>
                        <Text style={styles.totalPriceLabel}>Tổng cộng</Text>
                        <Text style={styles.totalPriceValue}>VND {calculateNumberOfDays() ? (calculateFee() + calculatePrice()).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0'}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.btnSubmit}>
                        <Text style={styles.btnLabel}> Đặt phòng</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <Modal visible={modalVisible} onBackdropPress={toggleModal} backdropOpacity={0.9} backdropColor="rgba(0, 0, 0, 0.6)">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalContent}>Đặt phòng thành công, vui lòng đến trang quản lý đặt phòng để thực hiện thanh toán</Text>
                    <View style={styles.modalAction}>
                        <TouchableOpacity onPress={() => navigation.navigate('ListRoomScreen', { hotel: hotel, location: location })}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonLabel}>Quay lại</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePayment}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonLabel}>Thanh toán</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
    },
    labelHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    iconHeader: {
        tintColor: 'white',
        width: 40,
        height: 40,
        marginRight: 20,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
    },
    detail: {
        padding: 10,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 24,
        color: 'black',
        fontWeight: '600',
        marginBottom: 10,
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: 260,
    },
    dateLabel: {
        color: 'black',
        fontSize: 20,
        paddingHorizontal: 20,
    },
    line: {
        borderBottomWidth: 3,
        borderBottomColor: 'black',
        opacity: 0.6,
        width: 320,
        marginLeft: 20,
        marginTop: 10,
    },
    roomDetail: {
        fontSize: 20,
        color: 'black',
        opacity: 0.6,
    },
    userContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginTop: 2,
    },
    userInfo: {
        paddingLeft: 20,
        marginBottom: 10,
    },
    labelInput: {
        color: '#04CDFA',
        fontSize: 20,
        marginBottom: 5,
    },
    inputValue: {
        color: 'black',
        fontSize: 16,
        padding: 0,
    },
    lineInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#',
        width: 280,
    },
    priceContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginTop: 2,
    },
    priceDetail: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    priceDetailLabel: {
        fontSize: 16,
        color: 'black',
    },
    priceDetailValue: {
        fontSize: 16,
        color: 'black',
        opacity: 0.6,
    },
    totalPrice: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    totalPriceLabel: {
        fontSize: 20,
        color: 'black',
    },
    totalPriceValue: {
        fontSize: 20,
        color: '#04CDFA',
        fontWeight: 'bold',
    },
    btnSubmit: {
        width: 280,
        height: 50,
        backgroundColor: 'white',
        marginHorizontal: 60,
        marginVertical: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#04CDFA',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    modalContainer: {
        backgroundColor: '#D9D9D9',
        width: 300,
        height: 160,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
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
    modalButtonLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    totalTimeDetail: {
        fontSize: 16,
        color: 'black',
    },
    bedRoom: {
        display: 'flex',
        flexDirection: 'row',
    },
    blockDetail: {
        paddingLeft: 40,
    },
});
export default BookingRoomScreen;

