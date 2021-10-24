import React from 'react';
import {Button, FlatList, Text, View, Alert} from 'react-native';
import HorizontalCardContact from '../components/horizontalCardContact';

import {DELETE_ONE_CONTACT, GET_ALL_CONTACT, UPDATE_ONE_CONTACT} from '../constant/apiUrl';
import {RED} from '../constant/colors';
import {consoleDev, deleteAPI, getAPI, putAPI} from '../function/api/api';
import EditContact from './EditContact';

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
      <View style={{flex: 1}}>
        <FlatList
          style={{
            flex: 1,
            backgroundColor: RED,
          }}
          data={this.state.listContact}
          renderItem={({item}) => (
            <View>
              <HorizontalCardContact
                photo={item.photo}
                firstName={item.firstName}
                lastName={item.lastName}
                age={item.age}
             
                onPressedEdit={() => {
                  this.props.navigation.navigate('EditContact', {
                    itemId: item.id,
                  });
                }}
                onPressedDelete={()=> {this.deleteOneContact(item.id)}}
              />
            </View>
          )}
        />
        <Button title="Go to AddContact" onPress={() => this.props.navigation.navigate('AddContact')} />
        <Button title="Go to EditContact" onPress={() => this.props.navigation.navigate('EditContact')} />
      </View>
    );
  }
}
