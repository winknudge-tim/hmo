/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import { Container, Header, Content, Form, Item as FormItem, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem, Picker } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions, ActionConst } from 'react-native-router-flux';

const Item = Picker.Item;

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import FormDataHelper from '../../helpers/FormData.helper'
import { default as FormInput, test } from '../../components/FormInput'

import { actions, actionTypes } from '../../actions/messagesActions'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class NewConversationsScene extends Component<{}> {
  
  constructor (props) {
    
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'subject', INPUT_TYPES.TEXT, 'Subject', null, null, true)

    this.state = {
      formData: formData,
      formInvalid: !FormDataHelper.isFormValid(formData)
    };

  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.messagesReducer.type === actionTypes.CREATED_MESSAGE_SUCCESS) {

      

    }

  }

  goBack () {

    Actions.pop();

  }

  goToStartConversation () {

    this.props.createMessage(this.props.authReducer.propId, this.props.authReducer.userId, this.state.formData.subject.value)
    Actions.pop();
    
  }

  onValueChange (value) {

    this.setState({
      cardType: value
    })

  }

  formInputDidChange (id, newVal, preVal) {

    if (this.state.formData[id].type === INPUT_TYPES.CURRENCY) {
     newVal = currencyFormatter.format(newVal, { symbol: '£', precision: 0 });
    }

    var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

    this.state.formData[id].value = newVal
    this.setState({
      formData: this.state.formData,
      formInvalid: formInvalid
    })

  }

  render () {

    var formData = this.state.formData

    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.newConversation.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ margin: 12 }}>
          <Form style={{ marginLeft: -12 }}>
              <FormInput 
                  {...formData.subject} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
            </Form>
            <Button 
              disabled={this.state.formInvalid}
              block 
              style={Styles.PRIMARY_BUTTON} 
              onPress={this.goToStartConversation.bind(this)}>
              <Text>{this.props.Lang.newConversation.start}</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewConversationsScene);
