import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyListTickets = () => {
    // Dữ liệu mẫu cho danh sách vé đã mua
    const ticketsData = [
        { id: '1', flightCode: 'VN123', departure: 'Hanoi', destination: 'Ho Chi Minh', date: '2024-04-15', time: '08:00', price: 1500000 },
        { id: '2', flightCode: 'VN456', departure: 'Ho Chi Minh', destination: 'Da Nang', date: '2024-04-20', time: '10:30', price: 1200000 },
        { id: '3', flightCode: 'VN789', departure: 'Da Nang', destination: 'Hanoi', date: '2024-04-25', time: '13:45', price: 1000000 },
    ];
    const navigation = useNavigation();

    // Render một mục trong danh sách vé đã mua
    const renderItem = ({ item }) => (
        <View style={styles.ticketItem}>
            <Text style={styles.ticketText}>Mã chuyến bay: {item.flightCode}</Text>
            <Text style={styles.ticketText}>Nơi đi: {item.departure}</Text>
            <Text style={styles.ticketText}>Nơi đến: {item.destination}</Text>
            <Text style={styles.ticketText}>Ngày: {item.date}</Text>
            <Text style={styles.ticketText}>Giờ: {item.time}</Text>
            <Text style={styles.ticketText}>Giá vé: {item.price.toLocaleString()} VND</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('MainScreen')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>Trang chủ</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.title}>Danh sách vé đã mua</Text>
            <FlatList
                data={ticketsData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20,paddingHorizontal:20, }}
            />
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
    },
    title: {
        
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ticketItem: {
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'lightblue', // Màu nền của box vé
    },
    ticketText: {
        fontSize: 16,
        marginBottom: 5,
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
});

export default MyListTickets;
