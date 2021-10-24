import React, {useState} from 'react';
import {ActivityIndicator, Image, TextInput, Text, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import {BLACK, GREEN, INPUT_TEXT_GREY, RED} from '../constant/colors';

const size = Dimensions.get('window').width;

TextView.defaultProps = {
  textColor: BLACK,
  textSize: 16,
  textFont: 'Roboto',
  textFontWeight: 'normal',
  textBackgroundColor: 'transparent',
  textLines: null,

  textLabel: null,
  textStyle: {},
  textFontAlign: 'left',
  fontStyle: 'normal',
};

TextView.propTypes = {
  inputPlaceholder: PropTypes.any,
  inputValue: PropTypes.any,
  keyboardType: PropTypes.any,
  url: PropTypes.any,
  widths: PropTypes.any,
  heights: PropTypes.any,
  onChangeText: PropTypes.any,
  fontStyle: PropTypes.any,
};

export default function TextView(props) {
  const {textColor, textSize, textFont, textFontWeight, textFontAlign, textLines, fontStyle} = props;
  const {textLabel} = props;
  const {textStyle} = props;

  const textStyles = [];
  textStyles.push({
    margin: 0,
    padding: 0,
    marginBottom: 0,
    fontFamily: textFont,
    fontSize: textSize,
    color: textColor,
    fontWeight: textFontWeight,
    backgroundColor: 'transparent',
    textAlign: textFontAlign,
    fontStyle: fontStyle,
  });
  textStyles.push(textStyle);

  return (
    <Text allowFontScaling={false} style={textStyles} numberOfLines={textLines}>
      {textLabel === null ? '' : textLabel}
    </Text>
  );
}
