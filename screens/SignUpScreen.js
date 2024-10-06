import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation, QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const queryClient = new QueryClient();

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signUpUser = async (values) => {
  const response = await axios.post('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/register', {
    name: values.name,
    email: values.email,
    password: values.password,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
  });
  return response.data;
};

const signInUser = async (values) => {
  const response = await axios.post('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/login', {
    email: values.email,
    password: values.password,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
    }
  });
  return response.data;
};

const SignUpScreen = () => {
  const navigation = useNavigation();

  const mutation = useMutation(signUpUser, {
    onSuccess: async (data, values) => {
      try {
        const signInResponse = await signInUser(values);
        if (signInResponse && signInResponse.token) {
          await AsyncStorage.setItem('authToken', signInResponse.token.toString());
          Alert.alert("Success", "User registered and signed in successfully");
          navigation.navigate('ProfileUpdate');
        } else {
          throw new Error("Invalid sign-in response");
        }
      } catch (error) {
        console.error("Sign in error", error);
        Alert.alert("Error", "Failed to sign in after registration");
      }
    },
    onError: (error) => {
      if (error.response) {
        console.error("Error response", error.response.data);
        Alert.alert("Error", `Failed to register user: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request", error.request);
        Alert.alert("Error", "No response from server. Please try again later.");
      } else {
        console.error("Error message", error.message);
        Alert.alert("Error", `Failed to register user: ${error.message}`);
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutation.mutate(values, {
            onSettled: () => {
              setSubmitting(false);
            }
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={styles.container}>
            <Icon name="fire" size={150} color="#F4A460" style={styles.headerIcon} />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button onPress={handleSubmit} title="Sign Up" />
            <View style={styles.newUserContainer}>
              <Text style={styles.newUserText}>Return to </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signUpLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFAFA',
  },
  headerIcon: {
    alignSelf: 'center',
    marginBottom: 20,
    //marginBottom: 30, // Adjust as needed
    marginTop: -20, // Adjust as needed
    //alignSelf: 'center', // Center the icon
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
    marginBottom: 10,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
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

export default SignUpScreen;