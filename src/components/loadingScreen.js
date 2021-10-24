import React, {useState} from 'react';
import {ActivityIndicator, Image, Text, View, Dimensions, Modal} from 'react-native';
import PropTypes from 'prop-types';
import {consoleDev} from '../function/api/api';
import {GREEN, INPUT_TEXT_GREY, RED} from '../constant/colors';

const size = Dimensions.get('window').width;
let loading = false;

export class LoadingScreen extends React.Component {
  static toggleLoading(loadingStatus) {
    loading = loadingStatus;
    consoleDev('load ' + loading);
  }

  render() {
    return (
      <Modal
        // overlayColor={'rgba(235, 235, 235, 0.5)'}
        visible={loading}
        // modalClose={this.props.loadingClose}
        animationType={'fade'}
        // modalBackgroundColor={'transparent'}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>LOADING</Text>
        </View>
      </Modal>
    );
  }
}
