
import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';

import PropTypes from 'prop-types'

import { Container, Button, Text, Spinner } from 'native-base';
//import getTheme from './native-base-theme/components';
//import material from './native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as registrationActions } from '../../reducers/registrationReducer'
import { actions as authActions } from '../../reducers/authReducer'

import Styles from '../../configs/styles'
import ImageConfig from '../../configs/images'

import Store from 'react-native-simple-store'

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

function mapStateToProps (state) {
  return state
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(registrationActions, dispatch),
  ...bindActionCreators(authActions, dispatch)
})

class RegisterScene extends Component<{}> {

  static propTypes = {
    routes: PropTypes.object,
  };

  componentDidMount () {
    //this.props.loginWithEmail()
    Store.get('LOGIN_DETAILS')
      .then(({username, password}) => {
        this.props.loginWithEmail(username, password)
      })
      .catch(() => {

      })


  }

  doRender () {

    if (this.props.authReducer.showSpinner) {
      return (<Spinner color='white' />)
    }

    return (
      <Grid>
        <Row>
          <Col>
            <Button transparent block onPress={this.props.registerWithEmail} block style={Styles.PRIMARY_BUTTON}>
              <Text style={Styles.PRIMARY_BUTTON_TEXT}>Register</Text>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button transparent block onPress={this.props.goToLogin} block style={Styles.SECONDARY_BUTTON}>
              <Text style={Styles.SECONDARY_BUTTON_TEXT}>Login</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    )
                 

  }

  render () {
    return (
       <Container>
          <Image source={ImageConfig.HOME_SPLASH_IMAGE} style={styles.bgImg} />
          <SafeAreaView style={{flex: 1 }}>
            <Grid style={{ margin: 12 }}>
              <Row>
                <Col>
                  <Image source={ImageConfig.HOME_LOGO}  style={styles.logo} />
                </Col>
              </Row>
              <Row style={styles.btnCotainer}>
                <Col>
                  {this.props.authReducer.userId === null && this.doRender()}
                </Col>
              </Row>
            </Grid>
          </SafeAreaView>
      </Container>
    )


  }
}

const styles = {
  bgImg: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth
  },
  logo: {
    marginTop: 50,
    height: 120,
    width: deviceWidth-50,
    resizeMode: 'contain'
  },
  btnCotainer: {
    height: 120
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScene);