/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Alert
} from 'react-native';

import { Container, Header, Content, Form, Input, Label, Left, Body, Right, Button, Icon, Title, Text, Picker, Item as FormItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import moment from 'moment'

import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../reducers/bankDetailsReducer'

import Styles from '../../configs/styles'

const Item = Picker.Item;

class CardDetailsScene extends Component<{}> {
  
  constructor (props) {
    
    super(props);
  
    this.state = {
      cardType: 'visa',
      nameOnCard: '',
      cardNumber: '',
      securityNumber: '',
      expiryDate: '',
      accountNumber: '',
      sortCode: ''
    }

  }

  componentWillReceiveProps (newProps) {
    if (moment(newProps.bankDetailsReducer.lastUpdate).isAfter(this.props.bankDetailsReducer.lastUpdate)) {
      Alert.alert(
        'Bank details updated',
        'Your bank details have been updated, please allow 24 hours to take effect',
        [
          { text: 'OK', onPress: () => Actions.pop() },
        ],
        {cancelable: false},
      );
    }
  }

  formInputDidChange = (field) => {
    return (val) => {
      console.log(val)
      this.setState({
        [field]: val
      })
    }  
  }

  goBack () {

    Actions.pop();

  }

  submitForm = () => {

    if (!this.props.bankDetailsReducer.loading) {
      this.props.updateBankDetails(this.props.authReducer.userId, this.state)
    }

  }

  onValueChange (value: string) {

    this.setState({
      cardType: value
    })

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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.updateCardDetails.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Grid style={{ margin: 12 }}>
            <Row>
              <Col>
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
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.nameOnCard}:</Label>
                    <Input onChangeText={this.formInputDidChange('nameOnCard')} />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.cardNumber}:</Label>
                    <Input onChangeText={this.formInputDidChange('cardNumber')} />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.securityNumber}:</Label>
                    <Input onChangeText={this.formInputDidChange('securityNumber')} />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.expiryDate}:</Label>
                    <Input onChangeText={this.formInputDidChange('expiryDate')} placeholder="MM/YY" />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.accountNumber}:</Label>
                    <Input onChangeText={this.formInputDidChange('accountNumber')} placeholder="########" />
                  </FormItem>
                  <FormItem>
                    <Label>{this.props.Lang.registrationPaymentScene.sortCode}:</Label>
                    <Input onChangeText={this.formInputDidChange('sortCode')} placeholder="###-##-#" />
                  </FormItem>
                </Form>
                <Button block style={Styles.PRIMARY_BUTTON} onPress={this.submitForm} disabled={this.props.bankDetailsReducer.loading}>
                  <Text>{this.props.bankDetailsReducer.loading ? 'Updating' : 'Update'}</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsScene);