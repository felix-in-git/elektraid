import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';

SimplePhotoBase64.defaultProps = {
  containerStyle: {},
  containerPointerEvens: null,
  onStartShouldSetResponder: null,
  url: null,
  widths: 50,
  heights: 50,
};

SimplePhotoBase64.propTypes = {
  containerStyle: PropTypes.any,
  containerPointerEvens: PropTypes.any,
  onStartShouldSetResponder: PropTypes.any,
  url: PropTypes.any,
  widths: PropTypes.any,
  heights: PropTypes.any,
};

export default function SimplePhotoBase64(props) {
  const {containerStyle, containerPointerEvens, widths, heights} = props;
  const {url} = props;

  let loading = true;
  let error = false;

  function onLoadEnd() {
    loading = false;
  }

  function checkImageNull(input) {
    consoleDev("masuk image")
    consoleDev(input.substring(0, 21))
    if (input && input != 'N/A') {
      if (input.substring(0, 21) == 'data:image/png;base64' || input.substring(0,23) == 'data:image/jpeg;base64,') {
        consoleDev('base64');
        return input;
      } else if (input.substring(0, 4) == 'http') {
        return input;
      } else {
        return 'data:image/jpeg;base64,' + input;
      }
    } else {
      return 'https://reactnative.dev/img/tiny_logo.png';
    }
  }

  function onErrorImage() {
    error = true;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: widths,
          height: heights,
          borderRadius: 5,
        }}
        onLoadEnd={onLoadEnd()}
        source={{uri: checkImageNull(url)}}
        onError={() => onErrorImage()}
      />
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        animating={loading}
      />
    </View>
  );
}
