/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
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

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class ConversationsScene extends Component {
  
  componentWillMount() {

    this.props.getMessages(this.props.authReducer.propId, this.props.authReducer.userId)

  }

  componentWillReceiveProps(nextProps) {

    if (this.props.messagesReducer.type !== nextProps.messagesReducer.type && nextProps.messagesReducer.type === actionTypes.CREATED_MESSAGE_SUCCESS) {
      this.props.getMessages(this.props.authReducer.propId, this.props.authReducer.userId)
    }

  }

  goBack () {

    Actions.pop();

  }

  goToConversation (message) {

    
   this.props.selectMessage(message)
   Actions.chatScene();

  }

  renderConversations () {

    let messages = this.props.messagesReducer.messages
    var list = []

    _.each(messages, (message, key) => {

      list.push(
        <ListItem button={true} onPress={() => { this.goToConversation(message) }} key={key}>
          <Left>
            <Text>{message.Title}</Text>
          </Left> 
          <Right>
            <Text style={{ fontSize: 11 }}>{moment(message.DateUpdated).format('h:mma DD/MM/YYYY')}</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      )

    })

    return list

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
            <Button transparent>
              <Icon name='add' onPress={() => { Actions.newConversationScene() }} style={Styles.HEADER_ICON} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.renderConversations()}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScene);

