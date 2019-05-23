/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import moment from 'moment'

import { Container, Header, Content, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';

import Styles from '@configs/styles'

import Icon from 'react-native-vector-icons/FontAwesome';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../reducers/incidentReducer'

class IncidentsScene extends Component<{}> {
  
  goBack () {

    Actions.pop();

  }

  doGoToNewIncident () {

    Actions.workflow();

  }

  componentWillMount () {
    //this.props.getRecordedIncidents(this.props.propId)
  }

  render () {
    return (
       <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.incidents.title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.doGoToNewIncident} >
              <Icon name='plus' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            {this.props.incidents.length === 0 && <ListItem><Text>{this.props.Lang.incidents.noIssues}</Text></ListItem>}
            {this.props.incidents.map((incident, index) => {
             return (
              <ListItem key={`incident-${index}`} button={true} onPress={() => { Actions.incidentScene({ incident }) }}>
                <Left>
                  <Text>{incident.sTitle}  <Text style={{ fontSize: 10 }}>{"\n"}{incident.sLocation}  {moment(incident.dCreated).format('h:mma DD/MM/YYYY')}</Text></Text>
                </Left>
                <Right>
                  <Icon name="chevron-right" />
                </Right>
              </ListItem>
              )})}
          </List>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    incidents: state.recordedIncidentsReducer.payload,
    propId: state.authReducer.propId
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidentsScene)