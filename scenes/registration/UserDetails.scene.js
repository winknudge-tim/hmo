/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash'
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Spinner, Container, Header, Content, Form, Thumbnail, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
// /import ImagePicker from 'react-native-image-picker'
import ImagePicker from 'react-native-image-crop-picker';


import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormDataHelper from '../../helpers/FormData.helper'

import { default as FormInput, test } from '../../components/FormInput'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import IMAGES from '../../configs/images'
const { AVATAR_PLACEHOLDER } = IMAGES

import { actions } from '../../reducers/registrationReducer'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})


class UserDetailsScene extends Component<{}> {
  
  constructor(props) {
    super(props);
  
    var formData = {}
    FormDataHelper.createDataField(formData, 'userName', INPUT_TYPES.TEXT, this.props.Lang.userDetails.userName + '*', null, null, true)
    FormDataHelper.createDataField(formData, 'password', INPUT_TYPES.PASSWORD, this.props.Lang.userDetails.password + '*', null, null, true)

    this.state = {
      chosenImage: null,
      mimeType: null,
      formData: formData,
      formInvalid: !FormDataHelper.isFormValid(formData)
    };

  }

  componentDidMount () {

    this.props.getTempData(this.props.authReducer.fbAuthed)

  }
  
  componentWillReceiveProps (nextProps) {

    var tempData;

    if (nextProps.registrationReducer && nextProps.registrationReducer.tempData) {

      tempData = nextProps.registrationReducer.tempData;

      _.each(tempData, (value, id) => {

        if (this.state.formData[id]) {

          this.state.formData[id].value = value

        }

      })

      var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

      this.setState({
        formData: this.state.formData,
        formInvalid: formInvalid
      })

    }

  }
 
  formInputDidChange (id, newText) {
     this.state.formData[id].value = newText

     var formInvalid = !FormDataHelper.isFormValid(this.state.formData)

     this.setState({
      formData: this.state.formData,
      formInvalid: formInvalid
     })
  }

  chooseAnImage = () => {

    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
      mediaType: 'photo'
    }).then(image => {
      
      if (image && image.data) {
        console.log(image)
        this.setState({
          chosenImage: image.data,
          mimeType: image.mime
        })
      } else {
        Alert.alert(
          'No image found',
          'No image was imported!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }
      
    });
    // var options = {
    //     title: 'Select image',
    //     customButtons: [],
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images'
    //     }
    //   };
      
  
    //   ImagePicker.showImagePicker(options, (response) => {
      
    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     }
    //     else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     }
    //     else {
  
    //       let source = {
    //         uri: response.uri,
    //         data: response.data,
    //         height: response.height,
    //         width: response.width
    //       }
      
    //       // You can also display the image using data:
    //       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
    //       this.setState({
    //         selectedImage: source
    //       });
    //     }
    //   });

  }


  doSave () {
    var tempData = {};

    _.each(this.state.formData, function(field, id) {

      tempData[id] = field.value

    })

    tempData = _.defaults(tempData, this.props.registrationReducer.tempData)

    this.props.saveTempData(tempData, 'profilePictureScene')
  }

  doRender () {

    var { chosenImage, mimeType, formData } = this.state
//PRIMARY_BUTTON_DISABLED
    if (this.props.registrationReducer.showSpinner) {
      return (<Spinner />)
    } else {

      var imgSrc = AVATAR_PLACEHOLDER 
      if (chosenImage) {
        imgSrc = { uri: `data:${mimeType};base64,${chosenImage}` }
      }

      return (

        <View style={{ flex: 1 }}>
          <Content style={{ padding: 10 }}>
            <Text>{this.props.Lang.userDetails.instructions}</Text>
              <View style={{
                alignItems: 'center'
              }}>
                <TouchableOpacity onPress={this.chooseAnImage}>
                  <Thumbnail large source={imgSrc} />
                </TouchableOpacity>
                <Text>Add a profile picutre</Text>
              </View>
              <Form style={{ marginLeft: -12 }}>
                <FormInput {...formData.userName} onChangeText={this.formInputDidChange.bind(this)} disableAutoCapitalize={true} />
                <FormInput {...formData.password} onChangeText={this.formInputDidChange.bind(this)} secureTextEntry={true} />
              </Form>
          </Content>
          <View style={{ height: 80, margin: 10 }}>
            <Button transparent disabled={this.state.formInvalid} block style={[Styles.PRIMARY_BUTTON, this.state.formInvalid && Styles.PRIMARY_BUTTON_DISABLED]} onPress={this.doSave.bind(this)}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.confirmProfile.save}</Text>
            </Button>
          </View>
        </View>
      )

    }

  }

  render () {
    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.Lang.userDetails.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          {this.doRender()}
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsScene);