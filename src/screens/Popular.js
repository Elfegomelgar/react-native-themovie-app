import {map} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {getPopularMoviesApi} from '../api/movies';
import noImage from '../assets/png/default-image.png';
import {BASE_PATH_IMG} from '../utils/constants';
import startDark from '../assets/png/starDark.png';
import startLight from '../assets/png/starLight.png';
import usePreferences from '../hooks/usePreferences';

const Popular = ({navigation}) => {
  const [movies, setMovies] = useState(null);
  const {theme} = usePreferences();
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);

  useEffect(() => {
    getPopularMoviesApi(page).then(response => {
      const totalPages = response.total_pages;

      if (page < totalPages) {
        if (movies == null) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie
          key={index}
          movie={movie}
          theme={theme}
          navigation={navigation}
        />
      ))}
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.lodadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
};

const Movie = ({movie, theme, navigation}) => {
  const {id, poster_path, title, release_date, vote_count, vote_average} =
    movie;
  const url = `${BASE_PATH_IMG}/w500${poster_path}`;
  const goMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={poster_path ? {uri: url} : noImage}
          />
        </View>
        <View>
          <Title>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating
            vote_count={vote_count}
            vote_average={vote_average}
            theme={theme}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MovieRating = ({theme, vote_count, vote_average}) => {
  const media = vote_average / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? startDark : startLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 12, color: '#8697a5', marginTop: 5}}>
        {vote_count} votos
      </Text>
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  lodadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
