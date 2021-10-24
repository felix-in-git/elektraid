import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {BLACK, BLUE, GREEN, INPUT_TEXT_GREY, RED, WHITE, CARD_BACKGROUND, BACKGROUND} from '../constant/colors';
import SimplePhoto from './simplePhoto';
import {Dimensions} from 'react-native';
import TextView from './textView';
import {YEARS_OLD} from '../lang/en';
import {ICON_EDIT, ICON_DELETE} from '../assets/icons/indexIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

VerticalCardContacts.defaultProps = {
  firstName: 'firstName',
  lastName: 'lastName',
  age: 'age',
  photo: 'https://reactnative.dev/img/tiny_logo.png',
  onPressedProfile: () => {},
  onPressedEdit: () => {},
  onPressedDelete: () => {},
};

VerticalCardContacts.propTypes = {
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  age: PropTypes.any,
  photo: PropTypes.any,
  onPressedProfile: PropTypes.any,
  onPressedEdit: PropTypes.any,
  onPressedDelete: PropTypes.any,
};

export default function VerticalCardContacts(props) {
  const {firstName, lastName, age, photo, onPressedProfile, onPressedEdit, onPressedDelete} = props;

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 2,
        flexDirection: 'row',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: BACKGROUND,
      }}>
      <View
        style={{
          flex: 1,
          margin: 40,
          flexDirection: 'column',
          backgroundColor: WHITE,
          borderRadius: 20,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View style={{flex: 3}}>
          <SimplePhoto url={photo} heights={250} widths={250} />
        </View>
        <View
          style={{
            borderBottomColor: INPUT_TEXT_GREY,
            borderBottomWidth: 2,
          }}
        />
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', marginBottom: -20}}>
          <TextView textLabel={firstName + ', ' + lastName} textSize={40} fontStyle={'italic'} />
          <View style={{margin: 10}} />
          <TextView textLabel={age + YEARS_OLD} />
        </View>
        <View
          style={{
            borderBottomColor: INPUT_TEXT_GREY,
            borderBottomWidth: 2,
          }}
        />
        <View style={{flex: 0.5, flexDirection: 'row', marginBottom: 5}}>
          <TouchableOpacity onPress={onPressedEdit} style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 30}}>
            <Image source={ICON_EDIT} style={{width: 40, height: 40}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressedDelete}
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 30}}>
            <Image source={ICON_DELETE} style={{width: 40, height: 40}} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
