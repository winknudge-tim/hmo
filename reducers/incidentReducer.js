import { actionTypes } from '../actions/incidentsFaqActions'
import IncidentService from '../services/incidents.service'

export const initialState = {
  payload: {},
  loading: false,
  error: null
}

export const incidentFAQReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case actionTypes.RETRIEVING_INCIDENT_CATEGORIES:
    
      return { ...state, error: null, type: action.type }

    break

    case actionTypes.RETRIEVED_INCIDENT_CATEGORY_SUCCESS:
    
      return { ...state, error: null, payload: action.payload, type: action.type }

    break

    case actionTypes.RETRIEVED_INCIDENT_CATEGORY_ERROR:
    
      return { ...state, error: action.error, type: action.type }

    break

    default:
      return state
  }

}

export const incidentTreeQuestionsReducer = (state = initialState, action) => {

    switch (action.type) {
    
        case actionTypes.RETRIEVING_INCIDENT_QUESTIONS:
        
          return { ...state, error: null, type: action.type, loading: true }
    
        break
    
        case actionTypes.RETRIEVED_INCIDENT_QUESTIONS_SUCCESS:
        
          return { ...state, error: null, payload: action.payload, type: action.type, loading: false }
    
        break
    
        case actionTypes.RETRIEVED_INCIDENT_QUESTIONS_ERROR:
        
          return { ...state, error: action.error, type: action.type, loading: false }
    
        break
    
        default:
          return state
      }

}

export var incidentActionTypes = {}
export var actions = {}

export const incidentAnswersReducer = (state = initialState, action) => {

    switch (action.type) {
    
        case actionTypes.SET_INCIDENT_ANSWER:
        
          return { ...state, error: null, payload: action.payload, type: action.type }
    
        break
    
        default:
          return state
      }

}

/**
 * SUBMIT INCIDENT
 */
incidentActionTypes.INCIDENT_SUBMITTING = 'INCIDENT_SUBMITTING'
incidentActionTypes.INCIDENT_SUBMITTED_SUCCESS = 'INCIDENT_SUBMITTED_SUCCESS'
incidentActionTypes.INCIDENT_SUBMITTED_FAILURE = 'INCIDENT_SUBMITTED_FAILURE'
incidentActionTypes.INCIDENT_SUBMITTED_CLEAR = 'INCIDENT_SUBMITTED_CLEAR'

actions.submitIncident = function (incident, createChat) {
  return (dispatch) => {
    dispatch({ type: incidentActionTypes.INCIDENT_SUBMITTING })

  
    IncidentService.logIncident(incident, createChat)
      .then(() => {
        dispatch({ type: incidentActionTypes.INCIDENT_SUBMITTED_SUCCESS })
        
        dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVING })

        IncidentService.getIncidents(incident.iPrpId)
          .then((payload) => {
            dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_SUCCESS, payload })
          })
          .catch((e) => {
            console.log('ERROR!!!')
            console.log(e)
            dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_FAILED })
          })


      })
      .catch(() => {
        dispatch({ type: incidentActionTypes.INCIDENT_SUBMITTED_FAILURE })
      })
  }
}
const initialSubmitIncidents = {
  loading: false,
  error: null,
  success: false
}


export const submitIncidentsReducer = (state = initialSubmitIncidents, action) => {

  switch(action.type) {

    case incidentActionTypes.INCIDENT_SUBMITTING:
      return { ...state, loading: true, error: null, success: false }

    case incidentActionTypes.INCIDENT_SUBMITTED_SUCCESS:
      return { ...state, loading: false, success: true }

    case incidentActionTypes.INCIDENT_SUBMITTED_FAILURE:
      return { ...state, loading: false, error: true }

    case incidentActionTypes.INCIDENT_SUBMITTED_CLEAR:
      return { ...state, loading: false, success: false }

    default:
      return state
  }

}

/**
 * RECORDED INCIDENTS
 */
incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVING = 'RECORDED_INCIDENNTS_RETRIEVING'
incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_SUCCESS = 'RECORDED_INCIDENNTS_RETRIEVED_SUCCESS'
incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_FAILED = 'RECORDED_INCIDENNTS_RETRIEVED_FAILED'

const initialRecordedIncidents = {
  loading: false,
  payload: []
}

actions.getRecordedIncidents = function (iPrpId : string) : void {

  return (dispatch) => {

    dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVING })

    IncidentService.getIncidents(iPrpId)
      .then((payload) => {
        dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_SUCCESS, payload })
      })
      .catch((e) => {
        console.log('ERROR!!!')
        console.log(e)
        dispatch({ type: incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_FAILED })
      })

  }

}

export const recordedIncidentsReducer = (state = initialRecordedIncidents, action) => {

  switch(action.type) {

    case incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVING:
      return { ...state, loading: true, payload: [] }

    case incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_SUCCESS:
      return { ...state, loading: false, payload: action.payload }

    case incidentActionTypes.RECORDED_INCIDENNTS_RETRIEVED_FAILED:
      return { ...state, loading: false, payload: [] }

    default:
      return state
  }

}