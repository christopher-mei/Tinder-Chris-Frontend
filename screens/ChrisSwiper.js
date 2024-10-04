import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import CardStack, { Card } from 'react-native-card-stack-swiper';

const ChrisSwiper = () => {
  const swiperRef = useRef(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://tinder-oops-f804a0e0f3fe.herokuapp.com/api/users/users');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <CardStack
        style={styles.cardStack}
        cardContainerStyle={styles.cardContainer}
        ref={swiperRef}
        renderNoMoreCards={() => <Text style={styles.noMoreCardsText}>No more cards</Text>}
      >
        {cards.map(card => (
          <Card key={card.id} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <Text style={styles.label}>{card.name}</Text>
          </Card>
        ))}
      </CardStack>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { swiperRef.current.swipeLeft() }}>
            <Text style={styles.buttonText}>← swipe left</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { swiperRef.current.swipeRight() }}>
            <Text style={styles.buttonText}>swipe right →</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={() => { swiperRef.current.goBackFromTop() }}>
          <Text style={styles.resetButtonText}>undo</Text>
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
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStack: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightblue',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  noMoreCardsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChrisSwiper;