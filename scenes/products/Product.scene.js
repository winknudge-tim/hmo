/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

export default class ProductScene extends Component<{}> {
  
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
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.product.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ margin: 12 }}>
          <Button block onPress={this.goForward} style={Styles.PRIMARY_BUTTON}>
            <Text>{this.props.Lang.product.buy}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}