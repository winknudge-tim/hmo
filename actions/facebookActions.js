import facebookService from '../services/facebook.service'

export const actionTypes = {
	RETRIEVING_PROFILE_PICTURES: 'RETRIEVING_PROFILE_PICTURES',
	RETRIEVED_PROFILE_PICTURES: 'RETRIEVED_PROFILE_PICTURES',
	ERROR_RETRIEVING_PROFILE_PICTURES: 'ERROR_RETRIEVING_PROFILE_PICTURES',
}

var getFbProfilePictures = function getFacebookPicturesFromAPI() {

	return (dispatch) => {
		
		dispatch({ type: actionTypes.RETRIEVING_PROFILE_PICTURES })

		facebookService.getProfilePictures().then(
			(images) => {
				dispatch({ type: actionTypes.RETRIEVED_PROFILE_PICTURES, fbProfileImageURLs: images })
			},
			() => {
				dispatch({ type: actionTypes.ERROR_RETRIEVING_PROFILE_PICTURES })
			}
		)

	}

}

export const actions = {
	getFbProfilePictures
}