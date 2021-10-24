import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import { GREEN, INPUT_TEXT_GREY, RED } from '../constant/colors';

const size = Dimensions.get('window').width;

TextInputSimple.defaultProps = {
  inputPlaceholder: {},
  inputValue: null,
  keyboardType: null,
  url: null,
  widths: 50,
  heights: 50,
  onChangeText: null,
};

TextInputSimple.propTypes = {
  inputPlaceholder: PropTypes.any,
  inputValue: PropTypes.any,
  keyboardType: PropTypes.any,
  url: PropTypes.any,
  widths: PropTypes.any,
  heights: PropTypes.any,
  onChangeText: PropTypes.any,
};

export default function TextInputSimple(props) {
  const {inputPlaceholder, inputValue, widths, heights, keyboardType} = props;
  const {onChangeText} = props;


  return (
    <TextInput
      style={{
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: INPUT_TEXT_GREY,
        borderWidth: 1,
      }}
      placeholder={inputPlaceholder}
      onChangeText={onChangeText}
      value={inputValue}
      keyboardType={keyboardType}
    />
  );
}
