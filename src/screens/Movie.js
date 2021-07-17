import {map} from 'lodash';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {getMovieById} from '../api/movies';
import ModalVideo from '../components/ModalVideo';
import {BASE_PATH_IMG} from '../utils/constants';
import startDark from '../assets/png/starDark.png';
import startLight from '../assets/png/starLight.png';
import usePreferences from '../hooks/usePreferences';

const Movie = ({route}) => {
  const {id} = route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const {theme} = usePreferences();

  useEffect(() => {
    getMovieById(id).then(response => setMovie(response));
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {movie && <MovieImage posterPath={movie.poster_path} />}
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <MovieRating
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
          theme={theme}
        />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, {marginBottom: 30}]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>
      <ModalVideo setShow={setShowVideo} show={showVideo} idMovie={id} />
    </>
  );
};

const MovieImage = ({posterPath}) => {
  const url = `${BASE_PATH_IMG}/w500${posterPath}`;

  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{uri: url}} />
    </View>
  );
};

const MovieTrailer = ({setShowVideo}) => {
  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
};

const MovieTitle = ({movie}) => {
  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.viewGenres}>
        {map(movie.genres, genre => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

const MovieRating = ({voteCount, voteAverage, theme}) => {
  const media = voteAverage / 2;

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
      <Text style={{fontSize: 16, marginRight: 5, color: '#fff'}}>{media}</Text>
      <Text style={{fontSize: 12, color: '#8697a5'}}>{voteCount} votos</Text>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenres: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 10,
    color: '#8697a5',
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    textAlign: 'justify',
    color: '#8697a5',
  },
});
