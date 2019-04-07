import Config from '../configs'
import constants from '../configs/constants'
const {
	TEMP_REG_LABEL,
	ORGANISATION_ID
} = constants

const updateUserDetails = function (userId, detailsToUpdate) {
    return new Promise((success, error) => {
        return success()
    })
}

export default {
    update: updateUserDetails
}