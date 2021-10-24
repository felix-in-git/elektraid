import React from 'react';
import {Alert, Dimensions, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {ARROW_LEFT, CAROUSEL, ICON_ADD, LOGO} from '../assets/icons/indexIcons';
import Header from '../components/header';
import HorizontalCardContact from '../components/horizontalCardContact';
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
    consoleDev('masuk list contact');
    this.getContactList();
    this.willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
      this.getContactList();
    });

    const {navigation} = this.props;
    navigation.addListener('willFocus', () => {
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
        <Header
          mainLogo={LOGO}
          logoRight={CAROUSEL}
          onPressRight={() => this.props.navigation.goBack()}
          logoLeft={ARROW_LEFT}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <FlatList
          style={{
            paddingTop: 10,
            flex: 1,
            backgroundColor: CAROUSEL_BACKGROUND,
            zIndex: -1,
          }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          data={this.state.listContact}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
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
