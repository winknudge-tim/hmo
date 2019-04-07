import { actionTypes } from '../actions/locationActions'

export const initialState = {
  userAtHome: false,
  loading: true,
  error: null
}

export const locationReducer = (state = initialState, action) => {


  switch (action.type) {
    
    case actionTypes.SETTING_LOCATION:
    
      return { ...state, loading: true, error: null }

    break

    case actionTypes.SET_LOCATION_SUCCESS:
    
      return { ...state, loading: false, userAtHome: action.userAtHome }

    break

    case actionTypes.SET_LOCATION_ERROR:
    
      return { ...state, loading: false, error: action.error }

    break

    default:
      return state
  }

}
