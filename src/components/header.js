import PropTypes from 'prop-types';
import React from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View} from 'react-native';
import {LOGO} from '../assets/icons/indexIcons';
import {INPUT_TEXT_GREY, WHITE} from '../constant/colors';
import TextView from './textView';

const size = Dimensions.get('window').width;

Header.defaultProps = {
  onPressLeft: () => {},
  onPressRight: () => {},
  logoLeft: null,
  logoRight: null,
  mainLogo: null,
  mainText: '',
};

Header.propTypes = {
  onPressLeft: PropTypes.any,
  onPressRight: PropTypes.any,
  logoLeft: PropTypes.any,
  logoRight: PropTypes.any,
  mainLogo: PropTypes.any,
  mainText: PropTypes.any,
};

export default function Header(props) {
  const {onPressLeft, onPressRight, logoLeft, logoRight, mainLogo, mainText} = props;

  let iconSize = 30;

  function ifLogo() {
    if (mainLogo) {
      return 60;
    } else {
      return 0;
    }
  }

  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
        borderBottomColor: INPUT_TEXT_GREY,
        borderBottomWidth: 2,
      }}>
      <TouchableOpacity onPress={onPressLeft} style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20}}>
        <Image source={logoLeft} style={{width: iconSize, height: iconSize}} />
      </TouchableOpacity>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: ifLogo()}}>
        {mainText ? (
          <TextView textSize={20} textLabel={mainText} />
        ) : (
          <Image source={mainLogo} style={{width: 200, height: 40, paddingLeft: 60}} />
        )}
      </View>
      <TouchableOpacity onPress={onPressRight} style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 20}}>
        <Image source={logoRight} style={{width: iconSize, height: iconSize}} />
      </TouchableOpacity>
    </View>
  );
}
