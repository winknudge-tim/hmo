/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import currencyFormatter from 'currency-formatter';
import _ from 'lodash'

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, H3, Spinner } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormDataHelper from '../../helpers/FormData.helper'

import { default as FormInput } from '../../components/FormInput'

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

class GuarantorScene extends Component<{}> {
  
  constructor(props) {
    super(props);

    var formData = {}
    FormDataHelper.createDataField(formData, 'guarantorPreviousAddresses', INPUT_TYPES.TEXT, 'Previous address', null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorAddress', INPUT_TYPES.TEXT, 'Current address', null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorFullName', INPUT_TYPES.TEXT, 'Full name', null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorDob', INPUT_TYPES.TEXT, 'Date of birth', null, 'dd/mm/yyyy', false)
    FormDataHelper.createDataField(formData, 'guarantorPhone', INPUT_TYPES.PHONE, 'Phone', null, null, false)
    FormDataHelper.createDataField(formData, 'guarantorEmail', INPUT_TYPES.EMAIL, 'Email' + '*', null, null, false)


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
 
  formInputDidChange (id, newVal) {

    if (this.state.formData[id].type === INPUT_TYPES.CURRENCY) {
     newVal = currencyFormatter.format(newVal, { symbol: '£', precision: 0 });
    }

    if (id === "guarantorDob") {
      newVal = FormDataHelper.FormatDOB(newVal)
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

    this.props.saveTempData(tempData, 'guarantorEmploymentScene')

  }

  goBack () {

    Actions.pop();

  }

  doRender () {

    var formData = this.state.formData

    if (this.props.registrationReducer.showSpinner) {
      return (<Spinner />)
    } else {

      return (

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Content style={{ padding: 10 }}>
              <Text>To rent with us we will need a guarantor.</Text>
                <Form style={{ marginLeft: -12 }}>
                  <FormInput {...formData.guarantorFullName} onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput {...formData.guarantorDob} onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput {...formData.guarantorPhone} onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput {...formData.guarantorEmail} onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                    {...formData.guarantorAddress} 
                    stackedLabel={true}
                    multiline={true}
                    autogrow={true}
                    onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                    {...formData.guarantorPreviousAddresses} 
                    stackedLabel={true}
                    multiline={true}
                    autogrow={true}
                    onChangeText={this.formInputDidChange.bind(this)} />
                </Form>
            </Content>
          </View>
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
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Lang.guarantor.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
          {this.doRender()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorScene);