/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Footer from '../components/Footer/Footer';
import { useNavigation } from '@react-navigation/native';
function MainScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchHotelScreen')}>
          <View style={styles.navBarItem}>
            <Image
              source={require('../assets/icon/icon_hotel.png')}
              style={styles.icon}
            />
            <Text>Tìm khách sạn</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.navBarItem}>
            <Image
              source={require('../assets/icon/icon_flight.png')}
              style={styles.icon}
            />
            <Text>Đặt máy bay</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24BAEC',
    width: '100%',
    height: '100%',
  },
  navBar: {
    backgroundColor: 'white',
    width: '100%',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  navBarItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: '#24BAEC',
    width: 32,
    height: 32,
  },

});

export default MainScreen;
