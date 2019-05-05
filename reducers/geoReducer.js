//propertyReducer
import UserService from '../services/user.services'

export const types = {
    GEO_FETCHING: 'GEO_FETCHING',
    GEO_FETCHING_SUCCESS: 'GEO_FETCHING_SUCCESS',
    GEO_FETCHING_ERROR: 'GEO_FETCHING_ERROR',
    GEO_SETTING: 'GEO_SETTING',
    GEO_SETTING_SUCCESS: 'GEO_SETTING_SUCCESS',
    GEO_SETTING_ERROR: 'GEO_SETTING_ERROR'
}

export const initialState = {
  isHome: false,
  loading: false,
  error: null
}


export const geoReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GEO_FETCHING:
      return {
          ...state,
          loading: true,
          error: null
       }
    case types.GEO_FETCHING_SUCCESS:
       return {
           ...state,
           loading: false,
           isHome: action.isHome
        }
    case types.GEO_FETCHING_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error
         }
    case types.GEO_SETTING:
      return {
          ...state,
          loading: true,
          error: null,
          isHome: action.isHome
       }
    case types.GEO_SETTING_SUCCESS:
       return {
           ...state,
           loading: false
        }
    case types.GEO_SETTING_ERROR:
        return {
            ...state,
            loading: false,
            isHome: action.isHome,
            error: action.error
         }
    default:
      return state
  }

}

/**
 * ACTIONS
 */
const getState = function (userId) {
    return (dispatch) => {
        dispatch({ type: types.GEO_FETCHING })

        UserService.getHome(userId)
            .then((isHome) => {
                dispatch({ type: types.GEO_FETCHING_SUCCESS, isHome })
            })
            .catch((error) => {
                dispatch({ type: types.GEO_FETCHING_ERROR, error })
            })
    }
}

const setState = function (userId, isHome) {
    return (dispatch) => {
        dispatch({ type: types.GEO_SETTING, isHome })

        UserService.setHome(userId, isHome)
            .then((isHome) => {
                dispatch({ type: types.GEO_SETTING_SUCCESS, isHome })
            })
            .catch((error) => {
                dispatch({ type: types.GEO_SETTING_ERROR, error, isHome: !isHome })
            })
    }
}

export const actions = {
    getState,
    setState
}
