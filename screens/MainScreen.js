import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CardSwiper from '../components/CardSwiper';
import BannerMenu from '../components/BannerMenu';

const fetchUserData = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.get('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

const MainScreen = () => {
  const navigation = useNavigation();
  const { data, error, isLoading } = useQuery('userData', fetchUserData);

  const cards = [
    { id: 1, text: 'Chris, 29', image: 'https://i.imgur.com/ziDfU3o.jpg' },
    { id: 2, text: 'Chris, 29 ', image: 'https://i.imgur.com/JydLP9c.jpg' },
    { id: 3, text: 'also Chris, 29', image: 'https://i.imgur.com/SIl3tw3.jpg' },
    { id: 4, text: 'Chris, 29', image: 'https://i.imgur.com/nhghfUV.jpg' },
    { id: 5, text: 'Chris again, 29', image: 'https://i.imgur.com/H9znAN4.jpg' },
    { id: 6, text: 'still Chris, 29', image: 'https://i.imgur.com/VY4RZD0.jpg' },
    { id: 7, text: 'Chris, 29', image: 'https://i.imgur.com/L6jAyyw.jpg' },
    { id: 8, text: 'Chris, 29 ', image: 'https://i.imgur.com/uxfoxJd.jpg' },
    { id: 9, text: 'Chris, 29', image: 'https://i.imgur.com/daB4ZXc.jpg' },
    { id: 10, text: 'Chris, 29', image: 'https://i.imgur.com/t5vLEW0.jpg' },
    { id: 11, text: 'Chris, 29', image: 'https://i.imgur.com/95V8oBs.jpg' },
    { id: 12, text: 'Chris, 29', image: 'https://i.imgur.com/mgPIfLE.jpg' },
  ];

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    Alert.alert("Signed Out", "You have been signed out.");
    navigation.navigate('SignIn');
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <CardSwiper cards={cards} />
      <Text style={styles.welcomeText}></Text>
      <BannerMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;