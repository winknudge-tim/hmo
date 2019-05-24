/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Linking
} from 'react-native';


import { Container, Header, Content, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';

import Styles from '@configs/styles'

import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class SocialCircleScene extends Component<{}> {
  
  goBack () {
    Actions.pop();
  }

  openLink = (link) => {
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
  }

  render () {
    return (
       <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>Social circle</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ padding: 10 }}>
          <Text>Social Circle is a group of professional individuals who develop friendships and share good times. We are always welcoming and enjoy life to the full.</Text>
          <Button block style={Styles.PRIMARY_BUTTON} onPress={() => { this.openLink('http://www.social-circle.co.uk/join/idealhouseshare') }}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>
                Join
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
//http://www.social-circle.co.uk/join/idealhouseshare
function mapStateToProps (state) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialCircleScene)