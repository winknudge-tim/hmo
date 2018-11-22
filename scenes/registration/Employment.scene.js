/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash'
import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import currencyFormatter from 'currency-formatter';

import { Spinner, Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, View } from 'native-base';
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


class EmploymentScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'jobTitle', INPUT_TYPES.TEXT, this.props.Lang.employment.jobTitle, null, null)
    FormDataHelper.createDataField(formData, 'annualEarnings', INPUT_TYPES.CURRENCY, this.props.Lang.employment.annualEarnings, null, null)
    FormDataHelper.createDataField(formData, 'employer', INPUT_TYPES.TEXT, this.props.Lang.employment.employer, null, null)
    FormDataHelper.createDataField(formData, 'hrContact', INPUT_TYPES.TEXT, this.props.Lang.employment.hrContact, null, null)
    FormDataHelper.createDataField(formData, 'hrPhoneNumber', INPUT_TYPES.PHONE, this.props.Lang.employment.hrPhoneNumber, null, null)
    FormDataHelper.createDataField(formData, 'hrEmail', INPUT_TYPES.EMAIL, this.props.Lang.employment.hrEmail, null, null)

    this.state = {
      formData: formData,
      formInvalid: !FormDataHelper.isFormValid(formData)
    };

  }

  componentDidMount () {

    this.props.getTempData()

  }
  
  componentWillReceiveProps (nextProps) {

    var tempData;

    if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

      tempData = nextProps.registrationReducer.tempData;

      _.each(tempData, (value, id) => {

        if (this.state.formData[id]) {

          this.state.formData[id].value = value

        }

      })

      var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

      this.setState({
        formData: this.state.formData,
        formInvalid: formInvalid
      })

    }

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

  doSave () {

    var tempData = {};

    _.each(this.state.formData, function(field, id) {

      tempData[id] = field.value

    })

    tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

    this.props.saveTempData(tempData, 'previousAddressesScene')

  }

  doRender () {

    var formData = this.state.formData

    if (this.props.registrationReducer.showSpinner) {
      return (<Spinner />)
    } else {

      return (
        <View style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
          <Text>Please confirm your current address details</Text>
              <Form style={{ marginLeft: -12 }}>
                <FormInput 
                  {...formData.jobTitle} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.annualEarnings} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.employer} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.hrContact} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.hrPhoneNumber}
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.hrEmail} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
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
            <Title>{this.props.Lang.employment.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
          {this.doRender()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentScene);