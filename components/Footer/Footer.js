/* eslint-disable prettier/prettier */

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React  from 'react';
import { useNavigation } from '@react-navigation/native';
function Footer() {

    const navigation = useNavigation();

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
                <View style={styles.footerItem}>
                    <Image
                        source={require('../../assets/icon/icon_home.png')}
                        style={styles.icon}
                    />
                    <Text>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ManageBookingScreen')}>
                <View style={styles.footerItem}>
                    <Image
                        source={require('../../assets/icon/icon_calender.png')}
                        style={styles.icon}
                    />
                    <Text>Calender</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.footerItem}>
                <Image
                    source={require('../../assets/icon/icon_search.png')}
                    style={styles.icon}
                />
            </View>
            <View style={styles.footerItem}>
                <Image
                    source={require('../../assets/icon/icon_message.png')}
                    style={styles.icon}
                />
                <Text>Messages</Text>
            </View>
            <View style={styles.footerItem}>
                <Image
                    source={require('../../assets/icon/icon_profile.png')}
                    style={styles.icon}
                />
                <Text>Profile</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        tintColor: '#24BAEC',
        width: 32,
        height: 32,
    },
    footer: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        height: 60,
        position: 'absolute',
    },
    footerItem: {
        tintColor: '#24BAEC',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Footer;
