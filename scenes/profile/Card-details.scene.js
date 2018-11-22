/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import { Container, Header, Content, Form, Input, Label, Left, Body, Right, Button, Icon, Title, Text, Picker, Item as FormItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

const Item = Picker.Item;

export default class CardDetailsScene extends Component<{}> {
  
  constructor (props) {
    
    super(props);
  
    this.state = {
      cardType: 'visa'
    }

  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    Actions.pop();

  }

  onValueChange (value: string) {

    this.setState({
      cardType: value
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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.updateCardDetails.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Grid style={{ margin: 12 }}>
            <Row>
              <Col>
                <Form style={{ marginLeft: -12 }}>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.cardType}:</Label>
                    <Picker
                      iosHeader="Select one"
                      mode="dropdown"
                      selectedValue={this.state.cardType}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Item label="Visa" value="visa" />
                      <Item label="Mastercard" value="mastercard" />
                    </Picker>
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.nameOnCard}:</Label>
                    <Input />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.cardNumber}:</Label>
                    <Input />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.securityNumber}:</Label>
                    <Input />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.expiryDate}:</Label>
                    <Input placeholder="MM/YY" />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.accountNumber}:</Label>
                    <Input placeholder="########" />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.sortCode}:</Label>
                    <Input placeholder="###-##-#" />
                  </FormItem>
                </Form>
                <Button block style={Styles.PRIMARY_BUTTON} onPress={this.goForward}>
                  <Text>Update</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}