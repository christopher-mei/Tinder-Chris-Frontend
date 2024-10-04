// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Haii :3</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
      
     
      

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%', // Adjust the width as needed
    marginBottom: 80, // Add some space between the rows
  },
  apiTestButtonContainer: {
    width: '30%',
    marginBottom: 40, // Adjust the width as needed
  },
  cardSwiperButtonContainer: {
    width: '30%',
  },
  ChrisButtonContainer: {
    width: '40%',
    marginTop: 20,
  },
});

export default WelcomeScreen;