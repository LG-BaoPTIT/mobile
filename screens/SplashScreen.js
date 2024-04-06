import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleSplashScreenPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSplashScreenPress}>
      <Text style={styles.title}>Travelor</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    color:'#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
