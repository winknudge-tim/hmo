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

import currencyFormatter from 'currency-formatter';

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


class GuarantorEmployment extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'guarantorJobTitle', INPUT_TYPES.TEXT, this.props.Lang.guarantorEmployment.jobTitle, null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorAnnualEarnings', INPUT_TYPES.CURRENCY, this.props.Lang.guarantorEmployment.annualEarnings, null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorEmployer', INPUT_TYPES.TEXT, this.props.Lang.guarantorEmployment.employer, null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorHrContact', INPUT_TYPES.TEXT, this.props.Lang.guarantorEmployment.hrContact, null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorHrPhoneNumber', INPUT_TYPES.PHONE, this.props.Lang.guarantorEmployment.hrPhoneNumber, null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorHrEmail', INPUT_TYPES.EMAIL, this.props.Lang.guarantorEmployment.hrEmail, null, null, false)

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

    this.props.saveTempData(tempData, 'selectPropertyScene')

    // Register

  }

  doRender () {

    var formData = this.state.formData

    if (this.props.registrationReducer.showSpinner) {
      return (<Spinner />)
    } else {

      return (
        <View style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
            <Text>{this.props.Lang.guarantorEmployment.instructions}</Text>
              <Form style={{ marginLeft: -12 }}>
                <FormInput 
                  {...formData.guarantorJobTitle} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.guarantorAnnualEarnings} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.guarantorEmployer} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.guarantorHrContact} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.guarantorHrPhoneNumber}
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
                <FormInput 
                  {...formData.guarantorHrEmail} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} 
                  />
              </Form>
          </Content>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={this.doSave.bind(this)}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.confirmProfile.next}</Text>
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
            <Title>{this.props.Lang.guarantorEmployment.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        {this.doRender()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorEmployment);