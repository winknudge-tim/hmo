/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  Dimensions
} from 'react-native';

import _ from 'lodash'

import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, List, ListItem, } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';


import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions as rtActions } from '../../reducers/registrationProgressReducer'

class HousematesScene extends Component<{}> {
  
  constructor(props) {
  
    super(props);


  }

  goBack () {

    Actions.pop();

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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.property.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem button={true} onPress={Actions.housematesHome}>
              <Left>
                <Icon name="person" />
                <Text>Kris Sparrow</Text>
              </Left>
              <Right>
                <Text>In</Text>
              </Right>
            </ListItem>
            <ListItem button={true} onPress={Actions.housematesHome}>
              <Left>
                <Icon name="person" />
                <Text>Chris Reece</Text>
              </Left>
              <Right>
                <Text>Out</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(rtActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HousematesScene);