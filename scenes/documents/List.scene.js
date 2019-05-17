import React, { Component } from 'react';
import {
  Platform
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem, Spinner } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import _ from 'lodash'
import moment from 'moment'

import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import { actions } from '../../actions/documentActions'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class DocumentListScene extends Component<{}> {
  
  static onEnter () {

    setTimeout(function () {
      Actions.refresh({
        entered: new Date()
      })
    }, 1000)

  }

  componentWillReceiveProps(newProps) {


    if (newProps.entered !== this.props.entered) {
      this.props.getDocuments(this.props.authReducer.user.PrpId, this.props.authReducer.user.TcyId)
    }

  }

  componentWillMount( ) {


  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    //Actions.guarantorScene();

  }

  _showsignWarning (document) {

    if (document.userHasSigned !==  "True" && document.userNeedsToSign ===  "True") {
    
      return (<Text style={{ color: 'red', fontSize: 11 }}>*Unsigned*</Text>)
    
    } else if (document.userHasSigned ===  "True" && document.userNeedsToSign ===  "True") {

      return (<Text style={{ fontSize: 11 }}>Signed {moment(document.SignedDate).format('DD/MM/YYYY')}</Text>)  

    }

  }

  renderList () {

    if ( this.props.documentReducer.retrievingDocuments ) {
      return (
        <Spinner />
      )
    }

    if ( this.props.documentReducer.error ) {

      return (
        <Text>There was an error retrieving documents</Text>
      )

    }

    var documents = []

    _.each(this.props.documentReducer.documents, (document, key) => {

      documents.push(
        <ListItem button={true} onPress={() => { Actions.documentScene(document) }} key={key}>
          <Left>
            <Text>{document.Title}</Text>
          </Left>
          <Right>
            {this._showsignWarning(document)}
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>)

    })


    return (<List>
            {documents}
          </List>)

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
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.documentListScene.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          {this.renderList()}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListScene);
