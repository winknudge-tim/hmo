/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Alert
} from 'react-native'

import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base'

import { Actions } from 'react-native-router-flux'
import SignatureCapture from 'react-native-signature-capture'

import Styles from '../../configs/styles'
import DocService from '../../services/document.service'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { actions } from '../../actions/documentActions'

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(actions, dispatch)
})

class SignDocumentScene extends Component<{}> {
  
  constructor (props) {
    super(props);
  
    this.state = {
      selectedPropertyId: null,
      signature: null
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

  doSign = () => {
    this.refs["sign"].saveImage()

    //Actions.pop("documentListScene");

  }

  resetSign = () => {
    this.refs["sign"].resetImage();
    this.setState({
      signature: null
    })
  }

  didSave = () => {
    Alert.alert(
      'Signed',
      'Thank the document has been signed!',
      [
        {
          text: 'OK', 
          onPress: () => {
            Actions.pop()
            Actions.pop()
          }
        },
      ],
      {cancelable: false},
    );
  }

  didError = () => {
    Alert.alert(
      'Error',
      'Sorry there was an error while attempting to sign your document',
      [
        {text: 'OK' }
      ],
      {cancelable: false},
    );
  }

  _onSaveEvent = (result) => {
    // iFilId, DocId, iTcyId, sFile
    const { FilId, DocId } = this.props
    const { TcyId } = this.props.authReducer.user
    console.log(FilId, DocId, TcyId)
    this.didSave()
    // result.encoded
    // DocService.signDocument(FilId, DocId, 75, `data:image/png;base64,${result.encoded}`)
    //   .then((dd) => {
    //     console.log(dd)
    //   })
    //   .catch((e) => {
    //     console.log('err: ', e)
    //   })
  }

  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    this.setState({
      signature: true
    })
  }

  render () {

    const { signature } = this.state

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
            <Text style={{ margin: 10 }}>By signing, you are agreeing to the terms setout in this document.</Text>
            <Text style={{ margin: 10 }}>Please sign in the box below.</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    onSaveEvent={this._onSaveEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

          

          </View>
          <View style={{ height: 65, paddingHorizontal: 10 }}>
            {signature && <Button block style={Styles.PRIMARY_BUTTON} onPress={this.doSign}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>{this.props.Lang.signDocument.sign}</Text>
            </Button>}
          </View>
          <View style={{ height: 65, paddingHorizontal: 10 }}>
            {signature && <Button block style={Styles.SECONDARY_BUTTON} onPress={this.resetSign}>
              <Text style={Styles.SECONDARY_BUTTON_TEXT}>{this.props.Lang.signDocument.clear}</Text>
            </Button>}
          </View>
          <View style={{ flex: 1 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignDocumentScene);
