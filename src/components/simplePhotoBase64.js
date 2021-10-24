import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import {CARD_BACKGROUND} from '../constant/colors';
import {ICON_PROFILE} from '../assets/icons/indexIcons';

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
    consoleDev('masuk image');
    consoleDev(input.substring(0, 21));
    if (input && input != 'N/A') {
      if (input.substring(0, 21) == 'data:image/png;base64' || input.substring(0, 23) == 'data:image/jpeg;base64,') {
        consoleDev('base64');
        return {uri: input};
      } else if (input.substring(0, 4) == 'http') {
        return {uri: input};
      } else {
        return {uri: 'data:image/jpeg;base64,' + input};
      }
    } else {
      return ICON_PROFILE;
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
          borderRadius: 15,
        }}
        onLoadEnd={onLoadEnd()}
        source={checkImageNull(url)}
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
