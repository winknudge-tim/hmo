import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';

import { registrationReducer } from './registrationReducer';
import { authReducer } from './authReducer'
import { documentReducer } from './documentReducer'
import { messagesReducer, singleMessage } from './messagesReducer'
import { propertyReducer } from './propertyReducer'
import { incidentFAQReducer, incidentTreeQuestionsReducer, incidentAnswersReducer, recordedIncidentsReducer, submitIncidentsReducer } from './incidentReducer'
import { registrationProgressReducer } from './registrationProgressReducer'

const initialState = {
    scene: {}
  }

const sceneReducer = function (state = initialState, action) {
    switch (action.type) {
      case ActionConst.FOCUS:
        return { ...state, scene: action.scene }
      default:
        return state
    }
  }

export const appReducer = combineReducers({
    sceneReducer,
    registrationReducer,
    authReducer,
    documentReducer,
    messagesReducer,
    singleMessage,
    propertyReducer,
    incidentFAQReducer,
    incidentTreeQuestionsReducer,
    incidentAnswersReducer,
    recordedIncidentsReducer,
    registrationProgressReducer,
    submitIncidentsReducer
});