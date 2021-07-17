import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenresMoviesApi,
} from '../api/movies';
import {Title} from 'react-native-paper';
import CarouselVertical from '../components/CarouselVertical';
import {map} from 'lodash';
import CarouselMulti from '../components/CarouselMulti';

const Home = ({navigation}) => {
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState(null);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  useEffect(() => {
    getNewsMoviesApi().then(response => setNewMovies(response.results));
  }, []);

  useEffect(() => {
    getAllGenresApi().then(response => setGenreList(response.genres));
  }, []);

  useEffect(() => {
    getGenresMoviesApi(genreSelected).then(response =>
      setGenreMovies(response.results),
    );
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas peliculas</Title>
          <CarouselVertical navigation={navigation} data={newMovies} />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Peliculas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {genreList &&
            map(genreList, genre => (
              <Text
                style={[
                  styles.genre,
                  {color: genre.id !== genreSelected ? '#8697a5' : '#fff'},
                ]}
                onPress={() => onChangeGenre(genre.id)}
                key={genre.id}>
                {genre.name}
              </Text>
            ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
