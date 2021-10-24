import React from 'react';
import {TouchableOpacity, FlatList, Text, View, Alert, Image, Dimensions} from 'react-native';
import HorizontalCardContact from '../components/horizontalCardContact';

import {DELETE_ONE_CONTACT, GET_ALL_CONTACT, UPDATE_ONE_CONTACT} from '../constant/apiUrl';
import {CARD_BACKGROUND, GREEN, RED, WHITE, CAROUSEL_BACKGROUND} from '../constant/colors';
import {consoleDev, deleteAPI, getAPI, putAPI} from '../function/api/api';
import EditContact from './EditContact';
import {ICON_ADD, ICON_EDIT, ICON_DELETE, LOGO, MENU} from '../assets/icons/indexIcons';
import VerticalCardContacts from '../components/verticalCardContact';
import Header from '../components/header';

export default class ListContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      listContact: [],
    };
  }

  componentDidMount() {
    this.getContactList();
  }

  getContactList() {
    consoleDev('masuk use effect');
    getAPI(GET_ALL_CONTACT).then(response => {
      this.setState({
        listContact: JSON.parse(JSON.stringify(response.data)),
      });
    });
  }

  deleteOneContact(ID) {
    deleteAPI(DELETE_ONE_CONTACT + '/' + ID).then(response => {
      Alert.alert(response.message);
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: WHITE}}>
        {/* <Header mainText={'hehehehe'} /> */}
        <Header mainLogo={LOGO} logoRight={MENU} onPressRight={() => this.props.navigation.navigate('ListContacts')} />
        <FlatList
          style={{flex: 1, backgroundColor: CAROUSEL_BACKGROUND}}
          data={this.state.listContact}
          pagingEnabled={true}
          horizontal={true}
          renderItem={({item}) => (
            <View
              style={{
                // backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <VerticalCardContacts
                photo={item.photo}
                firstName={item.firstName}
                lastName={item.lastName}
                age={item.age}
                onPressedEdit={() => {
                  this.props.navigation.navigate('EditContact', {
                    itemId: item.id,
                  });
                }}
                onPressedDelete={() => {
                  this.deleteOneContact(item.id);
                }}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={{
            height: 100,
            right: Dimensions.get('window').width / 19,
            bottom: Dimensions.get('window').width / 18,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            justifyContent: 'flex-end',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            backgroundColor: WHITE,
            borderRadius: 50,
            elevation: 2,
          }}
          onPress={() => {
            this.props.navigation.navigate('AddContact');
          }}>
          <Image source={ICON_ADD} style={{width: 100, height: 100}} />
        </TouchableOpacity>
      </View>
    );
  }
}
