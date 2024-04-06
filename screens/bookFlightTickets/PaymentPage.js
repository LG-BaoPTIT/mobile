import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentPage = () => {
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        bank: 'VietCombank',
    });
    const [showBankList, setShowBankList] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigation = useNavigation();

    const banks = ['Vietcombank', 'ACB', 'Techcombank'];

    const handleSubmitPayment = () => {
        // Xử lý thanh toán ở đây
        console.log(cardInfo);
        // Sau khi xử lý thanh toán, hiển thị thông báo thành công
        setShowSuccessModal(true);
    };

    const handleGoHome = () => {
        // Chuyển hướng về trang chủ
        navigation.navigate('MainScreen');
    };

    const handleViewTickets = () => {
        // Chuyển hướng đến trang xem vé đã mua
        navigation.navigate('MyListTickets');
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ConfirmationPage')}>
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/icon/icon_back.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.headerText}>Thông tin đặt vé</Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={styles.paymentTitle}>Thanh toán bằng thẻ ngân hàng</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ngân hàng:</Text>
                <TouchableOpacity onPress={() => setShowBankList(true)}>
                    <Text style={styles.bankText}>{cardInfo.bank}</Text>
                </TouchableOpacity>
                <Modal
                    visible={showBankList}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowBankList(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {banks.map((bank, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setCardInfo({ ...cardInfo, bank: bank });
                                        setShowBankList(false);
                                    }}
                                >
                                    <Text style={styles.bankListItem}>{bank}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Mã thẻ:</Text>
                <TextInput
                    style={styles.input}
                    value={cardInfo.cardNumber}
                    onChangeText={value => setCardInfo({ ...cardInfo, cardNumber: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tên trên thẻ:</Text>
                <TextInput
                    style={styles.input}
                    value={cardInfo.cardName}
                    onChangeText={value => setCardInfo({ ...cardInfo, cardName: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ngày hết hạn:</Text>
                <TextInput
                    style={styles.input}
                    value={cardInfo.expiryDate}
                    onChangeText={value => setCardInfo({ ...cardInfo, expiryDate: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CCV:</Text>
                <TextInput
                    style={styles.input}
                    value={cardInfo.cvv}
                    onChangeText={value => setCardInfo({ ...cardInfo, cvv: value })}
                />
            </View>
            <TouchableOpacity style={styles.paymentButton} onPress={handleSubmitPayment}>
                <Text style={styles.paymentButtonText}>Xác nhận thanh toán</Text>
            </TouchableOpacity>

            {/* Modal hiển thị thông báo thành công */}
            <Modal
                visible={showSuccessModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.successMessage}>Thanh toán thành công!</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleGoHome}>
                                <Text style={styles.modalButtonText}>Trang chủ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleViewTickets}>
                                <Text style={styles.modalButtonText}>Vé đã mua</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    paymentTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
        paddingHorizontal: 20,
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
    bankText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    bankListItem: {
        paddingVertical: 10,
    },
    paymentButton: {
        backgroundColor: '#24BAEC',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    paymentButtonText: {
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
    successMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#24BAEC',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentPage;
