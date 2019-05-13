/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native'

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base'
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid'

import _ from 'lodash'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import { actions, actionTypes } from '../../actions/messagesActions'

import Styles from '../../configs/styles'

import { GiftedChat } from "react-native-gifted-chat"

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class ConversationsScene extends Component {
  
    state = {
        messages: []
    }

    componentWillMount() {

        this.props.selectMessage({
            "ChaId": "74",
            "Title": "Fff",
            "CreatedBy": "Luke",
            "DateCreated": "Sun Apr 07 2019 17:49:17 GMT+01:00",
            "DateUpdated": "Sun Apr 07 2019 17:49:17 GMT+01:00"
        })
      }

      onSend(messages = []) {

        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages)
        }));
      }

    componentWillReceiveProps (nextProps) {
        var messageData = nextProps.singleMessage.payload
        var formattedMsgs = []

        _.each(messageData, (msg, index) => {
            var formattedMsg = {
                _id: index,
                text: msg.Message,
               // image: 'https://placeimg.com/540/340/any',
                createdAt: new Date(msg.MessageDate),
                user: {
                  _id: msg.UsrId,
                  name: msg.FirstName + " " + msg.SecondName,
                  avatar: "https://placeimg.com/140/140/any"
                }
              }
            formattedMsgs.push(formattedMsg)
        })

        this.setState({
            messages: formattedMsgs
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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.conversations.title}</Title>
          </Body>
          <Right>
           
          </Right>
        </Header>
            <View style={{ flex: 1 }}>
                <GiftedChat
                renderUsernameOnMessage
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                _id: this.props.authReducer.propId
                }}
            />
            </View>
        </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScene);

