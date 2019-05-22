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

import { actions, actionTypes } from '../../actions/incidentsFaqActions'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class WorkflowScene extends Component<{}> {
  
    constructor(pros) {
        super(pros)

        this.state = {
            currId: 63,
            workflowTitles: [],
            previous: []
        }
    }

  componentDidMount () {

    this.props.getQuestions(1, this.state.currId)

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

    return () => {

      Linking.openURL(link).catch(err => console.error('An error occurred', err));

    }

  }

  autoReport = (res) => {
      // auto report
    this.selectResponse(res)
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
            this.props.getQuestions(1, this.state.currId)  
        })
    }
  }
  /**
EAR – end of workflow and automatic report
   */

  displayResponse = (res, index) => {

    switch (res.responseType) {

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

        
        case 'EAR':
        return (<Button 
            transparent style={Styles.SECONDARY_BUTTON} 
            key={`wflow-${index}`} 
            block 
            onPress={() => { this.autoReport(res) }}>
            <Text style={Styles.SECONDARY_BUTTON_TEXT}>{res.response}</Text>
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
           {this.state.previous.length > 0 && <Button style={Styles.SECONDARY_BUTTON} block onPress={this.goBack}><Text style={Styles.SECONDARY_BUTTON_TEXT}>Back to {this.state.workflowTitles[this.state.workflowTitles.length-1]}</Text></Button>}
           {!loading && !error && this.questions.map(this.displayResponse)}
           {!loading && error && <View><Text>There was an error please go back</Text></View>}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowScene);