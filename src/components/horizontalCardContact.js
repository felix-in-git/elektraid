import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {BLACK, BLUE, GREEN, INPUT_TEXT_GREY, RED, WHITE, CARD_BACKGROUND} from '../constant/colors';
import SimplePhoto from './simplePhoto';
import {Dimensions} from 'react-native';
import TextView from './textView';
import {YEARS_OLD} from '../lang/en';
import {ICON_EDIT, ICON_DELETE} from '../assets/icons/indexIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

HorizontalCardContact.defaultProps = {
  firstName: 'firstName',
  lastName: 'lastName',
  age: 'age',
  photo: 'https://reactnative.dev/img/tiny_logo.png',
  onPressedProfile: () => {},
  onPressedEdit: () => {},
  onPressedDelete: () => {},
};

HorizontalCardContact.propTypes = {
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  age: PropTypes.any,
  photo: PropTypes.any,
  onPressedProfile: PropTypes.any,
  onPressedEdit: PropTypes.any,
  onPressedDelete: PropTypes.any,
};

export default function HorizontalCardContact(props) {
  const {firstName, lastName, age, photo, onPressedProfile, onPressedEdit, onPressedDelete} = props;

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        height: 80,
        width: '90%',
        margin: 5,
        borderRadius: 10,
        backgroundColor: WHITE,
        borderColor: CARD_BACKGROUND,
        shadowColor: CARD_BACKGROUND,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}>
      <TouchableOpacity onPress={onPressedProfile} style={{flex: 2, marginRight: 5}}>
        <SimplePhoto url={photo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedProfile} style={{flex: 4, marginRight: 5, alignSelf: 'center'}}>
        <TextView textLabel={firstName + ', ' + lastName} />
        <TextView textLabel={age + YEARS_OLD} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedEdit} style={{flex: 1, marginRight: 5}}>
        {/* <SimplePhoto url={photo} widths={30} heights={30} /> */}
        <Image source={ICON_EDIT} style={{width: 20, height: 20}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedDelete} style={{flex: 1, marginRight: 5}}>
        <Image source={ICON_DELETE} style={{width: 20, height: 20}} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
