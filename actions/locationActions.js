var _actionTypes = {}

_actionTypes.SETTING_LOCATION = "SETTING_LOCATION"
_actionTypes.SET_LOCATION_SUCCESS = "SET_LOCATION_SUCCESS"
_actionTypes.SET_LOCATION_ERROR = "SET_LOCATION_ERROR"

const setLocation = function setTheUsersLocation (userAtHome) {

    return (dispatch) => {

        dispatch({ type: _actionTypes.SET_LOCATION_SUCCESS, userAtHome })

    }

}

export const actions = {
    setLocation
}

export const actionTypes = _actionTypes