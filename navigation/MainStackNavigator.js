// navigation/MainStackNavigator.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ApiTestPage from '../screens/ApiTestPage';
import CardSwiperScreen from '../screens/CardSwiperScreen';
import ManageCardsScreen from '../screens/ManageCardsScreen';
import EditCardScreen from '../screens/EditCardScreen';
import ViewCardScreen from '../screens/ViewCardScreen';
import MainScreen from '../screens/MainScreen';
import ProfileUpdateScreen from '../screens/ProfileUpdateScreen'; // Import the new screen
import ProfileScreen from '../screens/ProfileScreen'; // Import the new screen
import ChrisSwiper from '../screens/ChrisSwiper'; // Import the new screen
import MatchScreen from '../screens/MatchScreen'; // Import the new screen
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    
      <Stack.Navigator initialRouteName="SignIn"  
      screenOptions={{
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
          <Icon name="fire" size={30} color="#FF8C00" style={styles.headerIcon} />
          <Text style={styles.headerTitleText}>Tinder: but its just Chris</Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: '#FFFAFA', // Set the background color of the header
        },
        headerTintColor: '#FF8C00', // Set the color of the header text and icons
      }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ApiTestPage" component={ApiTestPage} />
        <Stack.Screen name="CardSwiper" component={CardSwiperScreen} />
        <Stack.Screen name="ManageCards" component={ManageCardsScreen} />
        <Stack.Screen name="EditCard" component={EditCardScreen} />
        <Stack.Screen name="ViewCard" component={ViewCardScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdateScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChrisSwiper" component={ChrisSwiper} />
        <Stack.Screen name="MatchScreen" component={MatchScreen} />
      </Stack.Navigator>
    
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitleText: {
    fontSize: 18, // Increase the font size
    fontWeight: '900', // Make the text bolder
    color: '#FF8C00',
  },
});

export default MainStackNavigator;