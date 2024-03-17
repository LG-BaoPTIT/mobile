/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function PaymentScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { booking, price } = route.params;
    const [method, setMethod] = useState('agribank');

    const changeBankMethod = () => {
        setMethod('agribank');
    };

    const changeMomoMethod = () => {
        setMethod('momo');
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
                <Text style={styles.labelHeader}>Thanh toán</Text>
            </View>
            <View style={styles.paymentMethod}>
                <Text style={styles.label}>Phương thức thanh toán</Text>
                <Text style={styles.warningContent}>
                    Đảm bảo bạn chuyển khoản đúng
                    ngân hàng, số tài khoản và nội dung
                    như hướng dẫn trên.
                </Text>
                <View style={styles.select}>
                    <TouchableOpacity onPress={changeBankMethod}>
                        <Image
                            source={require('../../assets/image/logo/agribank.png')}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeMomoMethod}>
                        <Image
                            source={require('../../assets/image/logo/momo.png')}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detail}>
                {method === 'agribank' && (
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Thanh toán qua ngân hàng</Text>
                        <View style={styles.infoDetail}>
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Ngân hàng</Text>
                                <Text style={styles.valueItem}>Agribank</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Chủ tài khoản</Text>
                                <Text style={styles.valueItem}>TravelApp</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Số tài khoản</Text>
                                <Text style={styles.valueItem}>12345678910</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Số tiền</Text>
                                <Text style={styles.valueItem}>{price} VND</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Nội dung</Text>
                                <Text style={styles.valueItem}>{booking.id}</Text>
                            </View>
                            <View style={styles.lineInput} />
                        </View>
                        <Text style={styles.infoLabel}>Quét mã để thanh toán</Text>
                        <Image
                            source={require('../../assets/image/QR/agribank.png')}
                            style={styles.qrCode}
                        />
                    </View>
                )}
                {method === 'momo' && (
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Thanh toán qua momo</Text>
                        <View style={styles.infoDetail}>
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Số tài khoản</Text>
                                <Text style={styles.valueItem}>12348994512</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Chủ tài khoản</Text>
                                <Text style={styles.valueItem}>TravelApp</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Số tiền</Text>
                                <Text style={styles.valueItem}>{price} VND</Text>
                            </View>
                            <View style={styles.lineInput} />
                            <View style={styles.item}>
                                <Text style={styles.labelItem}>Nội dung</Text>
                                <Text style={styles.valueItem}>{booking.id}</Text>
                            </View>
                            <View style={styles.lineInput} />
                        </View>
                        <Text style={styles.infoLabel}>Quét mã để thanh toán</Text>
                        <Image
                            source={require('../../assets/image/QR/momo.png')}
                            style={styles.qrCode}
                        />
                    </View>
                )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ManageBookingScreen', {completedBooking: booking})}>
                <View style={styles.btnPayment}>
                    <Text style={styles.btnLabel}> Hoàn tất thanh toán</Text>
                </View>
            </TouchableOpacity>
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
        height: 40,
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
    paymentMethod: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        justifyContent: 'center',
        marginTop: 2,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 50,
    },
    select: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        padding: 10,
        width: 160,
        height: 140,
        borderRadius: 10,
    },
    warning: {
        width: 280,
        height: 80,
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 5,
        marginHorizontal: 50,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    warningContent: {
        textAlign: 'center',
        color: 'red',
    },
    lineInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#24BACE',
        width: 320,
    },
    info: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        marginLeft: 60,
        marginBottom: 10,
        marginTop: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    labelItem: {
        color: 'black',
        fontSize: 16,
    },
    valueItem: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    qrCode: {
        width: 240,
        height: 240,
        marginLeft: 40,
    },
    detail: {
        marginTop: 2,
    },
    btnPayment: {
        marginTop: 5,
        marginLeft: 60,
        width: 280,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    btnLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#24BACE',
    },
});

export default PaymentScreen;
