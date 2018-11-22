/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import { Container, Header, Content, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

export default class IncidentScene extends Component<{}> {
  
  goBack () {

    Actions.pop();

  }

  goForward () {

    //Actions.guarantorScene();

  }

  render () {
    var { incident } = this.props
    console.log(incident)
    return (
       <Container>
        <Header transparent style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.incident.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Text>
                {incident.sTitle}
              </Text>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Location:</Text>
              </Left>
              <Right>
                <Text>{incident.sLocation}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Status:</Text>
              </Left>
              <Right>
                <Text>{incident.sStatus}</Text>
              </Right>
            </ListItem>
            {incident.sStatus !== incident.dCompletedDate && <ListItem>
              <Left>
                <Text>Completed:</Text>
              </Left>
              <Right>
                <Text>{incident.dCompletedDate}</Text>
              </Right>
            </ListItem>}
            <ListItem>
              <Left>
                <Text>Expected Date:</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 11 }}>{incident.dExpectedDate}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Create date:</Text>
              </Left>
              <Right>
                <Text style={{ fontSize: 11 }}>{incident.dCreated}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Report by:</Text>
              </Left>
              <Right>
                <Text>{incident.createdBy.sName}</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}