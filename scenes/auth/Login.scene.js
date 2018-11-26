/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash'
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Spinner, Container, Header, Content, Form, Thumbnail, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
// /import ImagePicker from 'react-native-image-picker'
import Store from 'react-native-simple-store'


import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../reducers/authReducer'

import FormDataHelper from '../../helpers/FormData.helper'

import { default as FormInput } from '../../components/FormInput'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants


import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class LoginScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'userName', INPUT_TYPES.TEXT, this.props.Lang.userDetails.userName + '*', null, null, true)
    FormDataHelper.createDataField(formData, 'password', INPUT_TYPES.PASSWORD, this.props.Lang.userDetails.password + '*', null, null, true)

     
    this.state = {
      chosenImage: null,
      mimeType: null,
      formData: formData,
      formInvalid: !FormDataHelper.isFormValid(formData)
    };

  }

  componentDidMount () {

    Store.get('LOGIN_DETAILS')
      .then(({username, password}) => {
        console.log(username, password)
        this.state.formData.userName.value = username
        this.state.formData.password.value = password
        this.setState({
          formData: this.state.formData,
          formInvalid: !FormDataHelper.isFormValid(this.state.formData)
        })
      })
      .catch(() => {

      })

  }

 
  formInputDidChange (id, newText) {
     this.state.formData[id].value = newText

     var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

     this.setState({
      formData: this.state.formData,
      formInvalid: formInvalid
     })
  }




  attemptToLogin = () => {
    var { formData } = this.state

    this.props.loginWithEmail(formData.userName.value, formData.password.value)
  }

  doRender () {

    var { formData } = this.state
    return (

      <View style={{ flex: 1 }}>
        <Content style={{ padding: 10 }}>
          <Text>{this.props.Lang.userDetails.instructions}</Text>
            <Form style={{ marginLeft: -12 }}>
              <FormInput {...formData.userName} onChangeText={this.formInputDidChange.bind(this)} disableAutoCapitalize={true} />
              <FormInput {...formData.password} onChangeText={this.formInputDidChange.bind(this)} secureTextEntry={true} />
            </Form>
        </Content>
        <View style={{ height: 80, margin: 10 }}>
          <Button transparent disabled={this.state.formInvalid || this.props.authReducer.showSpinner} block style={[Styles.PRIMARY_BUTTON, this.state.formInvalid && Styles.PRIMARY_BUTTON_DISABLED]} onPress={this.attemptToLogin.bind(this)}>
            {!this.props.authReducer.showSpinner && <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.confirmProfile.login}</Text>}
            {this.props.authReducer.showSpinner && <Spinner color='white' />}
          </Button>
        </View>
      </View>
    )

  }

  render () {
    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Lang.userDetails.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          {this.doRender()}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);