import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

const CardSwiper2 = ({ cards }) => {
  return (
    <Swiper style={styles.wrapper} showsButtons>
      {cards.map((card) => (
        <View key={card.id} style={styles.slide}>
          <FastImage
            style={styles.image}
            source={{
              uri: card.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.text}>{card.text}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CardSwiper2;