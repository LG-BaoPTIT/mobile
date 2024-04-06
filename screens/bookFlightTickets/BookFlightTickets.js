import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList, Keyboard } from 'react-native'; // Thêm Keyboard từ thư viện react-native
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

const BookFlightTickets = () => {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState(new Date());
    const [passengerCount, setPassengerCount] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [departureOptions, setDepartureOptions] = useState(['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng']);
    const [filteredDepartures, setFilteredDepartures] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState(['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng']);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const navigation = useNavigation();
    const [isDepartureListVisible, setDepartureListVisibility] = useState(false);
    const [isDestinationListVisible, setDestinationListVisibility] = useState(false);

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDepartureSelection = (selectedDeparture) => {
        setDeparture(selectedDeparture);
        setDepartureListVisibility(false); // Ẩn danh sách khi người dùng chọn
        Keyboard.dismiss(); // Ẩn bàn phím
    };
    
    const handleDestinationSelection = (selectedDestination) => {
        setDestination(selectedDestination);
        setDestinationListVisibility(false); // Ẩn danh sách khi người dùng chọn
        Keyboard.dismiss(); // Ẩn bàn phím
    };

    const handleBooking = () => {
        // Xử lý đặt vé máy bay ở đây
        // Ví dụ: console.log(departure, destination, date, passengerCount);
    };

    const searchDepartures = (text) => {
        const filtered = departureOptions.filter(option =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDepartures(filtered);
        setDepartureListVisibility(!!text); // Hiển thị danh sách nếu có dữ liệu trong ô input
    };
    
    const searchDestinations = (text) => {
        const filtered = destinationOptions.filter(option =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDestinations(filtered);
        setDestinationListVisibility(!!text); // Hiển thị danh sách nếu có dữ liệu trong ô input
    };
    


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('MainScreen')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>Mua vé máy bay</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.centeredView}>
                <Text style={styles.header}>Đặt Vé Máy Bay</Text>
                <View style={styles.bookingDetails}>
                    <Text style={styles.detailLabel}>Khởi Hành:</Text>
                    <TextInput
                        style={styles.input}
                        value={departure}
                        onChangeText={text => {
                            setDeparture(text);
                            searchDepartures(text);
                        }}
                        placeholder="Chọn điểm khởi hành"
                    />
                    {isDepartureListVisible && (
                        <View style={styles.listContainer}>
                            <FlatList
                                data={filteredDepartures}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        handleDepartureSelection(item);
                                        Keyboard.dismiss(); // Ẩn bàn phím
                                    }}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.flatList}
                            />
                        </View>
                    )}

                    <Text style={styles.detailLabel}>Điểm Đến:</Text>
                    <TextInput
                        style={styles.input}
                        value={destination}
                        onChangeText={text => {
                            setDestination(text);
                            searchDestinations(text);
                        }}
                        placeholder="Chọn điểm đến"
                    />
                    {isDestinationListVisible && (
                        <View style={styles.listContainer}>
                            <FlatList
                                data={filteredDestinations}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        handleDestinationSelection(item);
                                        Keyboard.dismiss(); // Ẩn bàn phím
                                    }}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.flatList}
                            />
                        </View>
                    )}

                    <Text style={styles.detailLabel}>Ngày Bay:</Text>
                    <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                        <Text>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <Text style={styles.detailLabel}>Số Lượng Hành Khách:</Text>
                    <TextInput
                        style={styles.input}
                        value={passengerCount}
                        onChangeText={text => setPassengerCount(text)}
                        keyboardType="numeric"
                        placeholder="Nhập số lượng hành khách"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListFlightTickets')}>
                    <Text style={styles.buttonText}>Tìm vé máy bay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'left',
        backgroundColor: 'lightblue',
        width: '90%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookingDetails: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    detailLabel: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        textAlign: 'left',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        margin: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    listContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
        maxHeight: 150,
        marginBottom: 10,
    },
    flatList: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default BookFlightTickets;
