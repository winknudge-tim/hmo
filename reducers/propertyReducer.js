//propertyReducer
import { actionTypes } from '../actions/propertyActions'

export const initialState = {
  properties: [],
  showSpinner: false,
  error: null
}

export const propertyReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case actionTypes.FETCHINING_PROPERTIES:
    
      return { ...state, showSpinner: true, error: null }

    break

    case actionTypes.FETCHED_PROPERTIES_SUCCESS:

      return { ...state, showSpinner: false, error: null, properties: action.properties }

    break

    case actionTypes.FETCHED_PROPERTIES_ERROR:
      
      return { ...state, showSpinner: false, error: action.error }

    break

    default:
      return state
  }

}
