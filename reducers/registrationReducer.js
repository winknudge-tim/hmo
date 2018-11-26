
import _ from 'lodash'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';
import { types as AuthTypes } from './authReducer'
import Store from 'react-native-simple-store'


export const types = {
	RETRIEVING_TEMP_DETAILS: 'GETTING_DETAILS',
	RETRIEVED_TEMP_DETAILS: 'RETRIEVED_DETAILS',
	SAVING_TEMP_DETAILS: 'SETTING_DETAILS',
  SAVED_TEMP_DETAILS: 'SAVED_TEMP_DETAILS',
  FETCHING_IS_REGISTERED: 'FETCHING_IS_REGISTERED',
  FETCHED_IS_REGISTERED: 'FETCHED_IS_REGISTERED',
  REGISTERING_USER: 'REGISTERING_USER',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR: 'REGISTER_USER_ERROR'
}

export const initialState = {
  user: null,
  showSpinner: false,
  error: null,
  hasRegistered: false,
  tempData: {
    annualEarnings: 0
  }
}



export const registrationReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.RETRIEVING_TEMP_DETAILS:
      return { ...state, showSpinner: true, error: null }

    break

    case types.RETRIEVED_TEMP_DETAILS:

      return { ...state, showSpinner: false, error: null, tempData: action.tempData }

    break

    case types.SAVING_TEMP_DETAILS:
      return { ...state, showSpinner: true, error: null }

    break

    case types.SAVED_TEMP_DETAILS:
      return { ...state, showSpinner: false, error: null, tempData: action.tempData }

    break

    default:
      return state
  }
}

export const initialSubmitState = {
  showSpinner: false,
  error: null
}

export const submitRegReducer = (state = initialSubmitState, action) => {
  switch (action.type) {  
    case types.REGISTERING_USER:
      return {...state, showSpinner: true, error: null}
    case types.REGISTER_USER_SUCCESS:
      return {...state, showSpinner: false}
    case types.REGISTER_USER_ERROR:
      return {...state, showSpinner: false, error: action.error}
    default:
      return state
  }
}

function saveTempData (tempData, nextScreen) {

  return (dispatch) => {

    dispatch({ type: types.SAVING_TEMP_DETAILS })

    RegistrationService.saveTempData(tempData).then(
      () => { // Success

        dispatch({ type: types.SAVED_TEMP_DETAILS, tempData })
        
        if (nextScreen) {
          Actions.pop()
        }

      },
      () => { // Error

        dispatch({ type: types.SAVED_TEMP_DETAILS })

      })



  }

}

function getTempData () {

  return (dispatch) => {

    dispatch({ type: types.RETRIEVING_TEMP_DETAILS })

    RegistrationService.getTempData().then(
      (tempData) => { // Success

        dispatch({ type: types.RETRIEVED_TEMP_DETAILS, tempData  })

      },
      (error) => { // Error

        console.log(error)

      })

  }

}

function isUserRegistered (fbId) {

  return (dispatch) => {

    dispatch({ type: types.FETCHING_IS_REGISTERED })

    RegistrationService.doesUserFBAlreadyExist().then((isRegisted, user) => {

      console.log(isRegisted)
      

    })
    //FETCHED_IS_REGISTERED

  }

}

/*
    "UsrId": "149",
    "DateCreated": "11/26/2018 9:44:46 PM",
    "DateUpdated": "11/26/2018 9:44:46 PM",
    "TcyId": "58",
    "PrpId": "1"
*/

function registerUser () {

  return (dispatch) => {
  
    dispatch({ type: types.REGISTERING_USER })

    RegistrationService.registerUser()
      .then((res) => {
        
        dispatch({ type: types.REGISTER_USER_SUCCESS, payload: res })
        dispatch({ type: AuthTypes.LOGIN_SUCCESSFULL, payload: res })
        
        return RegistrationService.getTempData()

      })
      .then((tempData) => {
        return Store.save('LOGIN_DETAILS', {
          username: tempData.userName,
          password: tempData.password
        })
      })
      .then(() => {
        RegistrationService.clearTempData()
        Actions.registrationCompleteScene()
      })
      .catch((e) => {

        console.log('ERROR')
        console.log(e)
        dispatch({ type: types.REGISTER_USER_ERROR, error: e })

      })
    //dispatch({ type: types.REGISTER_USER_SUCCESS })
    //dispatch({ type: types.REGISTER_USER_ERROR })

  }

}

export const actions = {
  saveTempData,
  getTempData,
  isUserRegistered,
  registerUser
}