/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Image,
  Dimensions,
  View
} from 'react-native';

//import {ImageCrop} from 'react-native-image-cropper'
//import ImagePicker from 'react-native-image-picker'



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

//import ImagePicker from 'react-native-image-picker'

import { actions } from '../../reducers/registrationReducer'

import { actions as FbActions } from '../../actions/facebookActions'

import Styles from '../../configs/styles'

var screenHeight = Dimensions.get('window').height
var screenWidth = Dimensions.get('window').width


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

      Actions.confirmProfile()

    } else {

        this.refs.cropper.crop()
            .then((base64) => {
                console.log(base64)
                var tempData = {};
                tempData.profileImage = base64

                tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

                this.props.saveTempData(tempData, 'confirmProfile')
            })

      //profileImag

    }

  }

  selectImage (selectedImage) {

    this.setState({
      selectedImage: selectedImage
    })

  }

  chooseAnImage = () => {

    var options = {
        title: 'Select image',
        customButtons: [],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
      
  
      // ImagePicker.showImagePicker(options, (response) => {
      
      //   if (response.didCancel) {
      //     console.log('User cancelled image picker');
      //   }
      //   else if (response.error) {
      //     console.log('ImagePicker Error: ', response.error);
      //   }
      //   else {
  
      //     let source = {
      //       uri: response.uri,
      //       data: response.data,
      //       height: response.height,
      //       width: response.width
      //     }
      
      //     // You can also display the image using data:
      //     // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
      //     console.log(response)
  
      //     this.setState({
      //       selectedImage: source
      //     });
      //   }
      // });

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
                    <Row>
                        <Col>
                        {this.state.selectedImage && 
                            <View>
                               
                            </View>}
                        </Col>
                    </Row>
                  <Row>
                      <Col>
                        <Button transparent block style={Styles.SECONDARY_BUTTON} onPress={this.chooseAnImage.bind(this)}>
                            <Text style={Styles.SECONDARY_BUTTON_TEXT}>{this.props.Lang.profilePicture.btnTxt}</Text>
                        </Button>
                      </Col>
                  </Row>
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