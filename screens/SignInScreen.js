import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Initialize QueryClient
const queryClient = new QueryClient();

// Define validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Function to handle user sign-in
const signInUser = async (values) => {
  console.log('SignIn values:', values); // Debugging log

  // Construct the request body as a JSON string
  const requestBody = JSON.stringify({
    email: values.email,
    password: values.password,
  });

  console.log('Request body:', requestBody); // Log the request body

  // Send POST request with JSON-formatted data
  const response = await axios.post('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/login', requestBody, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return response.data;
};

const SignInScreen = () => {
  const navigation = useNavigation();
  const mutation = useMutation(signInUser, {
    onSuccess: async (data) => {
      // Store the token securely
      await AsyncStorage.setItem('authToken', data.token);
      // Navigate to the main screen
      navigation.navigate('MainScreen');
      // Show success message
      Alert.alert("Success", "Sign In Successful");
    },
    onError: (error) => {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response", error.response.data);
        Alert.alert("Error", `Failed to sign in: ${error.response.data.error}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request", error.request);
        Alert.alert("Error", "No response from server. Please try again later.");
      } else {
        // Something else happened
        console.error("Error message", error.message);
        Alert.alert("Error", `Failed to sign in: ${error.message}`);
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
      <Icon name="fire" size={150} color="#F4A460" style={styles.icon} />

        <Text style={styles.title}>Sign In</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSettled: () => {
                setSubmitting(false);
              }
            });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
              <Button onPress={handleSubmit} title="Sign In" />

              <View style={styles.newUserContainer}>
        <Text style={styles.newUserText}>New user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>


            </View>
          )}
        </Formik>
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
   // backgroundColor: '#FAF0E6'
   backgroundColor: '#FFFAFA'
  },
  icon: {
    marginBottom: 30, // Adjust as needed
    marginTop: -20, // Adjust as needed
    alignSelf: 'center', // Center the icon
  },
  welcomeBanner: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 90,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  newUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  newUserText: {
    fontSize: 20,
    marginRight: 5,
  },
  signUpLink: {
    fontSize: 20,
    color: '#007bff',
  },
});

export default SignInScreen;