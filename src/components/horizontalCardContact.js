import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {BLACK, BLUE, GREEN, RED} from '../constant/colors';
import SimplePhoto from './simplePhoto';
import {Dimensions} from 'react-native';

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
    <View
      style={{
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        height: 80,
        width: windowWidth,
        margin: 5,
        backgroundColor: BLACK,
      }}>
      <TouchableOpacity onPress={onPressedProfile} style={{flex: 2, margin: 5, backgroundColor: RED}}>
        <SimplePhoto url={photo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedProfile} style={{flex: 4, margin: 5, backgroundColor: GREEN}}>
        <Text>{firstName + ', ' + lastName}</Text>
        <Text>{age}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedEdit} style={{flex: 1, margin: 5, backgroundColor: BLUE}}>
        <SimplePhoto url={photo} widths={30} heights={30} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressedDelete} style={{flex: 1, margin: 5, backgroundColor: RED}}>
        <SimplePhoto url={photo} widths={30} heights={30} />
      </TouchableOpacity>
    </View>
  );
}
