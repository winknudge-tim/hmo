/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  View
} from 'react-native';

import { Container, Header, Content, Spinner, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';

import _ from 'lodash'

import Styles from '../../configs/styles'

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as registrationActions } from '../../reducers/registrationReducer'


function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(registrationActions, dispatch)
})


class RegisterStepsScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  componentDidMount () {
    this.props.getTempData()
  }

  componentWillReceiveProps (nextProps) {

    var tempData;

    // if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

    //   tempData = nextProps.registrationReducer.tempData;

    //   _.each(tempData, (value, id) => {

    //     console.log(id, value)

    //   })

    

    // }

  }

  gotToStep = (scene) => {
    Actions[scene]()
  }

  doRegister = () => {
    this.props.registerUser()
  }

  completedEnough = () => {

    var { tempData } = this.props.registrationReducer
    var fieldsMustComplete = ['cardNumber', 'expiryDate', 'nameOnCard', 'securityNumber', 'dob', 'email', 'firstName', 'lastName', 'userName', 'password', 'gender', 'phone', 'profileImage']

    var hasCompletedEnough = true

    _.each(fieldsMustComplete, function(id) {

      if (_.isUndefined(tempData[id]) || _.isNull(tempData[id]) || !tempData[id] || tempData[id].length === 0 || tempData[id] === "") {
        hasCompletedEnough = false
      }

    })

    if (
        (tempData.selectedPropertyId && _.isNumber(tempData.selectedPropertyId) && tempData.selectedPropertyId < 0) ||
        (tempData.selectedPropertyId && !_.isNumber(tempData.selectedPropertyId))
      ) {
        hasCompletedEnough = false
      }

    return hasCompletedEnough
    //selectedPropertyId

  }

  render () {

    console.log('tempData', this.props.registrationReducer.tempData)
  
    var { showSpinner } = this.props.submitRegReducer 
    var hasCompletedEnough = this.completedEnough()

    var steps = [
        {
          label: 'Login details*',
          scene: 'userDetailsScene'
        },
        {
            label: 'Personal details*',
            scene: 'confirmProfile'
        },
        {
            label: 'Employment',
            scene: 'employmentScene'
        },
        {
            label: 'Previous addresses',
            scene: 'previousAddressesScene'
        },
        {
            label: 'Guarantor',
            scene: 'guarantorScene'
        },
        {
            label: 'Guarantor Employment',
            scene: 'guarantorEmploymentScene'
        },
        {
            label: 'Choose property*',
            scene: 'selectPropertyScene'
        },
        {
            label: 'Payment*',
            scene: 'registrationPaymentScene'
        }
    ]

    return (
      <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>Register</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <List>
                <ListItem>
                  <Body>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 10 }}>To register please fill in each section. Fields marked with an * are required to initially register.</Text>
                    <Text style={{ fontSize: 16, margin: 10 }}>Please note all sections will be required to sign a tenancy agreement.</Text>  
                  </Body>
                </ListItem>
                {steps.map((step, index) => {
                return (
                <ListItem key={'step-' + index} button={true} onPress={() => { this.gotToStep(step.scene) }}>
                    <Left>
                        <Text>{index + 1}. {step.label}</Text>
                    </Left>
                    <Right>
                        <Icon name="arrow-forward" />
                    </Right>    
                </ListItem>)
                })}

              </List>
            </ScrollView>
            </View>
            {hasCompletedEnough && <View style={{ height: 80, margin: 10 }}>
              <Button transparent block disabled={showSpinner} block style={Styles.PRIMARY_BUTTON} onPress={this.doRegister}>
                  {!showSpinner && <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.registrationPaymentScene.makePayment}</Text>}
                  {showSpinner && <Spinner color='white' />}
              </Button>
            </View>}
        </View>
      </Container>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStepsScene);
