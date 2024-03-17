/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListHotelScreen from './screens/hotelScreen/ListHotelScreen';
import SearchHotelScreen from './screens/hotelScreen/SearchHotelScreen';
import MainScreen from './screens/MainScreen';
import FilterHotelScreen from './screens/hotelScreen/FilterHotelScreen';
import HotelDetailScreen from './screens/hotelScreen/HotelDetailScreen';
import ListRoomScreen from './screens/bookingRoomScreen/ListRoomScreen';
import BookingRoomScreen from './screens/bookingRoomScreen/BookingRoomScreen';
import ManageBookingScreen from './screens/bookingRoomScreen/ManageBookingSceen';
import PaymentScreen from './screens/bookingRoomScreen/PaymentScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SearchHotelScreen" component={SearchHotelScreen} />
        <Stack.Screen name="ListHotelScreen" component={ListHotelScreen} />
        <Stack.Screen name="FilterHotelScreen" component={FilterHotelScreen} />
        <Stack.Screen name="HotelDetailScreen" component={HotelDetailScreen} />
        <Stack.Screen name="ListRoomScreen" component={ListRoomScreen} />
        <Stack.Screen name="BookingRoomScreen" component={BookingRoomScreen} />
        <Stack.Screen name="ManageBookingScreen" component={ManageBookingScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
