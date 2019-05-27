/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Linking
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'
import style from 'react-native-datepicker/style';

export default class ProductsScene extends Component<{}> {
  
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
            <Title style={Styles.HEADER_TITLE}>Rewards</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={Styles.CONTENT}>
          <Text style={Styles.H1}>Refer a friend</Text>
          <Text>Refer a friend – If you refer a friend who is not yet on our radar and they end up taking a room with us receive £50 cashback!  Just send us their full name, phone number and email address and we’ll do the rest! </Text>
          <Button block style={Styles.PRIMARY_BUTTON}
            onPress={() => { 
              Linking.openURL('mailto:help@idealhouseshare.com?subject=Refer%20a%20friend') 
             }}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>Refer a friend</Text>
          </Button>
          <Text style={Styles.H1}>Secure a housemate</Text>
          <Text>If you assist us in contacting a potential lead, presenting the property well and ultimately securing the let we will issue you and your housemates with £50 in Deliveroo vouchers upon their move in.  You and the newby can enjoy a free meal on us!</Text>
        </Content>
      </Container>
    );
  }
}