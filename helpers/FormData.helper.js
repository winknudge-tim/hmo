import _ from 'lodash'

import ValidationHelper from './validation.helper'

var FormDataHelper = {}

FormDataHelper.createDataField = function (formData, id, type, label, value, placeholder, required, options) {

	formData[id] = {
		id : id,
		type : type,
		label : label,
		value : value,
		placeholder : placeholder,
		required: required,
		options: options
	}

}

FormDataHelper.isFormValid = function (fields) {

	var formValid = true

	_.each(fields, function (field, id) {

		fieldIsValid = ValidationHelper.isValid(field.value, {
			required: field.required,
			inputType: field.type
		})

		if (!fieldIsValid) {
			formValid = false
		}

	})

	return formValid

}

export default FormDataHelper