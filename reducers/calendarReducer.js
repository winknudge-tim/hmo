import _ from 'lodash'
import CalendarService from '../services/calendar.service'


export const types = {
    CALENDAR_RETRIEVING: 'CALENDAR_RETRIEVING',
    CALENDAR_RETRIEVED_SUCCESS: 'CALENDAR_RETRIEVED_SUCCESS',
    CALENDAR_RETRIEVED_ERROR: 'CALENDAR_RETRIEVED_ERROR',
}

export const initialState = {
  showSpinner: false,
  error: null,
  events: []
}

export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
      case types.CALENDAR_RETRIEVING:
        return { ...state, showSpinner: true, error: null }
      break
  
      case types.CALENDAR_RETRIEVED_SUCCESS:
        return { ...state, showSpinner: false, error: null, events: action.events }
      break
  
      case types.CALENDAR_RETRIEVED_ERROR:
        return { ...state, showSpinner: false, error: action.error }
      break
  
      default:
        return state
    }

}

function getCalendar (iUserId) {

    return (dispatch) => {
  
      dispatch({ type: types.CALENDAR_RETRIEVING })
  
      CalendarService.getEvents(iUserId)
        .then((events) => {
            dispatch({ type: types.CALENDAR_RETRIEVED_SUCCESS, events })
        })
        .catch((error) => {
            dispatch({ type: types.CALENDAR_RETRIEVED_ERROR, error})
        })
  
    }
  
  }

export const actions = {
    getCalendar
  }
  
