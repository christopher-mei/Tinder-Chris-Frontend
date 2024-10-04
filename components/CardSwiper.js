import React, { useRef ,Alert} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CardSwiper = ({ cards }) => {
  const swiperRef = useRef(null);

  return (
    <View style={styles.container}>
      <CardStack
        style={styles.cardStack}
        cardContainerStyle={styles.cardContainer}
        ref={swiperRef}
        renderNoMoreCards={() => <Text style={styles.noMoreCardsText}>No more Chris</Text>}
      >
        {cards.map(card => (
          <Card key={card.id} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} resizeMode="cover"/>
            <Text style={styles.label}>{card.text}</Text>
          </Card>
        ))}
      </CardStack>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.circleButtonLeft} onPress={() => { swiperRef.current.swipeLeft() }}>
            <Icon name="times" size={30} color="red" />       
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButtonRight} onPress={() => { swiperRef.current.swipeRight() }}>
            <Icon name="check" size={30} color="green" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={() => { swiperRef.current.goBackFromTop() }}>
          <Icon name="undo" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
   // backgroundColor: '#FAF0E6',
   backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStack: {
    flex: 1,
    width: '100%',
    height: '100%',
    //backgroundColor: '#FAF0E6',
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  cardContainer: {
    width: '95%',
    height: '85%',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'flex-start', // Align items to the left
    backgroundColor: '#FFFFF0',
    padding: 10, // Add padding to the card
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 10, // Add border radius to the image
    marginTop: 30, // Add top margin to move the image down
    
  },
  label: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left', // Align text to the left
    marginLeft: 20, // Add more left margin
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 10,
  },
  circleButtonLeft: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5, // Thick border
    borderColor: 'red', // Red border color
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
  },
  circleButtonRight: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5, // Thick border
    borderColor: 'green', // Green border color
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
  },
  resetButton: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    bottom: 80, // Adjust this value to move the button up or down
  },
  noMoreCardsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardSwiper;