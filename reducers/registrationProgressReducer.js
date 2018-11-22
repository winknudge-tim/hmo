import { getProgress } from '../services/registrationProgress.service'

export var actionTypes = {}
export var actions = {}

actionTypes.RP_RETRIEVING = 'RP_RETRIEVING'
actionTypes.RP_RETRIEVED_SUCCESS = 'RP_RETRIEVED_SUCCESS'
actionTypes.RP_RETRIEVED_FAILURE = 'RP_RETRIEVED_FAILURE'

actions.getRegistrationProgress = function (iUsrId: string) {

    return (dispatch) => {
		
        dispatch({ type: actionTypes.RP_RETRIEVING })
        
        return getProgress(iUsrId)
            .then((payload) => {
                dispatch({ type: actionTypes.RP_RETRIEVED_SUCCESS, payload })
            })
            .catch((e) => {
                console.log(e)
                dispatch({ type: actionTypes.RP_RETRIEVED_FAILURE })
            })

	}

}

const initialState = {
    loading: false,
    payload: []
}

export const registrationProgressReducer = function (state = initialState, action) {

    switch (action.type) {
        case actionTypes.RP_RETRIEVING:
            return { ...state, loading: true, payload: [], error: false }

        case actionTypes.RP_RETRIEVED_SUCCESS:
            return { ...state, loading: false, payload: action.payload, error: false }

        case actionTypes.RP_RETRIEVED_FAILURE:
            return { ...state, loading: false, error: true }

        default:
            return state

    }

}