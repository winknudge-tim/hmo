/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';


import Styles from '../../configs/styles'

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../reducers/authReducer'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class ProfileScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  goBack () {

    Actions.pop();

  }

  doLogout () {

    this.props.logout()

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
         <List>
            <ListItem button={true} onPress={this.doLogout.bind(this)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScene);

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
