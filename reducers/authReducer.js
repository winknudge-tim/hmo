
import AuthService from '../services/auth.service'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';
import { types as regTypes } from './registrationReducer'

export const types = {
  CHECKING_FOR_FB_TOKEN: 'CHECKING_FOR_FB_TOKEN',
  HAS_FB_TOKEN: 'HAS_FB_TOKEN',
  FB_TOKEN_ERROR: 'FB_TOKEN_ERROR',
  HAS_FB_TOKEN: 'HAS_FB_TOKEN',
  NO_FB_TOKEN: 'NO_FB_TOKEN'
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
*/

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.CHECKING_FOR_FB_TOKEN:
      return { ...state, showSpinner: true, hasError: false, error: null }
    case regTypes.REGISTER_USER_SUCCESS:
      return { ...state, showSpinner: false, hasError: false, error: null }
    default:
      return state
  }
}



var loginWithEmail = () => {

  return (dispatch) => {
    

  }

}

var registerWithEmail = () => {

  return (dispatch) => {
    
    RegistrationService.clearTempData()
    Actions.userDetailsScene();

  }

}

export const actions = {
  loginWithEmail,
  registerWithEmail
}