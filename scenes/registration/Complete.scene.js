/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, H3 } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

export default class RegistrationCompleteScene extends Component<{}> {
  
  goBack () {

    Actions.pop();

  }

  goForward () {

    Actions.main();

  }

  render () {


    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Body>
            <Title>{this.props.Lang.registrationComplete.title}</Title>
          </Body>
        </Header>
        <View style={{ flex: 1 }}>
          <Content>
            <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>Thank you for registering. Your payment is being processed and we will get back to you as soon as possible.</Text>
            <Text style={{ fontSize: 16, margin: 10 }}>To allow us to process the tenancy agreement as quickly as possible please make sure all sections of your registeration are completed as soon as possible. Failure to do so could result in delays.</Text>  
          </Content>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={this.goForward}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.registrationComplete.next}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}