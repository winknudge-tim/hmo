/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Clipboard
} from 'react-native';

import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';


import Styles from '../../configs/styles'

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../reducers/authReducer'

import firebase from 'react-native-firebase';


function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class ProfileScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  goBack () {

    Actions.pop();

  }

  doLogout () {

    this.props.logout()

  }

  getSelectedImages () {

  }

  doCopy = () => {

    firebase.messaging().getToken()
    .then(fcmToken => {
      if (fcmToken) {
        // user has a device token
        Clipboard.setString(fcmToken)
        alert('copied')
      } else {
        alert('no toekn')
        // user doesn't have a device token yet
      } 
    })
    .catch((err) => {
      console.log(err)
      alert('error')
    })

  }

  copyNotifcationId () {
    

    firebase.messaging().hasPermission()
      .then(enabled => {
        console.log(enabled)
       
        if (enabled) {
          // user has permissions
         this.doCopy()
          
        } else {
          // user doesn't have permission

          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised  
              console.log('authired')
              this.doCopy()
            })
            .catch(error => {
              // User has rejected permissions  
              console.log(error)
              alert('you rejected')
            });
        } 
      })
      .catch((err) => {
        console.log(err)
        alert('error')
      })

  }

  render () {
    return (
      <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.profile.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>          
         <List>
            {/*<ListItem button={true} onPress={this.copyNotifcationId.bind(this)}>
              <Left>
                <Icon name="exit" />
                <Text>Copy notifcations id</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>*/}
            <ListItem button={true} onPress={Actions.cardDetailsScene}>
              <Left>
                <Icon name="card" />
                <Text>Update card details</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            
            <ListItem button={true} onPress={this.doLogout.bind(this)}>
              <Left>
                <Icon name="exit" />
                <Text>{this.props.Lang.profile.logout}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>

      </Container>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);

var styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 200
  },
});
