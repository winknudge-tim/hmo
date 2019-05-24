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

import { Actions } from 'react-native-router-flux';

import Styles from '@configs/styles'

import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ReviewScene extends Component<{}> {
  
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
          <Text>Think we are doing a good job? Tell the world!</Text>
          <Button block style={Styles.PRIMARY_BUTTON} onPress={() => { this.openLink('https://uk.trustpilot.com/') }}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>
                Review
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScene)