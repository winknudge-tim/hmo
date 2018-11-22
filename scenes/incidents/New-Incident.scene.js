/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert
} from 'react-native';

import ActionSheet from 'react-native-actionsheet'

import { Container, Header, Content, Form, Picker, Item as FormItem, Input, Label, Left, Body, Right, Button, Icon, Title, Text, List, ListItem } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Actions } from 'react-native-router-flux';

import { INCIDENT_STATUS } from '../../configs'

import Styles from '../../configs/styles'

const Item = Picker.Item;

export default class NewIncidentScene extends Component<{}> {
  
  constructor (props) {
    super(props);
  
    this.state = {
      location: 'living room',
      priority: 'normal'
    };
  }

  goBack () {

    Actions.pop();

  }

  goForward () {

    //Actions.guarantorScene();

  }


  doAddMedia(buttonIndex) {
    const ADD_MEDIA_OPTIONS = {
      NEW_MEDIA: 0,
      FROM_LIBRARY: 1
    }

    switch (buttonIndex) {
      case ADD_MEDIA_OPTIONS.NEW_MEDIA:
        return  Actions.takePictureScene()
      case ADD_MEDIA_OPTIONS.FROM_LIBRARY:
        return Actions.cameraRollScene()
    }
  }

  onValueChange (prop) {

    return (value: string) => {

      var propToBeChange = {};
      propToBeChange[prop] = value;

      this.setState(propToBeChange)

    }

  }

  doCreateNewIncident () {

    Alert.alert(
      'Success',
      this.props.Lang.newIncident.successMsg,
      [
        {text: 'OK', onPress: () => Actions.pop()}
      ],
      { cancelable: false }
    )

  }

  showActionSheet = () => {
    this.ActionSheet.show()
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
            <Title>{this.props.Lang.newIncident.title}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content style={{ margin: 12 }}>
          <Form style={{ marginLeft: -12 }}>
            <FormItem stackedLabel>
              <Label>{this.props.Lang.newIncident.description}</Label>
              <Input style={styles.descriptionInput} multiline={true} />
            </FormItem>

            <FormItem>
              <Label>Location</Label>
              <Input />
            </FormItem>
          
            <FormItem>
              <Label>{this.props.Lang.newIncident.media}:</Label>
              <Button transparent style={Styles.PRIMARY_BUTTON} onPress={this.showActionSheet }>
                <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.newIncident.addMedia}</Text>
              </Button>
            </FormItem>
          </Form>
          <Button transparent block onPress={this.doCreateNewIncident.bind(this)} style={Styles.PRIMARY_BUTTON}>
            <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.newIncident.create}</Text>
          </Button>
        </Content>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Take picture/video', 'Add from library', 'Cancel']}
          cancelButtonIndex={2}
          onPress={this.doAddMedia}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  descriptionInput: {
      height: 150
  },
  addMediaBtn: {
  }
});