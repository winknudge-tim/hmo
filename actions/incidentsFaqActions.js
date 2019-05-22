import incidentFaqsService from '../services/incidentFaqs.service'

export const actionTypes = {
	RETRIEVING_INCIDENT_CATEGORIES: 'RETRIEVING_INCIDENT_CATEGORIES',
	RETRIEVED_INCIDENT_CATEGORY_SUCCESS: 'RETRIEVED_INCIDENT_CATEGORY_SUCCESS',
    RETRIEVED_INCIDENT_CATEGORY_ERROR: 'RETRIEVED_INCIDENT_CATEGORY_ERROR',
    RETRIEVING_INCIDENT_QUESTIONS: 'RETRIEVING_INCIDENT_QUESTIONS',
	RETRIEVED_INCIDENT_QUESTIONS_SUCCESS: 'RETRIEVED_INCIDENT_QUESTIONS_SUCCESS',
    RETRIEVED_INCIDENT_QUESTIONS_ERROR: 'RETRIEVED_INCIDENT_QUESTIONS_ERROR',
    SET_INCIDENT_ANSWER: 'SET_INCIDENT_ANSWER'
}

var getIncidentCategories = function getFacebookPicturesFromAPI(propId) {

	return (dispatch) => {
		
        dispatch({ type: actionTypes.RETRIEVING_INCIDENT_CATEGORIES })
        
        incidentFaqsService.getOptions(propId)
            .then((categories) => {

                dispatch({ type: actionTypes.RETRIEVED_INCIDENT_CATEGORY_SUCCESS, payload: { categories } })

            })
	

	}

}

var getQuestions = function (propId, cat) {

    return (dispatch) => {

        console.log('cat: ', cat)

        dispatch({ type: actionTypes.RETRIEVING_INCIDENT_QUESTIONS })

        incidentFaqsService.getQuestions(propId, cat)
            .then((questions) => {
                dispatch({ type: actionTypes.RETRIEVED_INCIDENT_QUESTIONS_SUCCESS, payload: { questions } })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.RETRIEVED_INCIDENT_QUESTIONS_ERROR, error })
            })

    }

}

var setAnswer = function (node, previous, history = [], responses = []) {

    return (dispatch) => {

        if (previous) {
            history.push(previous)
        }

        dispatch({ type: actionTypes.SET_INCIDENT_ANSWER, payload: {
            node,
            history,
            responses
        } })

    }

}

export const actions = {
    getIncidentCategories,
    getQuestions,
    setAnswer
}