/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Image,
  Dimensions
} from 'react-native';

import ImagePicker from 'react-native-image-picker'

import { Container, Header, Content, Item, Input, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';

import { Actions } from 'react-native-router-flux';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import _ from 'lodash'
import moment from 'moment'

import { actions, actionTypes } from '../../actions/messagesActions'

import Styles from '../../configs/styles'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

var screenHeight = Dimensions.get('window').height
var screenWidth = Dimensions.get('window').width

import InputSwitcher from '../../components/InputSwitcher'
import CameraRollImageSelector from '../../components/CameraRollImageSelector'

const INPUT_HEIGHTS = {
  TEXT: 120,
  CAMERA: screenHeight / 2,
  IMAGE: 200
}

class ConversationScene extends Component {
  
  constructor (props) {
    
    super(props);


    var currInput = 'text'

    this.state = {
      keyboardHeight: 0,
      inputContainerHeight: this._getCurrentInputHeight(currInput),
      currentInputOption: currInput,
      msg: ''
    };

  }

  componentWillReceiveProps (nextProps) {


    if (this.props.singleMessage.type !== nextProps.singleMessage.type && nextProps.singleMessage.type === actionTypes.CREATED_RESPONE_SUCCESS) {

      this.clearInput()
      this.props.selectMessage(nextProps.singleMessage.meta)
      this.props.getMessages(this.props.authReducer.propId, this.props.authReducer.userId)

    }

    if (this.props.singleMessage.payload.length !== nextProps.singleMessage.payload.length) {
      if (nextProps.singleMessage.payload.length > 0 && this.component) {

        var input = 'text'

        this.setState({
          currentInputOption: input,
          inputContainerHeight: this._getCurrentInputHeight(input)
        })
        
      }
    }

  }

  _getCurrentInputHeight (input) {

    var inputContainerHeight

    switch (input) {

      case 'text':
        inputContainerHeight = INPUT_HEIGHTS.TEXT
      break;

      case 'camera':
        inputContainerHeight = INPUT_HEIGHTS.CAMERA
      break;

      case 'image':
        inputContainerHeight = INPUT_HEIGHTS.IMAGE
      break;

    }

    return inputContainerHeight;

  }

  componentWillMount () {

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (e) {

    this.setState({
      keyboardHeight: e.endCoordinates.height
    })

  }

  _keyboardDidHide () {

    this.setState({
      keyboardHeight: 0
    })

  }

  goBack () {
    Actions.pop();
  }

  goForward () {

    //Actions.guarantorScene();

  }

  doSend () {


  }

  onChangeText (text) {

    this.setState({
      msg: text
    })

  }

  didSwitchInputType (input) {

    if (this._msgInput && input !== 'text' && this.state.currentInputOption === 'text') {
      this._msgInput._root.blur()
    }

    this.setState({
      currentInputOption: input,
      inputContainerHeight: this._getCurrentInputHeight(input)
    })

  }

  clearInput () {

    this.setState({
      msg: '',
      selectedImage: null
    })

  }

  submitText () {
    let msg = this.state.msg

    switch (this.state.currentInputOption) {
      case 'text':
        if (msg !== '') {      
          return this.props.createResponse(this.props.singleMessage.meta.ChaId, 'T', msg, this.props.authReducer.userId)
        } else {
          return alert('Please enter a message')
        }
      case 'camera':
        if (this.state.selectedImage && this.state.selectedImage.data) {
          return this.props.createResponse(this.props.singleMessage.meta.ChaId, 'I', this.state.selectedImage.data, this.props.authReducer.userId)
        } else {
          return alert('Please select an image')
        }
    }

    
  }

  showImageOptions = () => {
    var options = {
      title: 'Select image',
      quality: 0.5,
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    

    ImagePicker.showImagePicker(options, (response) => {
    
      console.log(response)
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {

        let source = {
          data: response.data,
          height: response.height,
          width: response.width
        }
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          selectedImage: source
        });
      }
    });
  }

 
  
  renderInputType () {

    var isSending = this.props.singleMessage.type === actionTypes.CREATING_RESPONSE

    switch (this.state.currentInputOption) {

      case 'text':

        return (
          <Item style={{ paddingTop: 0 }}>
            <Input
              ref={ (c) => this._msgInput = c }
              multiline={true}
              placeholder='Add your message' 
              onSubmitEditing={this.doSend}
              returnKeyType='default'
              value={this.state.msg}
              onChangeText={this.onChangeText.bind(this)}
              style={styles.textInput}
               />
            <Icon name='close-circle' onPress={this.clearInput.bind(this)} />
            <Button disabled={isSending} block style={{ ...Styles.PRIMARY_BUTTON, borderRadius: 0, height: INPUT_HEIGHTS.TEXT, marginTop: 0 }} onPress={this.submitText.bind(this)}><Text style={Styles.PRIMARY_BUTTON_TEXT}>{isSending ? 'Sending' : 'Send'}</Text></Button>
          </Item>
        )

      break;

      case 'camera':
        return (
        <View style={{ 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center' }}>
          {this.state.selectedImage && 
          <Image 
            style={{ width: screenWidth, height: screenHeight / 2, position: 'absolute' }}
            source={{ uri: 'data:image/jpeg;base64,' + this.state.selectedImage.data }} />}

          <View style={{
            width: 150
          }}>
            <Button block disabled={isSending} style={{ ...Styles.SECONDARY_BUTTON, marginBottom: 5 }} onPress={this.showImageOptions.bind(this)}><Text style={Styles.SECONDARY_BUTTON_TEXT}>Choose image</Text></Button>
            {this.state.selectedImage && <Button disabled={isSending} block style={Styles.PRIMARY_BUTTON} onPress={this.submitText.bind(this)}><Text style={Styles.PRIMARY_BUTTON_TEXT}>{isSending ? 'Sending' : 'Send image'}</Text></Button>}
          </View>   
        
        </View>)
      break;

      case 'image':

        return (
          <CameraRollImageSelector />
        )

      break;

    }

  }

  renderConversation () {

    var userId = this.props.authReducer.userId;
    var conversation = this.props.singleMessage.payload
    var list = []

    if (conversation.length > 0) {
      // conversation = _.sortBy(conversation, ['MessageDate', 'asc'])
    }

    var otherStyle = {
      textAlign: "left"
    }

    var youStyle = {
      textAlign: "right"
    }

    if (conversation) {

      _.each(conversation, (message,key) => {

        var txtStyle = otherStyle
        var txtContainer = [styles.msgThem, Styles.THEM]

        if (Number(message.UsrId) === Number(userId)) {
          txtStyle = youStyle
          var txtContainer = [styles.msgYou, Styles.YOU]
        }
        //messageDate profileImg
//<Thumbnail source={{ uri: message.profileImg }} />
        list.push(
          <ListItem avatar key={key}>
              <Left>
                
              </Left>
              <Body>
                <Text note style={{ ...txtStyle, fontWeight: 'bold' }}>{message.FirstName} {message.SecondName}</Text>
                <Text note style={{ ...txtStyle, marginBottom: 2, fontSize: 10 }}>{moment(message.MessageDate).format('h:mma DD/MM/YYYY')}</Text>
                {message.MessageType === "T" && <View style={txtContainer}><Text style={txtStyle}>{message.Message}</Text></View>}
                {message.MessageType === "I" && <Image style={{ width: 300, height: 300 }} source={{ uri: message.Message }} />}
              </Body>
              <Right>
                {Number(message.UsrId) === Number(userId) && <Text>You</Text>}
              </Right>
            </ListItem>
        )

      })


    }

    return (list)

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
            <Title style={Styles.HEADER_TITLE}>{this.props.singleMessage.meta.Title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Content ref={(ref) => { this.component = ref }}>
              <List>
                {this.renderConversation()}
              </List>
            </Content>
          </View>
          <View style={{ backgroundColor: '#c4c4c4', height: 45 }}>
            <InputSwitcher initialSelected={this.state.currentInputOption} didSwitch={this.didSwitchInputType.bind(this)} />
          </View>
          <View style={{ height: this.state.inputContainerHeight + this.state.keyboardHeight }}>
            {this.renderInputType()}
          </View>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInput: {
    height: 110,
    marginTop: -25
  },
  msgYou: {
    backgroundColor: 'red',
    borderRadius: 10,
    borderTopRightRadius: 0,
    padding: 5,
    marginLeft: '10%',
    width: '90%',
    marginTop: 10,
    marginBottom: 10
  },
  msgThem: {
    backgroundColor: 'red',
    borderRadius: 10,
    borderTopLeftRadius: 0,
    padding: 5,
    width: '90%',
    marginTop: 10,
    marginBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationScene);
