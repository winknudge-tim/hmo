
import _ from 'lodash'
import Lang from '../configs/Lang'
import RegistrationService from '../services/registration.service'
import { Actions } from 'react-native-router-flux';
import FormDataHelper from '../helpers/FormData.helper'


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

function getTempData (fbAuthed) {

  return (dispatch) => {

    dispatch({ type: types.RETRIEVING_TEMP_DETAILS })

    RegistrationService.getTempData(fbAuthed).then(
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

function registerUser () {

  return (dispatch) => {
  
    dispatch({ type: types.REGISTERING_USER })

    RegistrationService.registerUser()
      .then((res) => {

        console.log(res)
        dispatch({ type: types.REGISTER_USER_SUCCESS })
        Actions.registrationCompleteScene()

      })
      .catch((e) => {

        console.log('ERROR')
        console.log(e)
        dispatch({ type: types.REGISTER_USER_ERROR })

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