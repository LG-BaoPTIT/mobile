import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Footer from '../components/Footer/Footer';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MainScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Thực hiện các hành động cần thiết để đăng xuất khỏi ứng dụng
    console.log('Đăng xuất thành công!');

    clearAsyncStorageOnLogout();
    navigation.navigate('LoginScreen');
  };
  const displayAsyncStorageContents = async () => {
    try {
      // Lấy danh sách tất cả các khóa đã được lưu
      const keys = await AsyncStorage.getAllKeys();

      // Lấy giá trị của từng khóa và hiển thị
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(`Khóa: ${key}, Giá trị: ${value}`);
      }
    } catch (error) {
      console.error('Lỗi khi hiển thị dữ liệu từ AsyncStorage:', error);
    }
  };
  const clearAsyncStorageOnLogout = async () => {
    try {
      // Lấy danh sách tất cả các khóa đã được lưu
      const keys = await AsyncStorage.getAllKeys();

      // Xóa giá trị của từng khóa
      await AsyncStorage.multiRemove(keys);

      console.log('Đã xóa các giá trị trong AsyncStorage khi đăng xuất.');
    } catch (error) {
      console.error('Lỗi khi xóa dữ liệu từ AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/hero2.jpg')}
            style={styles.avatar}
          />
          <Text style={styles.username}>Lưu Gia Bảo</Text>
        </View>
        <TouchableWithoutFeedback onPress={handleLogout}>
          <View style={styles.logoutButton}>
            <Image
              source={require('../assets/logout.png')}
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.navBar}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SearchHotelScreen')}>
          <View style={styles.navBarItem}>
            <Image
              source={require('../assets/icon/icon_hotel.png')}
              style={styles.icon}
            />
            <Text style={styles.navBarText}>Tìm khách sạn</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('BookFlightTickets')}>
          <View style={styles.navBarItem}>
            <Image
              source={require('../assets/icon/icon_flight.png')}
              style={styles.icon}
            />
            <Text style={styles.navBarText}>Đặt vé máy bay</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('MyListTickets')}>
          <View style={styles.navBarItem}>
            <Image
              source={require('../assets/icon/ticket.png')}
              style={styles.icon}
            />
            <Text style={styles.navBarText}>Vé đã mua</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#24BAEC',
    flex: 1,
  },
  navBar: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  navBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    tintColor: '#24BAEC',
    width: 32,
    height: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Đảm bảo nút đăng xuất và tên người dùng đều được đặt cạnh nhau
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    tintColor: 'white',
    width: 20,
    height: 20,
    marginRight: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navBarText: {
    marginTop: 5,
    color: '#24BAEC',
  },
});

export default MainScreen;
