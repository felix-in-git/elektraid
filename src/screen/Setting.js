import React from 'react';
import {Dimensions, Modal, Text, View} from 'react-native';
import {consoleDev} from '../function/api/api';

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
