/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

const { width, height } = Dimensions.get('window')

const uri = 'https://scontent.fman2-2.fna.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/23172734_10159422756090063_79266100794685344_n.jpg?oh=e8fafd700e76752d9c5b041417827c14&oe=5AE63F0E'

export default class RegisterStepsScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  gotToStep = (scene) => {
    Actions[scene]()
  }

  doRegister = () => {
    //this.props.registerUser(tempData)
  }

  render () {

    var steps = [
        {
          label: 'Login details*',
          scene: 'userDetailsScene'
        },
        {
            label: 'Personal details*',
            scene: 'confirmProfile'
        },
        {
            label: 'Employment',
            scene: 'employmentScene'
        },
        {
            label: 'Previous addresses',
            scene: 'previousAddressesScene'
        },
        {
            label: 'Guarantor',
            scene: 'guarantorScene'
        },
        {
            label: 'Guarantor Employment',
            scene: 'guarantorEmploymentScene'
        },
        {
            label: 'Choose property*',
            scene: 'selectPropertyScene'
        },
        {
            label: 'Payment*',
            scene: 'registrationPaymentScene'
        }
    ]

    return (
      <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>Register</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Content>
            <List>
              <ListItem>
                <Body>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>To register please fill in each section. Fields marked with an * are required to initially register.</Text>
                  <Text style={{ fontSize: 16, margin: 10 }}>Please note all sections will be required to sign a tenancy agreement.</Text>  
                </Body>
              </ListItem>
              {steps.map((step, index) => {
              return (
              <ListItem key={'step-' + index} button={true} onPress={() => { this.gotToStep(step.scene) }}>
                  <Left>
                      <Text>{index + 1}. {step.label}</Text>
                  </Left>
                  <Right>
                      <Icon name="arrow-forward" />
                  </Right>    
              </ListItem>)
              })}

            </List>
          </Content>
          </View>
          <View style={{ height: 80, margin: 10 }}>
          <Button transparent block disabled={this.state.formInvalid} block style={Styles.PRIMARY_BUTTON} onPress={this.doRegister}>
                  <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.registrationPaymentScene.makePayment}</Text>
              </Button>
          </View>
        </View>
      </Container>
      )
  }
}

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
