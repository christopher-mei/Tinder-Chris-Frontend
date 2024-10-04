import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BannerMenu = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);

  return (
    <View style={styles.bannerMenu}>
      <TouchableOpacity
        style={[styles.bannerButton, (currentRoute === 'ProfileScreen' || currentRoute === 'ProfileUpdate') && styles.activeButton]}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Icon name="user" size={25} color={(currentRoute === 'ProfileScreen' || currentRoute === 'ProfileUpdate') ? '#fff' : '#007bff'} style={[styles.icon, (currentRoute === 'ProfileScreen' || currentRoute === 'ProfileUpdate') && styles.activeIcon]} />
        <Text style={[styles.bannerButtonText, (currentRoute === 'ProfileScreen' || currentRoute === 'ProfileUpdate') && styles.activeButtonText]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bannerButton, styles.centerButton, currentRoute === 'MainScreen' && styles.activeButton]}
        onPress={() => navigation.navigate('MainScreen')}
      >
        <Icon name="fire" size={40} color={currentRoute === 'MainScreen' ? '#fff' : '#007bff'} style={[styles.icon, styles.centerIcon, currentRoute === 'MainScreen' && styles.activeIcon]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bannerButton, currentRoute === 'MatchScreen' && styles.activeButton]}
        onPress={() => navigation.navigate('MatchScreen')}
      >
        <Icon name="heart" size={25} color={currentRoute === 'MatchScreen' ? '#fff' : '#007bff'} style={[styles.icon, currentRoute === 'MatchScreen' && styles.activeIcon]} />
        <Text style={[styles.bannerButtonText, currentRoute === 'MatchScreen' && styles.activeButtonText]}>Matches</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerMenu: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F4A460',
    justifyContent: 'space-around',
    height: 60, // Set a fixed height for the banner
    paddingTop: 5,
  },
  bannerButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4A460',
    marginHorizontal: 5,
    height: '100%', // Make the button fill the height of the banner
    paddingTop: 10, // Add padding to the top to create the shorter bottom effect
    paddingBottom: 10, // Add padding to the bottom to create the shorter bottom effect
    overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
  },
  centerButton: {
   // justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
   
  },
  activeButton: {
    color: '#FFFAFA', // Text color for the active button
    fontWeight: 'bold', // Make text bold when active
    backgroundColor: '#F4A460',
  },
  bannerButtonText: {
    color: '#000000',
    fontSize: 16,
    marginLeft: 0,
  },
  activeButtonText: {
    fontSize: 16,
    color: 'white',
  },
  icon: {
    marginRight: 0,
    color: '#000000',
  },
  centerIcon: {
    fontSize: 40, // Make the center icon larger
    marginTop: -8
    

  },
  activeIcon: {
    fontWeight: 'bold', // Make icon bold when active
    color: 'white',
  },
});

export default BannerMenu;