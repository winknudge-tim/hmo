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

FormDataHelper.FormatDOB = function (value) {

    var v = value;

    if (v.match(/^\d{1}$/) !== null) {
      v = Number(v)
      if (v > 3) {
        value =  "0" + v + '/';
      }
    } else if (v.match(/^\d{2}$/) !== null) {
      value = v + '/';
    } else if (v.match(/^\d{2}\/\d{1}$/) !== null) {
      var last = v[3]
      last = Number(last)
      if (last > 1) {
        var firstPart = v.slice(0, 3)
        value = firstPart + "0" + last + '/';
      }
    } else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
      value = v + '/';
    }

    if (value[1] === "/") {
      value = "0" + value
    }

    if (value[4] === "/") {


     value = value.slice(0, 3) + "0" + value.slice(3, 6)
     // console.log(inToArray)
      //console.log(inToArray.join(""))
    }

    return value

  }

export default FormDataHelper