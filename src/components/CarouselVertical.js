import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants';
import {getGenreMovieApi} from '../api/movies';
import {size} from 'lodash';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);
let genres = [];

const CarouselVertical = React.memo(({data, navigation}) => {
  useEffect(() => {
    getGenreMovieApi('1').then(response => {
      genres = response.genres;
    });
  }, []);

  console.log('carousel');

  return (
    <Carousel
      layout="default"
      data={data}
      renderItem={item => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
});

const RenderItem = React.memo(({data, navigation}) => {
  const {title, poster_path, genre_ids, id} = data.item;
  const imageUrl = `${BASE_PATH_IMG}/w500/${poster_path}`;

  const genresFiltered = genres.filter(genre => {
    return genre_ids.includes(genre.id);
  });

  const onNavigation = () => navigation.navigate('movie', {id});

  return (
    <TouchableWithoutFeedback onPress={onNavigation}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genresFiltered &&
            genresFiltered.map((genre, index) => (
              <Text key={index} style={styles.genre}>
                {genre.name}
                {index !== size(genres) - 1 ? ', ' : ''}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default CarouselVertical;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});
