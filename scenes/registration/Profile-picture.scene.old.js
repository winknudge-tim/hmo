/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Image
} from 'react-native';

import _ from 'lodash'

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, H3, Card, CardItem, Thumbnail, ListItem, CheckBox, Spinner } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

function mapStateToProps (state) {
  return state
}

import { actions } from '../../reducers/registrationReducer'

import { actions as FbActions } from '../../actions/facebookActions'

import Styles from '../../configs/styles'

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch),
  ...bindActionCreators(FbActions, dispatch)
})


class ProfilePictureScene extends Component<{}> {
  
  constructor (props) {
    
    super(props);
  
    this.state = {
      images: [],
      selectedImage: null
    };

  }

  componentDidMount () {

    this.props.getFbProfilePictures()
    this.props.getTempData()

  }

  componentWillReceiveProps (nextProps) {

    var tempData;

    if (nextProps.facebookReducer && nextProps.facebookReducer.fbProfileImageURLs) {
     
      if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

        tempData = nextProps.registrationReducer.tempData;
  
        let index = nextProps.facebookReducer.fbProfileImageURLs.indexOf(tempData.profileImage)

        if (index > -1) {
          this.setState({ selectedImage: index })
        }
  
      }
      
    }

  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    if (!this.state.selectedImage && this.state.selectedImage !== 0) {

      Actions.employmentScene()

    } else {

      //profileImage
      var tempData = {};

      tempData.profileImage = this.props.facebookReducer.fbProfileImageURLs[this.state.selectedImage]

      tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

      this.props.saveTempData(tempData, 'employmentScene')

    }

  }

  selectImage (selectedImage) {

    this.setState({
      selectedImage: selectedImage
    })

  }

  renderImageChoices () {

    if (this.props.facebookReducer.showSpinner) {
      return (<Spinner />)
    } else {

       var imageChoices = []

      _.each(this.props.facebookReducer.fbProfileImageURLs, (uri, key) => {

        var borderColor = (this.state.selectedImage === key) ? 'red' : 'white';

        imageChoices.push(
          <Row key={key} style={{ marginTop: 10 }}>
            <Col>
            </Col>
              <Col style={{ borderWidth: 5, borderColor: borderColor, width: 150 }} onPress={() => { this.selectImage(key) }}>
                <Image source={{uri: uri }} style={{height: 140, width: 140 }} />
              </Col>
            <Col>
            </Col>
          </Row>
        )

      })

      return imageChoices

    }

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
            <Title>{this.props.Lang.profilePicture.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <Grid style={{ margin: 12 }}>
            <Row>
              <Col>
                <Text>{this.props.Lang.profilePicture.instructions}</Text>
                <Grid>
                  {this.renderImageChoices()}
                </Grid>
                
                <Button transparent block style={Styles.PRIMARY_BUTTON} onPress={this.goForward.bind(this)}>
                  <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.profilePicture.save}</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePictureScene);