import propertyService from '../services/property.service'

var _actionTypes = {}

_actionTypes.FETCHINING_PROPERTIES = "FETCHINING_PROPERTIES"
_actionTypes.FETCHED_PROPERTIES_SUCCESS = "FETCHED_PROPERTIES_SUCCESS"
_actionTypes.FETCHED_PROPERTIES_ERROR = "FETCHED_PROPERTIES_ERROR"

const fetchPropertiesList = function fetchPropertListFromServer () {

    return (dispatch) => {

        dispatch({ type: _actionTypes.FETCHINING_PROPERTIES })

        propertyService.fetchProperties().then((properties) => {

            dispatch({ type: _actionTypes.FETCHED_PROPERTIES_SUCCESS, properties })

        }, (error) => {

            console.log(error)
            dispatch({ type: _actionTypes.FETCHED_PROPERTIES_ERROR })

        })

    }

}

export const actions = {
    fetchPropertiesList
}

export const actionTypes = _actionTypes