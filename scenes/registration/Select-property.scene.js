/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View
} from 'react-native';

import _ from 'lodash'

import { Container, Header, Content, Form, Item, Input, Radio, Label, Left, Body, Right, Button, Icon, Title, Text, H3, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../actions/propertyActions'
import { actions as regActions } from '../../reducers/registrationReducer'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
  ...bindActionCreators(regActions, dispatch)
})

class SelectPropertyScene extends Component<{}> {
  
  constructor (props) {
    super(props);
    
    this.state = {
      selectedPropertyId: null
    };

  }

  componentDidMount () {
    
    this.props.getTempData()
    this.props.fetchPropertiesList()
    //if (this.props.navigation.state)

  }

  componentWillReceiveProps (nextProps) {

    var tempData;

    if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

      tempData = nextProps.registrationReducer.tempData;

      if (tempData.selectedPropertyId) {
        this.setState({ selectedPropertyId: tempData.selectedPropertyId })
      }

    }

  }

  isPropertySelected (propertyId, selectedProperty) {

    return selectedProperty === Number(propertyId)

  }

  doSelectProperty (propertyId) {

    this.setState({ selectedPropertyId: propertyId })

    //this.props.saveTempData(this.props.registrationReducer.tempData)


  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    var tempData = {};

    tempData.selectedPropertyId = this.state.selectedPropertyId
    
    tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

    this.props.saveTempData(tempData, 'registrationPaymentScene')

  }

  clearFilter () {

  }




  render () {

    var properties = this.props.propertyReducer.properties
    var selectedProperty = this.props.registrationReducer.tempData.selectedProperty

    var list = []

    _.each(properties, (property) => {
      
      list.push(
      <ListItem style={{ height: 100 }} key={property.PrpId} itemDivider onPress={ () => { this.doSelectProperty(Number(property.PrpId)) } }>
        <Grid>
          <Row>
            <Text style={{ fontWeight: "bold" }}>{property.HouseName} {property.AddressLine1}</Text>
          </Row>
          <Row>
            <Text style={{ fontSize: 14 }}>Available from: {property.availableFrom}</Text>
          </Row>
        </Grid>
       <Radio selected={Number(property.PrpId) === Number(this.state.selectedPropertyId)} onPress={ () => { this.doSelectProperty(Number(property.PrpId)) } } />
      </ListItem>)


    })

    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Lang.selectProperty.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
          <View style={{ height: 50 }}>
            <Item>
              <Input placeholder="Filter" />
              <Icon name='close-circle' onPress={this.clearFilter} />
            </Item>
          </View>
          <View style={{ flex: 1 }}>
            <Content>
            <List>
              {list}
            </List>
            </Content>
          </View>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent disabled={!this.state.selectedPropertyId} block style={Styles.PRIMARY_BUTTON} onPress={this.goForward.bind(this)}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.selectProperty.save}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );


    // AddressLine1
    // :
    // "Ravenswood Avenue"
    // AddressLine2
    // :
    // "Normoss"
    // Country
    // :
    // "Lancashire"
    // HouseName
    // :
    // "1"
    // Postcode
    // :
    // "FY3 7SJ"
    // PrpId
    // :
    // "1"
    // Town
    // :
    // "Blackpool"
    // location
    // :
    // {lat: 0, long: 0}
    // __proto__
    // :
    // Object
    
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPropertyScene);