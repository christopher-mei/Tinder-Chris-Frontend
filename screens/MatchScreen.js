import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BannerMenu from '../components/BannerMenu';

const fetchUserData = async () => {
  const token = await AsyncStorage.getItem('authToken');
  //console.log('Retrieved token in MatchScreen:', token); // Debugging line
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

const MatchScreen = () => {
  const navigation = useNavigation();
  const { data, error, isLoading } = useQuery('userData', fetchUserData);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Hmm you don't seem to have any matches</Text>
      <BannerMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFAFA'
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default MatchScreen;