/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Linking,
    View
} from 'react-native';

import _ from 'lodash'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Header, Content, Form, Item, Input, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import { actions } from '../../actions/incidentsFaqActions'
import { actions as IncidentActions } from '../../reducers/incidentReducer'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
  ...bindActionCreators(IncidentActions, dispatch)
})

class WorkflowScene extends Component<{}> {
  
    constructor(pros) {
        super(pros)

        this.state = {
            currId: 62,
            workflowTitles: [],
            previous: [],
            reportSent: false,
            paid: false,
            createChat: false
        }
    }

  componentDidMount () {

    this.props.getQuestions(this.props.authReducer.propId, this.state.currId)
    

  }

  get title () {
    const { payload } = this.props.incidentTreeQuestionsReducer
    var _title = ""
    var questions = payload.questions || {}

    _.each(questions, (question, newTitle) => {
        _title = newTitle
    })

    return _title
  }

  get questions () {

    const { payload } = this.props.incidentTreeQuestionsReducer
    var formattedQuestions = []
    var questions = payload.questions || {}

    _.each(questions, (question) => {
        if (question[0] && question[0].responses) {
            formattedQuestions = question[0].responses
        }
    })

    return formattedQuestions
  }

  goBack = () => {
    var previous = this.state.previous
    if (previous.length > 0) {
        var lastID = previous.pop()
        this.setState({
            previous,
            currId: lastID
        }, () => {
            this.props.getQuestions(1, this.state.currId)  
        })
    }
  }

  openLink = (link) => {
    Linking.openURL(link).catch(err => console.error('An error occurred', err));
  }

  autoReport = (res, createChat) => {
      // auto report
    //this.selectResponse(res)
    this.props.submitIncident({ 
      "sTitle": this.title,
      "sDescription": this.state.workflowTitles.toString(),
      "iPrpId": this.props.authReducer.propId,
      "iUsrId": this.props.authReducer.userId
    }, createChat)
    this.setState({
        reportSent: true,
        createChat
    })
  }

  makePayment = (res) => {
    this.props.submitIncident({ 
      "sTitle": this.title,
      "sDescription": this.state.workflowTitles.toString(),
      "iPrpId": this.props.authReducer.propId,
      "iUsrId": this.props.authReducer.userId
    }, false, true)
    this.setState({
        reportSent: true,
        paid: true
    })
  }

  selectResponse = (res) => {
    if (res.responseForwardingID) {

        var previous = this.state.previous || []
        var workflowTitles = this.state.workflowTitles || []
        previous.push(this.state.currId)
        workflowTitles.push(this.title)
        this.setState({
            previous,
            workflowTitles,
            currId: res.responseForwardingID
        }, () => {
            this.props.getQuestions(this.props.authReducer.propId, this.state.currId)  
        })
    }
  }
  /**
EAR – end of workflow and automatic report
   */

  displayResponse = (res, index) => {

    switch (res.responseType) {

        case 'EAP':
        return (<Button 
            transparent style={Styles.PRIMARY_BUTTON} 
            key={`wflow-${index}`} 
            block 
            onPress={this.makePayment}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>Make payment of £{res.response}</Text>
        </Button>)
        break

        case 'END':
        return (<Button 
                    transparent style={Styles.PRIMARY_BUTTON} 
                    key={`wflow-${index}`} 
                    block 
                    onPress={() => { Actions.pop() }}>
                    <Text style={Styles.PRIMARY_BUTTON_TEXT}>Report ended</Text>
                </Button>)

        case 'URL':
        return (<Button 
                transparent style={Styles.PRIMARY_BUTTON} 
                key={`wflow-${index}`} 
                block 
                onPress={() => { this.openLink(res.response) }}>
                <Text style={Styles.PRIMARY_BUTTON_TEXT}>View webpage</Text>
            </Button>)

        case 'GBT':
        return (<Button 
                    transparent style={Styles.SECONDARY_BUTTON} 
                    key={`wflow-${index}`} 
                    block 
                    onPress={() => { this.selectResponse({ responseForwardingID: res.response }) }}>
                    <Text style={Styles.SECONDARY_BUTTON_TEXT}>Go to next task</Text>
                </Button>)


        case 'EAS':        
        case 'EAR':
        return (<Button 
            transparent style={Styles.PRIMARY_BUTTON} 
            key={`wflow-${index}`} 
            block 
            onPress={() => { this.autoReport(res, res.responseType === 'EAS') }}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>{res.response}</Text>
        </Button>)

        case 'FQU':
        return (<Button 
                    transparent style={Styles.SECONDARY_BUTTON} 
                    key={`wflow-${index}`} 
                    block 
                    onPress={() => { this.selectResponse(res) }}>
                    <Text style={Styles.SECONDARY_BUTTON_TEXT}>{res.response}</Text>
                </Button>)

        default:
            return (<View key={`wflow-${index}`}>
            <Text>{res.response}</Text>
        </View>)

    }

  }

  render () {
    const { loading, error } = this.props.incidentTreeQuestionsReducer
    const { reportSent, paid, createChat } = this.state
    return (
       <Container>
        <Header transparent style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={() => { Actions.pop() }}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ padding: 10 }}>
           {loading &&  <View><Text>loading</Text></View>}
           {!reportSent && this.state.previous.length > 0 && <Button style={Styles.SECONDARY_BUTTON} block onPress={this.goBack}><Text style={Styles.SECONDARY_BUTTON_TEXT}>Back to {this.state.workflowTitles[this.state.workflowTitles.length-1]}</Text></Button>}
           {!reportSent && !loading && !error && this.questions.map(this.displayResponse)}
           {!loading && error && <View><Text>There was an error please go back</Text></View>}
           {reportSent &&  !loading &&
           <View>
                {!paid && <Text style={{ marginBottom: 15 }}>Report has been sent to Ideal House Share</Text>}
                {paid && <Text style={{ marginBottom: 15 }}>Thank you, your payment had been sent</Text>}
                {createChat && <Text style={{ marginBottom: 15 }}>A new group has been created within messages. If you have any further quieries about this then you can get touch.</Text>}
                <Button 
                    transparent style={Styles.PRIMARY_BUTTON} 
                    block 
                    onPress={() => { Actions.pop() }}>
                    <Text style={Styles.PRIMARY_BUTTON_TEXT}>Close</Text>
                </Button>
           </View>}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowScene);