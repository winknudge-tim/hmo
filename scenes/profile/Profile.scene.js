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

export default class TakePictureScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    Actions.register();

  }

  getSelectedImages () {

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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.profile.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col size={2} style={{ height: 200 }}>
              <Image source={{uri: uri }} style={styles.canvas} />
            </Col>
            <Col size={3}>
              <Text style={{ fontSize: 22, margin: 10 }}>Kris Sparrow</Text>
            </Col>
          </Grid>          
         <List>
            <ListItem button={true} onPress={Actions.cardDetailsScene}>
              <Left>
                <Icon name="card" />
                <Text>{this.props.Lang.profile.updateCardDetails}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button={true} onPress={this.goForward.bind(this)}>
              <Left>
                <Icon name="exit" />
                <Text>{this.props.Lang.profile.logout}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>

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
