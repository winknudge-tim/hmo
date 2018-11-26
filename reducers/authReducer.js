
import { Alert } from 'react-native'
import AuthService from '../services/auth.service'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';
import { types as regTypes } from './registrationReducer'
import Store from 'react-native-simple-store'

export const types = {
  LOGIN_REQUESTED: 'LOGIN_REQUESTED',
  LOGIN_SUCCESSFULL: 'LOGIN_SUCCESSFULL',
  LOGIN_FAILED: 'LOGIN_FAILED'
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
    case regTypes.LOGIN_SUCCESSFULL:
      return { ...state, showSpinner: false, hasError: false, error: null, payload: action.payload, userId: action.payload.UsrId, propId: action.payload.PrpId }
      case regTypes.LOGIN_FAILED:
      return { ...state, showSpinner: false, hasError: true, error: action.error }
    default:
      return state
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

    console.log('ok lett attempt to login')

    dispatch({ type: types.LOGIN_REQUESTED })

    AuthService.loginWithEmail(username, password)
      .then((payload) => {
        console.log('logged in')
        dispatch({ type: types.LOGIN_SUCCESSFULL, payload })
        return Store.save('LOGIN_DETAILS', {
          username,
          password
        })
      })
      .then(() => {
        Actions.main()
      })
      .catch((e) => {
        console.log('error?')
        dispatch({ type: types.LOGIN_FAILED, error: e })
        Alert.alert(
          'Login failed',
          'Your details do no match what is in our system',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      })
  }

}

var registerWithEmail = () => {

  return (dispatch) => {
    
    RegistrationService.clearTempData()
    Actions.main();

  }

}

export const actions = {
  loginWithEmail,
  registerWithEmail
}