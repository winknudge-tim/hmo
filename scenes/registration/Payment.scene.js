/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';

import _ from 'lodash'

import { CreditCardInput } from "react-native-credit-card-input";

import { Container, Header, Content, Form, Input, Label, Left, Body, Right, Button, Icon, Title, Text, Picker, Item as FormItem } from 'native-base';
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

const Item = Picker.Item;

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class PaymentPayment extends Component<{}> {
  
  constructor (props) {
    
    super(props);
    
    var formData = {}
    FormDataHelper.createDataField(formData, 'nameOnCard', INPUT_TYPES.TEXT, 'Name on card', null, null, true)
    FormDataHelper.createDataField(formData, 'cardNumber', INPUT_TYPES.NUMBER, 'Card number', null, null, true)
    FormDataHelper.createDataField(formData, 'securityNumber', INPUT_TYPES.NUMBER, 'CVS number', null, null, true)
    FormDataHelper.createDataField(formData, 'expiryDate', INPUT_TYPES.TEXT, 'Expiry date', null, null, true)

    this.state = {
      formData: formData,
      cardType: 'visa',
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

  goBack () {

    Actions.pop()

  }

  onValueChange (value: string) {

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

  doSave () {

    var tempData = {};

    _.each(this.state.formData, function(field, id) {

      tempData[id] = field.value

    })

    tempData = _.defaults(tempData, this.props.registrationReducer.tempData)
    //registrationCompleteScene

    this.props.saveTempData(tempData)
    //this.props.registerUser(tempData)

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
            <Title>{this.props.Lang.registrationPaymentScene.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
            <Text>{this.props.Lang.registrationPaymentScene.paymentInstructions}</Text>
            <Form style={{ marginLeft: -12 }}>
              <FormItem>
                <Label>{this.props.Lang.registrationPaymentScene.cardType}:</Label>
                <Picker
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.cardType}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Item label="Visa" value="visa" />
                  <Item label="Mastercard" value="mastercard" />
                </Picker>
              </FormItem>
              <FormInput {...formData.nameOnCard} onChangeText={this.formInputDidChange.bind(this)} />
              <FormInput {...formData.cardNumber} onChangeText={this.formInputDidChange.bind(this)} />
              <FormInput {...formData.securityNumber} onChangeText={this.formInputDidChange.bind(this)} />
              <FormInput {...formData.expiryDate} onChangeText={this.formInputDidChange.bind(this)} />
              
            </Form>
          </Content>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent disabled={this.state.formInvalid} block style={Styles.PRIMARY_BUTTON} onPress={this.doSave.bind(this)}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.registrationPaymentScene.save}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPayment);