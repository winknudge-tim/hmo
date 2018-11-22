import React, { Component } from 'react';

import { Button, Text, Spinner } from 'native-base';

import Styles from './Styles'

const DEFAULT_COLOR = 'white'
const DEFAULT_TEXT = 'Submit'

export default class SubmitBtn extends Component<{}> {

  render () {

    var btnStyle = Styles.btnStyle
    var textStyle = Styles.textStyle

    if (this.props.btnStyle) {
      btnStyle = { ...Styles.btnStyle, ...this.props.btnStyle }
    }

    if (this.props.textStyle) {
      textStyle = { ...Styles.textStyle, ...this.props.textStyle }
    }

    return (
      <Button 
        transparent
        block 
        style={{ ...Styles.btnStyle, ...btnStyle }}
        disabled={this.props.isLoading}
        onPress={this.props.onPress}>
          {!this.props.showLoad && 
            <Text style={{ ...Styles.textStyle, ...textStyle }}>{ this.props.children || DEFAULT_TEXT }</Text>
          }
          {this.props.isLoading && 
            <Spinner 
              size='small'
              color={this.props.color || DEFAULT_COLOR } />
          }
      </Button>
    );
  }

}