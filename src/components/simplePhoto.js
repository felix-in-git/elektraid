import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import {CARD_BACKGROUND, WHITE} from '../constant/colors';
import {ICON_PROFILE} from '../assets/icons/indexIcons';

SimplePhoto.defaultProps = {
  containerStyle: {},
  containerPointerEvens: null,
  onStartShouldSetResponder: null,
  url: null,
  widths: 60,
  heights: 60,
};

SimplePhoto.propTypes = {
  containerStyle: PropTypes.any,
  containerPointerEvens: PropTypes.any,
  onStartShouldSetResponder: PropTypes.any,
  url: PropTypes.any,
  widths: PropTypes.any,
  heights: PropTypes.any,
};

export default function SimplePhoto(props) {
  const {containerStyle, containerPointerEvens, widths, heights} = props;
  const {url} = props;

  let loading = true;
  let error = false;

  function onLoadEnd() {
    loading = false;
  }

  function checkImageNull(input) {
    if (input && input != 'N/A') {
      return {uri: input};
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
