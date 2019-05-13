/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ImageBackground,
  View
} from 'react-native'

import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base'
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid'

import ImagePicker from 'react-native-image-picker'

import _ from 'lodash'
import moment from 'moment'

import { Actions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import constants from '../../configs/constants'
const { INPUT_TYPES } = constants

import { actions, actionTypes } from '../../actions/messagesActions'

import Styles from '../../configs/styles'

import { GiftedChat } from "react-native-gifted-chat"

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class ConversationsScene extends Component {
  
    state = {
        messages: [],
        selectedImage: {}
    }

    componentWillMount() {

        // this.props.selectMessage({
        //     "ChaId": "74",
        //     "Title": "Fff",
        //     "CreatedBy": "Luke",
        //     "DateCreated": "Sun Apr 07 2019 17:49:17 GMT+01:00",
        //     "DateUpdated": "Sun Apr 07 2019 17:49:17 GMT+01:00"
        // })
      }

      onSend(messages = []) {
        this.props.createResponse(this.props.singleMessage.meta.ChaId, 'T', messages[0].text, this.props.authReducer.userId)
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, messages)
        // }));
      }

    componentWillReceiveProps (nextProps) {
        var messageData = nextProps.singleMessage.payload
        var formattedMsgs = []

        _.each(messageData, (msg, index) => {
            var formattedMsg = {
                _id: index,
                text: msg.MessageType === "I" ? "" : msg.Message,
               // image: 'https://placeimg.com/540/340/any',
                createdAt: new Date(msg.MessageDate),
                user: {
                  _id: msg.UsrId,
                  name: msg.FirstName + " " + msg.SecondName,
                  avatar: "https://placeimg.com/140/140/any"
                }
              }

            if (msg.MessageType === "I") {
                formattedMsg.image =  msg.Message
            }
            formattedMsgs.push(formattedMsg)
        })

        this.setState({
            messages: formattedMsgs
        })

        if (this.props.singleMessage.type !== actionTypes.CREATED_RESPONE_SUCCESS &&
            nextProps.singleMessage.type === actionTypes.CREATED_RESPONE_SUCCESS) {
            this.props.selectMessage(this.props.singleMessage.meta)
        }
    }

    pickImage = () => {

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

              this.setState({
                selectedImage: response
              })
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
            }
          });
          

    }

    renderActions = () => {
        return (<Button transparent onPress={this.pickImage}>
            <Icon name='camera' />
          </Button>)
    }

    cancelImage = () => {
        this.setState({
            selectedImage: {}
        })
    }

    sendImage = () => {
        this.props.createResponse(this.props.singleMessage.meta.ChaId, 'I', this.state.selectedImage.data, this.props.authReducer.userId)
        this.setState({
            selectedImage: {}
        })
    }

    goBack () {
        Actions.pop();
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
            {this.state.selectedImage.uri && <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor:'yellow' }}>
                    <ImageBackground source={{ uri: this.state.selectedImage.uri }} style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ paddingBottom: 20, flexDirection: 'row' }}>
                    <Button onPress={this.cancelImage} style={{ ...Styles.SECONDARY_BUTTON, borderRadius: 0, flex: 1, justifyContent: 'center' }}>
                        <Text style={Styles.SECONDARY_BUTTON_TEXT}>Cancel</Text>
                    </Button>
                    <Button onPress={this.sendImage} style={{ ...Styles.PRIMARY_BUTTON, borderRadius: 0, flex: 1, justifyContent: 'center' }}>
                        <Text style={{ ...Styles.PRIMARY_BUTTON_TEXT, textAlign: 'center' }}>Send</Text>
                    </Button>
                </View>
            </View>}
            {!this.state.selectedImage.uri && <View style={{ flex: 1 }}>
                <GiftedChat
                renderUsernameOnMessage
                messages={this.state.messages}
                renderActions={this.renderActions}
                onSend={messages => this.onSend(messages)}
                user={{
                _id: this.props.authReducer.userId
                }}
            />
            </View>}
        </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsScene);

