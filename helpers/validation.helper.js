import _ from 'lodash'
import validator from 'validator'
import PhoneNumber from 'awesome-phonenumber'

import constants from '../configs/constants'
const { INPUT_TYPES } = constants

var validationHelper = {}

validationHelper.isValid = function (val, options) {

	let isValid = true

	if (options.required && _.isEmpty(val) && !_.isNumber(val)) {
		isValid = false
	}

	if (!_.isEmpty(val)) {

		if (options.inputType === INPUT_TYPES.EMAIL && !validator.isEmail(val)) {
			isValid = false
		}

		if (options.inputType === INPUT_TYPES.PHONE) {

			var pn = new PhoneNumber( val, 'GB' )

			if (!pn.isValid()) {
				isValid = false
			}

		}

	}

	return isValid

}


export default validationHelper