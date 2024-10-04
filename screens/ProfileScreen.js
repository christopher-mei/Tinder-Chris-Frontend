import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useQuery, useMutation, useQueryClient } from 'react-query';
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

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery('userData', fetchUserData, {
    onSuccess: (data) => {
      setName(data.name);
      setEmail(data.email);
      setAge(data.age.toString());
      setBio(data.bio);
      setLocation(data.location);
      setImage(data.photo);
    },
  });

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('authToken');
    Alert.alert("Signed Out", "You have been signed out.");
    navigation.navigate('SignIn');
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: image }} style={styles.avatar} />
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.info}>{age}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Bio:</Text>
          <Text style={styles.info}>{bio}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.info}>{location}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={() => navigation.navigate('ProfileUpdate')}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} /> 
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
      <BannerMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFAFA',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%', // Increase the width of the Update Profile button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increase the font size for the Update Profile button
  },
  signOutButton: {
    backgroundColor: '#ff6347',
    padding: 10, // Reduce padding to make the button smaller
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%', // Reduce the width of the Sign Out button
    alignSelf: 'center', // Center the Sign Out button
    marginBottom: 120, // Add margin to separate from the banner
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16, // Reduce font size to make the text smaller
  },
});

export default ProfileScreen;