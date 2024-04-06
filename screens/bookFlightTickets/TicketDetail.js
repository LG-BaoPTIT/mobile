import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TicketDetail = () => {
    const [selectedClass, setSelectedClass] = useState('Economy');
    const navigation = useNavigation();
    
    // Thông tin chi tiết của chuyến bay
    const flightDetail = {
        id: 1,
        departureTime: '06:00',
        arrivalTime: '08:00',
        airline: 'Vietnam Airlines',
        origin: 'Hà Nội',
        destination: 'Hồ Chí Minh',
        prices: {
            Economy: '1.500.000 VND',
            Business: '3.000.000 VND',
            'First Class': '5.000.000 VND',
        },
    };

    // Xử lý khi người dùng chọn hạng vé
    const handleClassSelect = (className) => {
        setSelectedClass(className);
    };

    // Tính tổng giá tiền dựa trên hạng vé được chọn
    const totalPrice = flightDetail.prices[selectedClass];

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ListFlightTickets')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>{flightDetail.origin} - {flightDetail.destination}</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.ticketInfo}>
                <Text style={styles.header}>Thông Tin Chuyến Bay</Text>
                <View style={styles.ticketBox}>
                    <Text style={styles.infoBold}>Hãng Hàng Không: {flightDetail.airline}</Text>
                    <Text style={styles.infoBold}>Giờ Khởi Hành: {flightDetail.departureTime}</Text>
                    <Text style={styles.infoBold}>Giờ Đến: {flightDetail.arrivalTime}</Text>
                    <Text style={styles.infoBold}>Điểm Đi: {flightDetail.origin}</Text>
                    <Text style={styles.infoBold}>Điểm Đến: {flightDetail.destination}</Text>
                    <Text style={[styles.infoBold, styles.redText]}>Giá Tiền: {totalPrice}</Text>
                </View>
            </View>

            <View style={styles.ticketClass}>
                <Text style={styles.header}>Chọn Hạng Vé</Text>
                <View style={styles.classButtons}>
                    {Object.keys(flightDetail.prices).map((className) => (
                        <TouchableOpacity
                            key={className}
                            style={[styles.classButton, selectedClass === className && styles.selectedClass]}
                            onPress={() => handleClassSelect(className)}
                        >
                            <Text style={styles.classButtonText}>{className}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={[styles.total,, styles.redText]}>Tổng Tiền: {totalPrice}</Text>
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('TicketBookingForm')}>
                <Text style={styles.bookButtonText}>Đặt Ngay</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ticketInfo: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    ticketBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    infoBold: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    redText: {
        color: 'red',
    },
    ticketClass: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 20,
    },
    classButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    classButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    classButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedClass: {
        backgroundColor: 'yellow',
    },
    totalContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 200,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: '#24BAEC',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TicketDetail;
