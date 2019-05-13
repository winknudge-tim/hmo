/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Dimensions
} from 'react-native';

import _ from 'lodash'
import moment from 'moment'

import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, List, ListItem, Badge } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';


import { Actions } from 'react-native-router-flux';

import Styles from '../configs/styles'
import ImageConfig from '../configs/images'

import ProgressBar from '../components/ProgressBar'

const { width: deviceWidth } = Dimensions.get('window');

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as rtActions } from '../reducers/registrationProgressReducer'
import { actions as locationActions } from '../actions/locationActions'
import { actions as geoActions } from '../reducers/geoReducer'
import { actions as msgActions } from '../actions/messagesActions'

import firebase from 'react-native-firebase';

import MessagesService from '../services/messages.service'

class PropertyScene extends Component<{}> {
  
  constructor(props) {
    super(props);

    this.state = {
      lastCheckedDateTime: null
    }
  }

  componentDidMount() {
    this.props.getRegistrationProgress(this.props.authReducer.userId)
    this.props.getState(this.props.authReducer.userId)
    this.props.getMessages(this.props.authReducer.propId, this.props.authReducer.userId)
    
    MessagesService.getDateOfLastMessageChecked()
      .then((lastCheckedDateTime) => {
        console.log(lastCheckedDateTime)
        this.setState({
          lastCheckedDateTime
        })
      })
      .catch(() => {

      })


    firebase.messaging().hasPermission()
      .then(enabled => {
       
        if (enabled) {
          // user has permissions
          firebase.messaging().getToken()
          .then(fcmToken => {
            if (fcmToken) {
              // user has a device token
              console.log(fcmToken)
            } else {
              // user doesn't have a device token yet
            } 
          });
          
        } else {
          // user doesn't have permission

          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised  
              console.log('authired')
            })
            .catch(error => {
              // User has rejected permissions  
              console.log(error)
            });
        } 
      })
  }

  goBack () {
    Actions.pop();
  }

  gotToMessages = () => {

    MessagesService.setDateOfLastMessageChecked()
      .then((lastCheckedDateTime) => {
        this.setState({
          lastCheckedDateTime
        }, () => {
          Actions.conversationsScene()
        } )
      })
      .catch(() => {
        Actions.conversationsScene()
      })
  }

  get numberOfNewMessages () {
    const { messages } = this.props.messagesReducer
    const { lastCheckedDateTime } = this.state
    var num = 0

    _.each(messages, (message) => {
      if (moment(lastCheckedDateTime).isBefore(new Date(message.DateUpdated))) {
        ++num
      }
    })

    return num
  }

  render () {
    var { registrationProgressReducer, geoReducer, authReducer } = this.props

    var registrationProgress = registrationProgressReducer.payload || []

    var incomplete = _.filter(registrationProgress, { Complete: "FALSE" })

    if (!incomplete) {
      incomplete = []
    }

    var progressPec = ( incomplete.length / registrationProgress.length) * 100
    progressPec = Number(progressPec.toFixed(0))

    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.property.title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={Actions.profileScene}>
              <Icon name='contact' style={Styles.HEADER_ICON} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Image source={ImageConfig.TEST_HOUSE} style={{ height: 200, width: deviceWidth }} />
          {progressPec < 100 && <ProgressBar progress={progressPec} />}
          <List>
            {incomplete.length > 0 && 
            <ListItem button={true} onPress={Actions.checklistScene}>
              <Left>
                <Icon name="ios-list-box-outline" />
                <Text style={{ fontWeight: 'bold' }}>Registration incomplete!</Text>
              </Left>
              <Right>
                <Badge>
                  <Text>{incomplete.length}</Text>
                </Badge>
              </Right>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>}
            <ListItem button={true} onPress={() => { 
                if (!geoReducer.loading) {
                  this.props.setState(authReducer.userId, !geoReducer.userAtHome)
                }
              }}>
              <Left>
                <Icon name="navigate" />
                <Text>Check {geoReducer.isHome ? 'out' : 'in'}</Text>
              </Left>
            </ListItem>
            <ListItem button={true} onPress={Actions.housematesScene}>
              <Left>
                <Icon name="people" />
                <Text>Housemates home</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={this.gotToMessages}>
              <Left>
                <Icon name="chatbubbles" />
                <Text>Messages</Text>
              </Left>
              {this.numberOfNewMessages > 0 && <Right>
                <Badge>
                  <Text>{this.numberOfNewMessages}</Text>
                </Badge>
              </Right>}
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={Actions.productsScene}>
              <Left>
                <Icon name="cart" />
                <Text>Products</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={Actions.incidentsScene}>
              <Left>
                <Icon name="alert" />
                <Text>Incidents</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={Actions.calendarScene}>
              <Left>
                <Icon name="calendar" />
                <Text>Calendar</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={Actions.documentListScene}>
              <Left>
                <Icon name="document" />
                <Text>Documents</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(rtActions, dispatch),
  ...bindActionCreators(locationActions, dispatch),
  ...bindActionCreators(geoActions, dispatch),
  ...bindActionCreators(msgActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyScene);