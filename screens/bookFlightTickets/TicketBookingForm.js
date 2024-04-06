import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableWithoutFeedback, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TicketBookingForm = () => {
    const [contactInfo, setContactInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
    });

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        dob: '',
        cccd: '',
        gender: '',
    });

    const navigation = useNavigation();

    const handleContactChange = (name, value) => {
        setContactInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCustomerChange = (name, value) => {
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGenderChange = (selectedGender) => {
        setCustomerInfo(prevState => ({
            ...prevState,
            gender: selectedGender,
        }));
    };

    const handleSubmit = () => {
        // Xử lý gửi dữ liệu đặt vé ở đây

        console.log(contactInfo);
        console.log(customerInfo);
        navigation.navigate('ConfirmationPage')
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('TicketDetail')}>
        <View style={styles.headerContainer}>
            <Image
                source={require('../../assets/icon/icon_back.png')}
                style={styles.icon}
            />
            <Text style={styles.headerText}>Thông tin chuyến bay</Text>
        </View>
    </TouchableWithoutFeedback>


                <View style={styles.infoBox}>
                    <Text style={styles.boxTitle}>Thông tin liên hệ</Text>
                    <Text style={styles.boxNote}>Vé điện tử sẽ được gửi đến thông tin này</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Họ và tên:</Text>
                        <TextInput
                            style={styles.input}
                            value={contactInfo.fullName}
                            onChangeText={value => handleContactChange('fullName', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Số điện thoại:</Text>
                        <TextInput
                            style={styles.input}
                            value={contactInfo.phoneNumber}
                            onChangeText={value => handleContactChange('phoneNumber', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={contactInfo.email}
                            onChangeText={value => handleContactChange('email', value)}
                        />
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.boxTitle}>Thông tin khách hàng</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Họ và tên:</Text>
                        <TextInput
                            style={styles.input}
                            value={customerInfo.fullName}
                            onChangeText={value => handleCustomerChange('fullName', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Ngày sinh:</Text>
                        <TextInput
                            style={styles.input}
                            value={customerInfo.dob}
                            onChangeText={value => handleCustomerChange('dob', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Số CCCD:</Text>
                        <TextInput
                            style={styles.input}
                            value={customerInfo.cccd}
                            onChangeText={value => handleCustomerChange('cccd', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Giới tính:</Text>
                        <View style={styles.radioContainer}>
                            <RadioButton label="Nam" selected={customerInfo.gender === 'Nam'} onSelect={() => handleGenderChange('Nam')} />
                            <RadioButton label="Nữ" selected={customerInfo.gender === 'Nữ'} onSelect={() => handleGenderChange('Nữ')} />
                        </View>
                    </View>
                </View>


                <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
                    <Text style={styles.bookButtonText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const RadioButton = ({ label, selected, onSelect }) => {
    return (
        <TouchableWithoutFeedback onPress={onSelect}>
            <View style={styles.radioContainer}>
                <View style={[styles.radio, selected && styles.selectedRadio]}></View>
                <Text>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
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
    scrollViewContainer: {
        flexGrow: 1,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoBox: {
        padding: 20,
        
    },
    boxTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boxNote: {
        marginBottom: 10,
        fontStyle: 'italic',
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginRight: 20,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        marginRight: 10,

    },
    selectedRadio: {
        backgroundColor: 'yellow',
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
    icon: {
        width: 32,
        height: 32,
        tintColor: 'black',
        marginRight: 10,
    },
});

export default TicketBookingForm;
