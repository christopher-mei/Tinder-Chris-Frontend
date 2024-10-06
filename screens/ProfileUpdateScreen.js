import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
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

const ProfileUpdateScreen = () => {
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
      setAge(data.age ? data.age.toString() : ''); // Handle null or undefined age
      setBio(data.bio);
      setLocation(data.location ? data.location.toString() : ''); // Handle null or undefined location
      // setImage(data.photo);
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const payload = {
      name,
      email,
      age: age ? parseInt(age, 10) : null, // Ensure age is a number
      bio,
      location,
      // photo: image,
    };

    console.log('Request Payload:', payload); // Log the request payload

    try {
      const response = await axios.put('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/update', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
      Alert.alert("Profile Updated", "Your profile has been updated.");
      queryClient.invalidateQueries('userData');
      navigation.navigate('ProfileScreen');
    } catch (error) {
      if (error.response) {
        console.log('Error Response:', error.response.data); // Log the error response
        Alert.alert("Error", error.response.data.error || 'There was an error updating your profile.');
      } else {
        console.log('Error:', error.message);
        Alert.alert("Error", 'There was an error updating your profile.');
      }
    }
  };

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={{ uri: image || 'https://via.placeholder.com/300x350.png?text=No+Image' }}
              style={styles.avatar}
            />
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Bio:</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              multiline={true}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Add padding at the bottom to ensure the button is not cut off
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 360, // Adjust the width to match the CardSwiper image size
    height: 400, // Adjust the height to match the CardSwiper image size
    borderRadius: 10, // Make the corners slightly rounded
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  bioInput: {
    height: 100, // Make the bio input box taller
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

export default ProfileUpdateScreen;