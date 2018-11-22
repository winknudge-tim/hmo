/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Content, Form, Picker, Item as FormItem, Input, Label, Button, Text } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';

import Styles from '@configs/styles'
import LANG from '@configs/Lang'

import ImagePicker from 'react-native-image-picker'

import SubmitBtn from '@components/SubmitBtn'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../../../reducers/incidentReducer'

const windowWidth = Dimensions.get('window').width

class IncidentForm extends Component<{}> {
  
  constructor (props) {
    super(props);
  
    this.state = {
      image: null,
      formData: {
        sDescription: ""
      }
    }
  }

  componentWillReceiveProps (nextProps) {

    if (this.props.submitIncidentsReducer.success !== nextProps.submitIncidentsReducer.success &&
      nextProps.submitIncidentsReducer.success) {
        Alert.alert(
          'Success',
          LANG.newIncident.successMsg,
          [
            {text: 'OK', onPress: () => {
              this.setState({
                image: null,
                formData: {
                  sDescription: ""
                }
              }, () => {
                Actions.pop()
              })
            }
          }
          ],
          { cancelable: false }
        )
    }

    if (this.props.submitIncidentsReducer.error !== nextProps.submitIncidentsReducer.error &&
      nextProps.submitIncidentsReducer.error) {
        Alert.alert(
          'Error!',
          "There has been an error, please try again in a few minutes",
          [
            {text: 'OK', onPress: () => {}
          }
          ]
        )
      }

  }

  doAddMedia(buttonIndex) {
    
    const ADD_MEDIA_OPTIONS = {
      NEW_MEDIA: 0,
      FROM_LIBRARY: 1
    }

    switch (buttonIndex) {

      case ADD_MEDIA_OPTIONS.NEW_MEDIA:
        Actions.takePictureScene()
      break;

      case ADD_MEDIA_OPTIONS.FROM_LIBRARY:
        Actions.cameraRollScene()
      break;

    }

  }

  doCancel () {

    Alert.alert(
      'Cancel',
      LANG.newIncident.cancelMsg,
      [
        {text: 'No'},
        {text: 'Yes', onPress: () => Actions.pop()}
      ],
      { cancelable: false }
    )

  }

  doCreateNewIncident () {

    var previous = ""
    var responses = this.props.responses 
        
    if (responses && responses.length > 0) {
      
      _.each(responses, (previousAnswer, key) => {

        previous += "->" + previousAnswer + "\n"

      })

    }

    console.log(previous, this.state.formData.sDescription)

    this.props.submitIncident({
      "iItyId": "1",
      "sPhotoFileName": "test",
      "sVideoFileName": "test",
      "sTitle": "" + this.state.formData.sDescription,
      "sDescription": "" + this.state.formData.sDescription,
      "sLocation": (responses.length > 0) ? previous : "property",
      "iPrpId": "1",
       "iUsrId": "47"
    })

  }

  showActionSheet = () => {

    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        let source = { 
          data: response.data,
          uri: response.uri,
          height: response.height,
          width: response.width
        }
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        console.log(source)

        this.setState({
          image: source
        });
      }
    });


  }

  clearImage = () => {

    this.setState({
      image: null
    })

  }

  onChange = (key) => {

    return (val) => {

      var formData = this.state.formData || {}
      formData[key] = val

      this.setState({
        formData
      })
    }

  }

  renderImage () {

    console.log(this.state.image)
    if (this.state.image.height && this.state.image.width) {

      let actualWidth = windowWidth - 40

      let percentWidth = actualWidth / this.state.image.width

      var height = this.state.image.height * percentWidth

      return (
      <View style={{ height: height, width: actualWidth }}>
        <Image source={this.state.image} style={{ height: height, width: actualWidth }} />
        <Button transparent style={{ position: 'absolute', right: 10, top: 0 }} onPress={this.clearImage}>
          <Icon name='times-circle' size={25} color="#fff" />
        </Button>
      </View>)

    }

  }

  render () {

    var previous = ""
    var responses = this.props.responses 
        
    if (responses && responses.length > 0) {
      
      _.each(responses, (previousAnswer, key) => {

        previous += "->" + previousAnswer + "\n"

      })

    }

    return (
      <Grid>
        <Row>
          <Col>
            <Content style={Styles.CONTENT}>
              <Text>{LANG.newIncident.instruction}</Text>
              <Form style={{ marginLeft: -12 }}>
                
                {responses.length > 0 && <FormItem stackedLabel style={{ height: 200 }}>
                  <Label style={Styles.LABEL}>{LANG.newIncident.description}</Label>
                  <Input style={{ ...Styles.INPUT }} multiline={true} value={previous} disabled />
                </FormItem>}

                <FormItem stackedLabel style={{ height: 200 }}>
                  <Label style={Styles.LABEL}>{LANG.newIncident.furtherInfo}</Label>
                  <Input 
                    style={{ ...Styles.INPUT }}
                    multiline={true}
                    onChangeText={this.onChange('sDescription')}
                    value={this.state.formData.sDescription} />
                </FormItem>
              
                <FormItem stackedLabel>
                  <Label style={Styles.LABEL}>Add an image</Label>
                  {!this.state.image && <Button transparent style={{ ...Styles.SECONDARY_BUTTON, padding: 10 }} onPress={this.showActionSheet }>
                    <Icon name='image' size={25} color="#fff" />
                  </Button>}
                  {this.state.image && 
                  <View style={{ marginTop: 20 }}>
                    {this.renderImage()}
                  </View>}
                </FormItem>
              </Form>
            </Content>
          </Col>
        </Row>
        <Row style={{ ...Styles.FOOT_CONTENT, height: 60 }}>
          <Col>
            <Button transparent block onPress={this.doCancel.bind(this)} style={{ ...Styles.SECONDARY_BUTTON, marginRight: 5 }}>
              <Text style={Styles.SECONDARY_BUTTON_TEXT}>{LANG.newIncident.cancel}</Text>
            </Button>
          </Col>
          <Col>
            <SubmitBtn 
              btnStyle={{ ...Styles.PRIMARY_BUTTON, marginLeft: 6 }}
              isLoading={false} 
              onPress={this.doCreateNewIncident.bind(this)} />
            
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IncidentForm)

/*

<Button transparent block onPress={this.doCreateNewIncident.bind(this)} style={{ ...Styles.PRIMARY_BUTTON, marginLeft: 5 }}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{LANG.newIncident.create}</Text>
            </Button>
*/

const styles = StyleSheet.create({
  addMediaBtn: {
  }
});