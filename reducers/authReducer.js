
import AuthService from '../services/auth.service'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';

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
  fbAuthed: false,
  isAlreadyRegistered: false
}

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.CHECKING_FOR_FB_TOKEN:
      return { ...state, showSpinner: true, fbAuthed: false, hasError: false, error: null }

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