//propertyReducer

export const types = {
    USER_UPDATING: 'USER_UPDATING',
    USER_UPDATED_SUCCESS: 'USER_UPDATED_SUCCESS',
    USER_UPDATED_ERROR: 'USER_UPDATED_ERROR'
}

export const initialState = {
  showSpinner: false,
  error: null,
  events: []
}


export const userReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case types.FETCHINING_PROPERTIES:
    
      return { ...state, showSpinner: true, error: null }

    break

    case types.FETCHED_PROPERTIES_SUCCESS:

      return { ...state, showSpinner: false, error: null, properties: action.properties }

    break

    case types.FETCHED_PROPERTIES_ERROR:
      
      return { ...state, showSpinner: false, error: action.error }

    break

    default:
      return state
  }

}

/**
 * ACTIONS
 */
const updateUser = function (userId, user) {
    return (dispatch) => {

    }
}

export const actions = {

}
