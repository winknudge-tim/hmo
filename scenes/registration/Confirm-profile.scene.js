/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash'
import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { Spinner, Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormDataHelper from '../../helpers/FormData.helper'

import { default as FormInput, test } from '../../components/FormInput'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import { actions } from '../../reducers/registrationReducer'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class ConfirmProfileScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'firstName', INPUT_TYPES.TEXT, this.props.Lang.confirmProfile.firstName + '*', null, null, true)
    FormDataHelper.createDataField(formData, 'lastName', INPUT_TYPES.TEXT, 'Last name*', null, null, true)
    FormDataHelper.createDataField(formData, 'dob', INPUT_TYPES.TEXT, 'Date of birth*', null, 'dd/mm/yyyy', true)
    FormDataHelper.createDataField(formData, 'phone', INPUT_TYPES.PHONE, 'Phone*', null, null, true)
    FormDataHelper.createDataField(formData, 'email', INPUT_TYPES.EMAIL, 'Email*', null, null, true)
    FormDataHelper.createDataField(formData, 'gender', INPUT_TYPES.SELECT, 'Gender*', null, null, true, [['male', 'Male'], ['female', 'Female']])


    this.state = {
      formData: formData,
      formInvalid: !FormDataHelper.isFormValid(formData)
    };

  }

  componentDidMount () {

    this.props.getTempData(this.props.authReducer.fbAuthed)

  }
  
  componentWillReceiveProps (nextProps) {

    var tempData;

    if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

      tempData = nextProps.registrationReducer.tempData;

      _.each(tempData, (value, id) => {

        if (this.state.formData[id]) {

          this.state.formData[id].value = value

        }

        if (!this.state.formData.gender.value ) {
          this.state.formData.gender.value = 'male'
        }

      })

      var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

      this.setState({
        formData: this.state.formData,
        formInvalid: formInvalid
      })

    }

  }
 
  formInputDidChange (id, newText) {

    this.state.formData[id].value = newText

    if (id === "dob") {
      this.state.formData[id].value = FormDataHelper.FormatDOB(newText)
    }

    var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

     this.setState({
      formData: this.state.formData,
      formInvalid: formInvalid
     })

  }

  doSave () {

    var tempData = {};

    _.each(this.state.formData, function(field, id) {

      tempData[id] = field.value

    })

    tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

    this.props.saveTempData(tempData, 'employmentScene')

  }

  doRender () {

    var formData = this.state.formData

    if (this.props.registrationReducer.showSpinner) {
      return (<Spinner />)
    } else {

      return (

        <View style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
          <Text>{this.props.Lang.confirmProfile.instructions}</Text>
              <Form style={{ marginLeft: -12 }}>
                <FormInput {...formData.firstName} onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput {...formData.lastName} onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput {...formData.phone} onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput {...formData.email} onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput {...formData.dob} onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput {...formData.gender} onChangeText={this.formInputDidChange.bind(this)} />
                
              </Form>
          </Content>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={this.doSave.bind(this)}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.confirmProfile.save}</Text>
            </Button>
          </View>
        </View>

      )

    }

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
            <Title>{this.props.Lang.confirmProfile.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
          {this.doRender()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmProfileScene);