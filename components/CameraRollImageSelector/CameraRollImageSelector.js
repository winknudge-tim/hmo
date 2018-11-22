//InputSwitcher
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  CameraRoll,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import { Button, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const { width, height } = Dimensions.get('window')

export default class CameraRollImageSelector extends Component<{}> {

	constructor (props) {
	  
	  super(props);

    this.state = {
      photos: [],
      selected: null
    };

	}

  componentWillMount () {

    console.log('I am mounting!');
    CameraRoll.getPhotos({
      first: 100,
      assetType: 'All',
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
    .catch((err) => {
      //Error Loading Images
      console.log(err)
    });

  }

  didSelectImg (imgUri) {

    if (imgUri !== this.state.selected) {
      this.setState({
        selected: imgUri
      })
    } else if (imgUri === this.state.selected) {

      this.setState({
        selected: null
      })

      alert('Image sent')

    }

  }

  renderSendText (imgUri) {

    if (imgUri === this.state.selected) {

      return (
        <Text style={styles.overlayText}>Send</Text>
      )

    }

  }

	render () {
		
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
         {this.state.photos.map((p, i) => {
         return (
          <View key={i}>
            <Button style={styles.btn} onPress={ () => { this.didSelectImg(p.node.image.uri) } }>
              <Image
                 style={styles.image}
                 source={{ uri: p.node.image.uri }}
               />
               {this.renderSendText(p.node.image.uri)}
            </Button>
           </View>
         );
       })}
       </ScrollView>
    )

	}

}

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  centerLoader: {
    height: height - 100,
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: width / 2, height: width / 2
  },
  image: {
    width: width / 2, height: width / 2
  },
  title: {
    textAlign: 'center',
    padding: 20
  },
  overlayText: {
    fontWeight: 'bold',
    left: 0,
    paddingLeft: 40,
    position: 'absolute'
  }
});