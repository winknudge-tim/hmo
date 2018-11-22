import { actionTypes } from '../actions/facebookActions'

export const initialState = {
  photos: [],
  showSpinner: false,
  error: null,
  tempData: {}
}

export const facebookReducer = (state = initialState, action) => {


  switch (action.type) {
    
    case actionTypes.RETRIEVING_PROFILE_PICTURES:
    
      return { ...state, showSpinner: true, error: null }

    break

    case actionTypes.RETRIEVED_PROFILE_PICTURES:

      return { ...state, showSpinner: false, error: null, fbProfileImageURLs: action.fbProfileImageURLs }

    break

    case actionTypes.ERROR_RETRIEVING_PROFILE_PICTURES:
      
      return { ...state, showSpinner: false, error: null }

    break

    default:
      return state
  }

}
