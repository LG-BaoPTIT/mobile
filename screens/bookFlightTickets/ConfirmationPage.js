import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ConfirmationPage = ({ route }) => {
    // Dữ liệu cứng
    const navigation = useNavigation();

    const contactInfo = {
        fullName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        email: 'nguyenvana@example.com',
    };

    const customerInfo = {
        fullName: 'Nguyễn Thị B',
        dob: '01/01/1990',
        cccd: '123456789',
        gender: 'Nữ',
    };

    const ticketInfo = {
        airline: 'Vietnam Airlines',
        flightNumber: 'VN123',
        departureDate: '01/05/2024',
        departureAirport: 'Sân bay Nội Bài',
        destinationAirport: 'Sân bay Tân Sơn Nhất',
        departureTime: '08:00',
        arrivalTime: '10:00',
        totalPrice: '1,500,000 VND',
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('TicketBookingForm')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>Thông tin đặt vé</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin liên hệ:</Text>
                <Text style={styles.info}>Họ và tên: {contactInfo.fullName}</Text>
                <Text style={styles.info}>Số điện thoại: {contactInfo.phoneNumber}</Text>
                <Text style={styles.info}>Email: {contactInfo.email}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin khách hàng:</Text>
                <Text style={styles.info}>Họ và tên: {customerInfo.fullName}</Text>
                <Text style={styles.info}>Ngày sinh: {customerInfo.dob}</Text>
                <Text style={styles.info}>Số CCCD: {customerInfo.cccd}</Text>
                <Text style={styles.info}>Giới tính: {customerInfo.gender}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin chuyến bay:</Text>
                <Text style={styles.info}>Hãng hàng không: {ticketInfo.airline}</Text>
                <Text style={styles.info}>Số hiệu chuyến bay: {ticketInfo.flightNumber}</Text>
                <Text style={styles.info}>Ngày khởi hành: {ticketInfo.departureDate}</Text>
                <Text style={styles.info}>Nơi đi: {ticketInfo.departureAirport}</Text>
                <Text style={styles.info}>Nơi đến: {ticketInfo.destinationAirport}</Text>
                <Text style={styles.info}>Giờ khởi hành: {ticketInfo.departureTime}</Text>
                <Text style={styles.info}>Giờ đến: {ticketInfo.arrivalTime}</Text>
                <Text style={styles.info}>Tổng tiền: {ticketInfo.totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.confirmButton}  onPress={() => navigation.navigate('PaymentPage')}>
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    section: {
        marginBottom: 20,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    confirmButton: {
        backgroundColor: '#24BAEC',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
});

export default ConfirmationPage;
