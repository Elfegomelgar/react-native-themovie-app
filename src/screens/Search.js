import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {searchMoviesApi} from '../api/movies';
import {Searchbar} from 'react-native-paper';
import {map, size} from 'lodash';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

const Search = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  console.log(movies);

  useEffect(() => {
    if (size(search) > 2) {
      searchMoviesApi(search).then(response => setMovies(response.results));
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu pelicula"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={e => setSearch(e)}
        autoFocus={true}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Movie = ({movie, navigation}) => {
  const {title, id, poster_path} = movie;
  const urlImage = `${BASE_PATH_IMG}/w500${poster_path}`;

  const goMovie = () => {
    navigation.navigate('movie', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{uri: urlImage}} />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
