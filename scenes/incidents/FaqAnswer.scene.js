/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Linking,
  View,
  Image
} from 'react-native';

import _ from 'lodash'

import { Container, Header, Content, Left, Body, Right, Button, Title, Text, Card, CardItem } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions, actionTypes } from '../../actions/incidentsFaqActions'


import LANG from '../../configs/Lang'
import Styles from '../../configs/styles'

import IncidentForm from './components/IncidentForm'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class IncidentFaqAnswerScene extends Component<{}> {
  
    constructor(pros) {
        super(pros)

    

        this.state = {
        }

    }

  goBack = () => {

    if (!this.props.incidentAnswersReducer.payload.history || this.props.incidentAnswersReducer.payload.history.length === 0) {
        
      Actions.pop();

    } else if (this.props.incidentAnswersReducer.payload.history.length > 0) {

      var previous = this.props.incidentAnswersReducer.payload.history[this.props.incidentAnswersReducer.payload.history.length-1]
      var history  = this.props.incidentAnswersReducer.payload.history
      var responses = this.props.incidentAnswersReducer.payload.responses || []


      history.pop()
      responses.pop()
      this.props.setAnswer(previous, null, history, responses)

    }

  }

  componentDidMount () {

    //this.props.getQuestions(0, 'boiler')

  }

  componentWillReceiveProps (nextProps) {

    if (this.props.incidentTreeQuestionsReducer.type !== nextProps.incidentTreeQuestionsReducer.type
       && nextProps.incidentTreeQuestionsReducer.type === actionTypes.RETRIEVED_INCIDENT_QUESTIONS_SUCCESS) {

        this.props.setAnswer(nextProps.incidentTreeQuestionsReducer.payload.questions.paths, null, [], [])

       }


  }

  selectResponse = (r) => {

    return () => {

      var responses = this.props.incidentAnswersReducer.payload.responses || []
      responses.push(this.props.incidentAnswersReducer.payload.node.question + " " + r.response)

      this.props.setAnswer(r, this.props.incidentAnswersReducer.payload.node, this.props.incidentAnswersReducer.payload.history, responses)

    }

  }

  openLink = (link) => {

    return () => {

      Linking.openURL(link).catch(err => console.error('An error occurred', err));

    }

  }

  renderInstruction () {

    return (<View>
        <Text>{this.props.incidentAnswersReducer.payload.node.instruction}</Text>
        {this.props.incidentAnswersReducer.payload.node.link && <Button transparent block style={Styles.SECONDARY_BUTTON} onPress={this.openLink(this.props.incidentAnswersReducer.payload.node.link)}><Text style={Styles.SECONDARY_BUTTON_TEXT} >View</Text></Button>}
    </View>)

  }

  renderAnswerOptions () {

    var responses = this.props.incidentAnswersReducer.payload.node.responses || []

    var responseBtns = []

    _.each(responses, (r, key) => {

      responseBtns.push(<Button transparent style={Styles.PRIMARY_BUTTON} key={key} block onPress={this.selectResponse(r)}><Text style={Styles.PRIMARY_BUTTON_TEXT}>{r.response}</Text></Button>)

    })

    return (<View>
      <Text style={Styles.INSTRUCTION}>Select an answer</Text>
      {responseBtns}
    </View>)

  }

  renderHintText () {
  
    var hintTxt = this.props.incidentAnswersReducer.payload.node.hint_text
    var hintImg = this.props.incidentAnswersReducer.payload.node.hint_image

    return (<Card style={{ marginTop: 20, marginBottom: 20 }}>
       <CardItem>
        <Left>
          <Icon name='info-circle' size={45} color="#000000" />
          <Text>Info</Text>
        </Left>
        
        </CardItem>
      {hintImg && <CardItem><Image source={{uri: hintImg }} style={{height: 200, width: null, flex: 1}}/></CardItem>}
      {hintTxt && <CardItem><Text>{hintTxt}</Text></CardItem>}
    </Card>)

  }

  render () {

    //this.props.incidentTreeQuestionsReducer.payload

    let title

    if (this.props.incidentTreeQuestionsReducer.payload.questions && this.props.incidentTreeQuestionsReducer.payload.questions.label) {
      title = this.props.incidentTreeQuestionsReducer.payload.questions.label
    }

    return (
       <Container>
        <Header transparent>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{title}</Title>
          </Body>
          <Right>
            </Right>
        </Header>
        {this.props.incidentAnswersReducer.payload.node &&
          <View style={{ flex: 1 }}>
            {this.props.incidentAnswersReducer.payload.node.action && this.props.incidentAnswersReducer.payload.node.action === "report" && <IncidentForm responses={this.props.incidentAnswersReducer.payload.responses} />}
            {this.props.incidentAnswersReducer.payload.node.action !== "report" && <Content style={Styles.CONTENT}>
              {this.props.incidentAnswersReducer.payload.node.instruction && this.renderInstruction()}
              {this.props.incidentAnswersReducer.payload.node.question && <Text>{this.props.incidentAnswersReducer.payload.node.question}</Text>}
              {this.props.incidentAnswersReducer.payload.node.hint_text && this.renderHintText()}
              {this.props.incidentAnswersReducer.payload.node.responses && this.renderAnswerOptions()}
              {this.props.incidentAnswersReducer.payload.node.action && this.props.incidentAnswersReducer.payload.node.action === "complete" && 
              <View style={Styles.CONTENT}>
                {!this.props.incidentAnswersReducer.payload.node.doHideSuccessMsg && <Text>{LANG.newIncident.completeMsg}</Text>}
                <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={Actions.pop}>
                  <Text style={Styles.PRIMARY_BUTTON_TEXT}>{LANG.newIncident.
                    completeBtnText}</Text>
                </Button>
              </View>}
            </Content>}
          </View>}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncidentFaqAnswerScene);