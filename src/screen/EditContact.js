import React from 'react';
import {Button, View, Text, Dimensions, Image, TouchableOpacity, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import SimplePhoto from '../components/simplePhoto';
import TextInputSimple from '../components/textInputSimple';
import {AGE, ERROR_IMAGE_EMPTY, ERROR_LENGTH_AGE, ERROR_LENGTH_FIRST_NAME, ERROR_LENGTH_LAST_NAME, FIRST_NAME, LAST_NAME} from '../lang/en';
import ListContacts from './ListContacts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {consoleDev, postAPI, getAPI, putAPI} from '../function/api/api';
import PhotoPicker from '../components/photoPicker';
import {RED, WHITE} from '../constant/colors';
import SimplePhotoBase64 from '../components/simplePhotoBase64';
import {GET_ONE_CONTACT, SEND_ONE_CONTACT, UPDATE_ONE_CONTACT, GET_ALL_CONTACT} from '../constant/apiUrl';
import {useRoute} from '@react-navigation/native';

const size = Dimensions.get('window').width;

export default class AddContact extends React.Component {
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      age: 0,
      photo: '',
      id: '',

      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      base64: '',

      myContact: '',
    };
  }

  componentDidMount() {
    const {itemId} = this.props.route.params;
    consoleDev('anu ' + itemId);
    this.getContactList(itemId);
  }

  launchImageLibrarys() {
    consoleDev('masuk gallery picker');
    let options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        consoleDev('User cancelled photo picker');
      } else if (response.error) {
        consoleDev('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        consoleDev('User tapped custom button: ', response.customButton);
      } else {
        let base64 = JSON.parse(JSON.stringify(response.assets[0].base64));
        this.setState({
          base64: base64,
        });
      }
    });
  }

  getContactList(ID) {
    consoleDev('masuk use getContactList');
    getAPI(GET_ONE_CONTACT + '/' + ID).then(response => {
      let temp = JSON.parse(JSON.stringify(response.data));
      consoleDev(temp);
      this.setState({
        firstName: temp.firstName,
        lastName: temp.lastName,
        age: temp.age.toString(),
        base64: temp.photo,
        id: temp.id,
      });
    });
  }

  sentNewContact() {
    let request = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: 'data:image/png;base64,' + this.state.base64,
    };

    putAPI(UPDATE_ONE_CONTACT + '/' + this.state.id, request).then(response => {
      Alert.alert(response.message);
    });
  }

  validation() {
    if (!this.state.base64) {
      Alert.alert(ERROR_IMAGE_EMPTY);
    } else if (this.state.firstName.length < 3 || this.state.firstName.length > 30) {
      Alert.alert(ERROR_LENGTH_FIRST_NAME);
    } else if (this.state.lastName.length < 3 || this.state.lastName.length > 30) {
      Alert.alert(ERROR_LENGTH_LAST_NAME);
    } else if (this.state.age <= 0 || this.state.age > 200) {
      Alert.alert(ERROR_LENGTH_AGE);
    } else {
      this.sentNewContact();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: WHITE,
        }}>
        <View
          style={{
            flex: 1.3,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity onPress={() => this.launchImageLibrarys()} style={{flex: 1, margin: 5}}>
              <SimplePhotoBase64 url={this.state.base64} widths={200} heights={200} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 2, margin: 30}}>
          <Text></Text>
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
          <Button title="Submit" onPress={() => this.validation()} />
        </View>
      </View>
    );
  }
}
