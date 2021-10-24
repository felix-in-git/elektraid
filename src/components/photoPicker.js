import React, {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import {launchImageLibrary} from 'react-native-image-picker';

PhotoPicker.defaultProps = {
  containerStyle: {},
  containerPointerEvens: null,
  onStartShouldSetResponder: null,
  url: null,
  widths: 50,
  heights: 50,
  action: null,
};

PhotoPicker.propTypes = {
  containerStyle: PropTypes.any,
  containerPointerEvens: PropTypes.any,
  onStartShouldSetResponder: PropTypes.any,
  url: PropTypes.any,
  widths: PropTypes.any,
  heights: PropTypes.any,
  action: PropTypes.any,
};

export default function PhotoPicker(props) {
  const {containerStyle, containerPointerEvens, widths, heights} = props;
  const {url} = props;

  let loading = true;
  let base64 = null;

  function launchImageLibrarys() {
    consoleDev('masuk gallery picker');
    let options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log(response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        base64 = JSON.parse(JSON.stringify(response.assets[0].base64));
        // this.props.action(
        //   /*store*/
        //   response,
        // );
      }
    });
  }

  function renderImage() {
    if (base64) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + base64}}
          style={{
            width: 150,
            height: 150,
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 3,
          }}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
          style={{
            width: 150,
            height: 150,
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 3,
          }}
        />
      );
    }
  }

  function testklik() {
    consoleDev('klik');
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          launchImageLibrarys();
        }}>
        {renderImage()}
      </TouchableOpacity>
    </View>
  );
}
