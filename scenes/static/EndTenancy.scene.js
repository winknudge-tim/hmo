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
import moment from 'moment'

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'
import style from 'react-native-datepicker/style';

export default class EndTenancyScene extends Component<{}> {
  
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
            <Title style={Styles.HEADER_TITLE}>End Tenancy</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={Styles.CONTENT}>
          <Text>The Tenant agrees to give not less than TWO MONTHS written notice of his intention to terminate the Tenancy. All notices must be received in writing by the Landlord or His Agent before or on the First Day of the Month or the Fifteenth Day of the Month, with the termination date to be 12pm on the Last Day of a month or 12pm on the Fourteenth Day of a Month.*</Text>
          <Button block style={Styles.PRIMARY_BUTTON}
            onPress={() => { 
              Linking.openURL('mailto:help@idealhouseshare.com?subject=Terminate%20tenancy') 
             }}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>End Tenancy</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}