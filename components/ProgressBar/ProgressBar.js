/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';

import Styles from '../../configs/styles'

export default class PropertyScene extends Component<{}> {

  render () {
    return (
      <Grid>
        <Row style={{ backgroundColor: Styles.COLORS.GREY, height: 30 }}>
          <Col style={{ backgroundColor: Styles.COLORS.GREEN, height: 30 }} size={this.props.progress}><Text style={{ fontSize: 11, marginLeft: 5, marginTop:  8 }}>{this.props.progress}% complete</Text></Col>
          <Col size={100-this.props.progress}></Col>
        </Row>
      </Grid>
    );
  }

}