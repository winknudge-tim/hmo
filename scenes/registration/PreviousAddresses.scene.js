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


class PreviousAddressesScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'currentAddress', INPUT_TYPES.TEXT, this.props.Lang.currentAddress.currentAddress, null, null)
    FormDataHelper.createDataField(formData, 'timeAtCurrentAddress', INPUT_TYPES.SELECT, this.props.Lang.currentAddress.timeAtCurrentAddress, 3, null, false, [[3, '3 months'], [6, '6 months'], [12, '12 months'], [18, '18 months'], [24, '2 years'], [30, '2.5 years'], [36, '3 years+']])
    FormDataHelper.createDataField(formData, 'rentPaid', INPUT_TYPES.CURRENCY, this.props.Lang.currentAddress.rentPaid, null, null, true)
    FormDataHelper.createDataField(formData, 'reasonsForLeaving', INPUT_TYPES.TEXT, this.props.Lang.currentAddress.reasonsForLeaving, null, null)
    FormDataHelper.createDataField(formData, 'previousAddresses', INPUT_TYPES.TEXT, this.props.Lang.currentAddress.previousAddress, null, null)
    FormDataHelper.createDataField(formData, 'landlordName', INPUT_TYPES.TEXT, this.props.Lang.currentAddress.landlordName, null, null)
    FormDataHelper.createDataField(formData, 'landlordPhone', INPUT_TYPES.PHONE, this.props.Lang.currentAddress.landlordPhone, null, null)
    FormDataHelper.createDataField(formData, 'landlordEmail', INPUT_TYPES.EMAIL, this.props.Lang.currentAddress.landlordEmail, null, null)


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

    this.props.saveTempData(tempData, 'guarantorScene')

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
                <FormInput 
                  {...formData.currentAddress} 
                  stackedLabel={true}
                  multiline={true}
                  autogrow={true}
                  onChangeText={this.formInputDidChange.bind(this)} />
                <FormInput 
                  {...formData.timeAtCurrentAddress} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                  {...formData.rentPaid} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                  {...formData.reasonsForLeaving} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                   <FormInput 
                  {...formData.previousAddresses} 
                  stackedLabel={true}
                  multiline={true}
                  autogrow={true}
                  required={formData.timeAtCurrentAddress.value < 24}
                  onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                  {...formData.landlordName} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                  {...formData.landlordPhone} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                  <FormInput 
                  {...formData.landlordEmail} 
                  stackedLabel={true} 
                  onChangeText={this.formInputDidChange.bind(this)} />
                
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
            <Title>{this.props.Lang.currentAddress.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        {this.doRender()}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousAddressesScene);