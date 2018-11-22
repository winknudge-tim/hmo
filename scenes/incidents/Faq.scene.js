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

class IncidentFaqScene extends Component<{}> {
  
    constructor(pros) {
        super(pros)

        this.state = {
            issues: [],
            filteredIssues: [],
            filterText: ''
        }

    }

  componentDidMount () {

    this.props.getIncidentCategories()

  }

  componentWillReceiveProps (nextProps) {

    if (this.props.incidentFAQReducer.type !== nextProps.incidentFAQReducer.type
       && nextProps.incidentFAQReducer.type === actionTypes.RETRIEVED_INCIDENT_CATEGORY_SUCCESS) {

        this._doFilter(nextProps.incidentFAQReducer.payload.categories)

       }


  }

  goBack () {

    Actions.pop();

  }

  _doFilter = (issues = []) => {

    //var issues = this.props.incidentFAQReducer.payload.categories || []
    var filteredIssues = issues
    var title = this.state.filterText

    if (title !== "") { 
        filteredIssues = issues.filter(function(item){

            if (!item.label) {
                return
            }

            var titleSearch = title;
            const itemData = item.label.toUpperCase()
            const textData = titleSearch.toUpperCase()
            return itemData.indexOf(textData) > -1

        })
    }

    this.setState({ filteredIssues: filteredIssues })


  }

  _onChangeText = (input) => {


    this.setState({
        filterText: input
    }, () => {
      this._doFilter(this.props.incidentFAQReducer.payload.categories)
    })

  }

  _clearText = () => {

    this.setState({
        filterText: ''
    })

  }

  _loadCat = (cat) => {

    return () => {

      //this.props.getQuestions(0, cat)
      this.props.getQuestions(0, cat)

      Actions.incidentFaqAnswer()

    }
 
  }

  _renderList () {

    var _issues = []

    var categories = this.props.incidentFAQReducer.payload.categories || []
    // this.state.filteredIssues

    _.each(this.state.filteredIssues, (issue, key) => {

        _issues.push(
            <ListItem key={key} button={true} value={this.state.filterText} onPress={this._loadCat(issue.path)}>
              <Left>
                <Text>{issue.label}</Text>
              </Left>
              <Right>
                <Icon name="chevron-right" />
              </Right>
            </ListItem>
        )

    })

    return _issues

  }


  render () {

    return (
       <Container>
        <Header transparent style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='chevron-left' size={20} style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.incidents.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Form>
          <Item>
            <Icon name="search" size={20} />
            <Input 
              placeholder="Search" 
              onChangeText={this._onChangeText}
              clearButtonMode={'always'} />
          </Item>
        </Form>
        <Content>
            {this.state.filteredIssues.length === 0 && <View style={Styles.CONTENT}>
                <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={this._loadCat('newIssue')}>
                     <Text style={Styles.PRIMARY_BUTTON_TEXT}>No results found, create new</Text>
                </Button>
            </View>}
          <List>
            {this._renderList()}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IncidentFaqScene);