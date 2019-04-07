
import { Alert } from 'react-native'
import AuthService from '../services/auth.service'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';
import { types as regTypes } from './registrationReducer'
import Store from 'react-native-simple-store'

export const types = {
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_SUCCESSFULL: 'LOGIN_SUCCESSFULL',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGGED_OUT: 'LOGGED_OUT'
}
//1, 47
export const initialState = {
  user: null,
  propId: null,
  userId: null,
  showSpinner: false,
  error: null,
  hasError: false,
  isAlreadyRegistered: false
}

/*
 "UsrId": "140",
    "DateCreated": "11/22/2018 10:14:55 PM",
    "DateUpdated": "11/22/2018 10:14:55 PM",
    "TcyId": "49"

    "TcyId": "34",
    "TstId": "2",
    "TpsId": "1",
    "UsrId": "125",
    "PrpId": "1"
*/

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.LOGIN_REQUESTED:
      return { ...state, showSpinner: true, hasError: false, error: null }
    case types.LOGIN_SUCCESSFULL:
      return { ...state, showSpinner: false, hasError: false, error: null, payload: action.payload, userId: action.payload.UsrId, propId: action.payload.PrpId, user: action.payload }
    case types.LOGIN_FAILED:
      return { ...state, showSpinner: false, hasError: true, error: action.error }
    case types.LOGGED_OUT:
      return { ...state, showSpinner: false, hasError: false, error: null, payload: null, userId: null, user: null, propId: null }
    default:
      return state
  }
}

var logout = () => {

  return (dispatch) => {
    dispatch({ type: types.LOGGED_OUT })
    RegistrationService.clearTempData()
    Store.get('LOGIN_DETAILS').then(

			(data) => {
				if (data) {
          Store.delete('LOGIN_DETAILS')
          Actions.register()
				}
			},
			(err) => {
				console.error(err)
			})
    
  }

}

var loginWithEmail = (username, password) => {

  return (dispatch) => {
    if (!username || username === "" || !password || password === "") {
      Alert.alert(
        'Details not complete',
        'Please fill in both fields',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return
    }

    dispatch({ type: types.LOGIN_REQUESTED })

    AuthService.loginWithEmail(username, password)
      .then((payload) => {
        dispatch({ type: types.LOGIN_SUCCESSFULL, payload })
        return Store.save('LOGIN_DETAILS', {
          username,
          password
        })
      })
      .then(() => {
        RegistrationService.clearTempData()
        Actions.main()
      })
      .catch((e) => {
        dispatch({ type: types.LOGIN_FAILED, error: e })
        // Alert.alert(
        //   'Login failed',
        //   'Your details do no match what is in our system',
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ],
        //   { cancelable: false }
        // )
      })
  }

}

var goToLogin = () => {
  
  return () => {
    Actions.loginScene()
  }

}


var registerWithEmail = () => {

  return () => {
    
    Actions.reigsterSteps();

  }

}

export const actions = {
  logout,
  goToLogin,
  loginWithEmail,
  registerWithEmail
}