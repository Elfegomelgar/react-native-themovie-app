import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Modal, IconButton, Title} from 'react-native-paper';
import WebView from 'react-native-webview';
import YouTube from 'react-native-youtube';
import {getVideoMovieApi} from '../api/movies';
import {YOUTUBE_API_KEY} from '../utils/constants';

const ModalVideo = ({show, setShow, idMovie}) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    getVideoMovieApi(idMovie).then(response =>
      response.results.find(video => {
        if (video.site === 'YouTube') {
          setVideo(video);
          return true;
        }
      }),
    );
  }, [idMovie]);

  if (video == null) {
    return <></>;
  }

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube
          apiKey={YOUTUBE_API_KEY}
          videoId={video.key}
          style={styles.video}
        />
      ) : (
        <WebView
          style={{width: 500}}
          source={{
            uri: `https://www.youtube.com/embed/${video.key}?controls=0&showinfo=0`,
          }}
        />
      )}

      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
};

export default ModalVideo;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
