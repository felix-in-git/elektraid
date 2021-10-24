import React from 'react';
import {Alert, Dimensions, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {ICON_ADD, LOGO, MENU} from '../assets/icons/indexIcons';
import Header from '../components/header';
import VerticalCardContacts from '../components/verticalCardContact';
import {DELETE_ONE_CONTACT, GET_ALL_CONTACT} from '../constant/apiUrl';
import {CAROUSEL_BACKGROUND, WHITE} from '../constant/colors';
import {consoleDev, deleteAPI, getAPI} from '../function/api/api';

export default class ListContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      listContact: [],
      isFetching: false,
    };
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  componentDidMount() {
    consoleDev('masuk carousel contact');
    this.getContactList();
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
      this.getContactList();
    });

    // this.getContactList();
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.getContactList();
    });
  }

  getContactList() {
    consoleDev('masuk use effect');
    getAPI(GET_ALL_CONTACT).then(response => {
      this.setState({
        listContact: JSON.parse(JSON.stringify(response.data)),
        isFetching: false,
      });
    });
  }

  deleteOneContact(ID) {
    deleteAPI(DELETE_ONE_CONTACT + '/' + ID)
      .then(response => {
        Alert.alert(response.message);
      })
      .then(() => {
        this.getContactList();
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
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
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
                age={item.age.toString()}
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
