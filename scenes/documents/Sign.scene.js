/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Radio, Label, Left, Body, Right, Button, Icon, Title, Text, H3, List, ListItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';
import SignatureCapture from 'react-native-signature-capture';

import Styles from '../../configs/styles'

export default class SignDocumentScene extends Component<{}> {
  
  constructor (props) {
    super(props);
  
    this.state = {
      selectedPropertyId: null
    };
  }

  isPropertySelected (propertyId) {

    return this.state.selectedPropertyId === propertyId

  }

  doSelectProperty (propertyId) {

    this.setState({ selectedPropertyId: propertyId });

  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    Actions.pop("documentListScene");

  }

  clearFilter () {

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
            <Title>{this.props.Lang.signDocument.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 10 }}>By signing you are agreeing to the terms setout in this document</Text>
          </View>
          <View style={{ flex: 1 }}>
          <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

          

          </View>
          <View style={{ height: 65 }}>
            <Button block style={Styles.PRIMARY_BUTTON} onPress={this.goForward}>
              <Text>{this.props.Lang.signDocument.sign}</Text>
            </Button>
          </View>
        </View>
      </Container>
    );

  }

  saveSign() {
      this.refs["sign"].saveImage();
  }

  resetSign() {
      this.refs["sign"].resetImage();
  }

  _onSaveEvent(result) {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result);
  }
  _onDragEvent() {
       // This callback will be called when the user enters signature
      console.log("dragged");
  }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});
