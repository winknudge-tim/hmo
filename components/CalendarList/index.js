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

export default class CalendarScene extends Component<{}> {
  
  render () {
    return (
       <List>
        <ListItem button={true} onPress={Actions.eventScene}>
          <Left>
            <Grid>
              <Row>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Thur 25 Jan 2017</Text>
              </Row>
              <Row>
                <Text>Bins out</Text>
              </Row>
            </Grid>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
         <ListItem button={true} onPress={Actions.eventScene}>
          <Left>
            <Grid>
              <Row>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fri 26 Jan 2017</Text>
              </Row>
              <Row>
                <Text>House inspection</Text>
              </Row>
            </Grid>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    );
  }
}