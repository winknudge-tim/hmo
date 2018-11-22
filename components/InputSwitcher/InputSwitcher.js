//InputSwitcher
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { Button, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class InputSwitcher extends Component<{}> {

	constructor (props) {
	  
	  super(props);
	
	  this.state = {
	  	selected: this.props.initialSelected || 'text'
	  };

	}

	doSelect (selected) {

		return () => {
			this.setState({ selected: selected })
			this.props.didSwitch(selected)
		}

	}

	setStyle (inputType) {

		return (inputType === this.state.selected) ? styles.selectedIcon : styles.unselectedIcon

	}

	render () {
		return (
		 <Grid>
          <Row>
            <Col style={styles.col}>
              <Button block ref='textBtn' transparent style={styles.btn} onPress={this.doSelect('text')}>
                <Icon name='text' style={this.setStyle('text')} />
              </Button>
            </Col>
            <Col style={styles.col}>
              <Button block ref='cameraBtn' transparent style={styles.btn} onPress={this.doSelect('camera')}>
                <Icon name='camera' style={this.setStyle('camera')} />
              </Button>
            </Col>
          </Row>
        </Grid>
		)
	}

}

var styles = {
  col: { width: 70 },
  btn: { marginTop: -5, width: 70 },
  selectedIcon: { color: 'white', fontSize: 40, margin: 0, padding: 0 },
  unselectedIcon: { color: 'black', fontSize: 40, margin: 0, padding: 0 }
};