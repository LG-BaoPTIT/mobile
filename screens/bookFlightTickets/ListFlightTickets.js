import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Image, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListFlightTickets = () => {
    const navigation = useNavigation();
    const flights = [
        { id: 1, departure: '06:00', arrival: '08:00', airline: 'Vietnam Airlines', price: '1.500.000 VND' },
        { id: 2, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 3, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 4, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 5, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 6, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 7, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 8, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 9, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 10, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        { id: 11, departure: '09:00', arrival: '11:00', airline: 'Bamboo Airways', price: '1.200.000 VND' },
        // Thêm các chuyến bay khác tương tự
    ];

    const [showModal, setShowModal] = React.useState(false);

    // Xử lý khi vé máy bay được nhấn vào
    const handleFlightPress = (flightId) => {
        // Thực hiện các thao tác cần thiết khi vé máy bay được nhấn vào, ví dụ: mở modal chi tiết vé
        console.log('Flight pressed:', flightId);
        navigation.navigate('TicketDetail')

    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('BookFlightTickets')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>Hà Nội - Hồ Chí Minh</Text>
                </View>
            </TouchableWithoutFeedback>



            <ScrollView style={styles.hihi}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton} >
                        <Text style={styles.filterButtonText}>Giá Thấp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} >
                        <Text style={styles.filterButtonText}>Giá Cao</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} >
                        <Text style={styles.filterButtonText}>Bay Sớm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton} >
                        <Text style={styles.filterButtonText}>Bay Muộn</Text>
                    </TouchableOpacity>
                </View>

                {flights.map(flight => (
                    <TouchableOpacity 
                        key={flight.id}
                        style={styles.flightItem}
                        activeOpacity={0.7} // Độ mờ khi nhấn
                        onPress={() => handleFlightPress(flight.id)} // Xử lý khi vé máy bay được nhấn vào
                    >
                        <Text style={styles.airline}>{flight.airline}</Text>
                        <View style={styles.details}>
                            <Text style={styles.detailText}>Khởi hành: {flight.departure}</Text>
                            <Text style={styles.detailText}>Đến: {flight.arrival}</Text>
                            <Text style={styles.price}>{flight.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    hihi: {
        
        backgroundColor: '#CBCBCB',
    },
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
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
    filterContainer: {
      
        padding:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 3,
    },
    filterButton: {
        backgroundColor: 'orange',
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    filterButtonText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    option: {
        fontSize: 18,
        marginBottom: 10,
    },
    flightItem: {
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    airline: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        marginTop: 10,
        padding: 10,
    },
    detailText: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
    },
});

export default ListFlightTickets;
