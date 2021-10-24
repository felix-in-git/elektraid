import React from 'react';
import {Button, View, Text, Dimensions, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import SimplePhoto from '../components/simplePhoto';
import TextInputSimple from '../components/textInputSimple';
import {AGE, FIRST_NAME, LAST_NAME} from '../lang/en';
import ListContacts from './ListContacts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {consoleDev} from '../function/api/api';

const size = Dimensions.get('window').width;

export default class AddContact extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      age: null,

      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      base64: '',
    };
  }

  launchImageLibrary() {
    consoleDev('masuk gallery picker');
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64: true
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
        //   let source = { uri: response.assets.uri };
        let base64 = JSON.parse(JSON.stringify(response.assets[0].base64));
        consoleDev(base64)
        this.setState({
            base64 : base64
        })
      }
    });
  }

  renderImage() {
    if (this.state.base64) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.base64}}
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



  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1.3,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        
          <View>
            {this.renderImage()}
          </View>
        
        </View>
        <View style={{flex: 2, margin: 30}}>
          <TextInputSimple
            onChangeText={value => {
              this.setState({
                firstName: value,
              });
            }}
            inputValue={this.state.firstName}
            inputPlaceholder={FIRST_NAME}
          />
          <TextInputSimple
            onChangeText={value => {
              this.setState({
                lastName: value,
              });
            }}
            inputValue={this.state.lastName}
            inputPlaceholder={LAST_NAME}
          />
          <TextInputSimple
            onChangeText={value => {
              this.setState({
                age: value,
              });
            }}
            inputValue={this.state.age}
            inputPlaceholder={AGE}
            keyboardType={'numeric'}
          />
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('ListContacts')}
          />

          <Button
            title="Go to ssssDetails"
            onPress={() => this.launchImageLibrary()}
          />
        </View>
      </View>
    );
  }
}
