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
import { connect } from 'react-redux'

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

class ChecklistScene extends Component<{}> {
  
  goBack () {

    Actions.pop();

  }

  doGoToNewIncident () {

    Actions.newIncidentScene();

  }

  render () {
    var { registrationProgressReducer } = this.props
    var registrationProgress = registrationProgressReducer.payload

    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Lang.checklist.title}</Title>
          </Body>
          <Right>
      
          </Right>
        </Header>
        <Content>
          <Text style={Styles.DESCRIPTION_TEXT}>Until the below are incomplete items are complete your tenancy is unsecured.</Text>
          <List>
            {registrationProgress.map((progress, index) => {
              return (<ListItem key={'progress-' + index}>
                <Left>
                  <Text>{progress.Name}</Text>
                </Left>
                <Right>
                  <Text style={{ fontSize: 11 }}>{progress.Complete === "TRUE" ? "Complete" : "Incomplete"}</Text>
                </Right>
              </ListItem>)
            })}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistScene);