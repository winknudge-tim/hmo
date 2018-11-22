/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import { actions } from '../../actions/messagesActions'

import Styles from '../../configs/styles'

export default class MessagesScene extends Component<{}> {
  
  goBack () {

    Actions.pop();

  }

  goForward () {

    //Actions.guarantorScene();

  }

  render () {
    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.messages.title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='contact' style={Styles.HEADER_ICON} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem button={true}>
              <Left>
                <Text style={Styles.HEADER_TITLE}>Messages</Text>
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