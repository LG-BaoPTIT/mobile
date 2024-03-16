/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListHotelScreen from './screens/hotelScreen/ListHotelScreen';
import SearchHotelScreen from './screens/hotelScreen/SearchHotelScreen';
import MainScreen from './screens/MainScreen';
import Footer from './components/Footer/Footer';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SearchHotelScreen" component={SearchHotelScreen} />
        <Stack.Screen name="ListHotelScreen" component={ListHotelScreen} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

export default App;
