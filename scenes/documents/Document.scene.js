/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';

import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

import { Actions } from 'react-native-router-flux';

import Styles from '../../configs/styles'

import Pdf from 'react-native-pdf'

//import PDFView from 'react-native-view-pdf';

export default class DocumentScene extends Component<{}> {
  
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

  goForward = () => {

    Actions.signDocumentScene(this.props);

  }

  clearFilter () {

  }

  render () {
    const { RequiresSignature, HasBeenSigned } = this.props
    const source = {uri: this.props.PDF ,cache:true};
    
    return (
       <Container>
        <Header style={Styles.HEADER}>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-back' style={Styles.HEADER_ICON} />
            </Button>
          </Left>
          <Body>
            <Title style={Styles.HEADER_TITLE}>{this.props.Lang.documentScene.title}</Title>
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
            <Pdf
                      source={source}
                      onLoadComplete={(numberOfPages,filePath)=>{
                      }}
                      onPageChanged={(page,numberOfPages)=>{
                      }}
                      onError={(error)=>{

                      }}
                      style={{ flex:1,
                        width:Dimensions.get('window').width }}/>

          </View>
          {RequiresSignature === 'Y' && HasBeenSigned === 'N' && <View style={{ height: 65 }}>
            <Button block style={Styles.PRIMARY_BUTTON} onPress={this.goForward}>
              <Text>{this.props.Lang.documentScene.sign}</Text>
            </Button>
          </View>}
        </View>
      </Container>
    );

  }
}