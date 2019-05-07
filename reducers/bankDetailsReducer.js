import UserService from '../services/user.services'


export const types = {
    BANK_DETAILS_UPDATING: 'BANK_DETAILS_UPDATING',
    BANK_DETAILS_UPDATE_SUCCESS: 'BANK_DETAILS_UPDATE_SUCCESS',
    BANK_DETAILS_UPDATE_ERROR: 'BANK_DETAILS_UPDATE_ERROR'
}

export const initialState = {
    loading: false,
    error: null,
    lastUpdate: new Date()
}

export const bankDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.BANK_DETAILS_UPDATING:
            return { ...state, loading: true, error: null }
        case types.BANK_DETAILS_UPDATE_SUCCESS:
            return { ...state, loading: false, lastUpdate: new Date() }
        case types.BANK_DETAILS_UPDATE_ERROR:
            return { ...state, loading: false, error: action.error }
        default:
            return state
    }
}

/**
 * ACTIONS
 */

 function updateBankDetails (userId, details) {
    return (dispatch) => {
        dispatch({ type: types.BANK_DETAILS_UPDATING })
        UserService.updateBankDetails(userId, details)
            .then(() => {
                dispatch({ type: types.BANK_DETAILS_UPDATE_SUCCESS })
            })
            .catch((error) => {
                dispatch({ type: types.BANK_DETAILS_UPDATE_ERROR, error })
            })
    
    }
 }

 export const actions = {
     updateBankDetails
 }