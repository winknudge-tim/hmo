import Config from '../configs'

import Store from 'react-native-simple-store'
//import { AccessToken } from 'react-native-fbsdk'
import _ from 'lodash'

import constants from '../configs/constants'
const {
	TEMP_REG_LABEL,
	ORGANISATION_ID
} = constants
import AuthService from './auth.service'


var defaultData = {
	firstName: '',
	lastName: '',
	gender: '',
	fbID: null,
	dob: null,
	jobTitle: '',
	phone: '',
	profileImg: ''
}

var clearTempData = function () {

	Store.get(TEMP_REG_LABEL).then(

			(data) => {
				if (data) {
					Store.delete(TEMP_REG_LABEL)
				}
			},
			(err) => {
				console.error(err)
			})

}


var saveTempData = function (data) {

	return new Promise (function (resolve, reject) {

		Store.save(TEMP_REG_LABEL, data).then(resolve, reject)

	})

}

var getTempData = function (fbAuthed) {


	return new Promise (function (resolve, reject) {

		Store.get(TEMP_REG_LABEL).then(

			(data) => {

				if (data) {

					resolve(data)

				} else {

					if (fbAuthed) {

						AuthService.getFacebookUser().then(
							(fbData) => {
	
							var formattedFbData = {}


							if (fbData) {

								formattedFbData.facebookId = fbData.id

								if (fbData.first_name) {
									formattedFbData.firstName = fbData.first_name
								}

								if (fbData.last_name) {
									formattedFbData.lastName = fbData.last_name
								}

								if (fbData.gender) {
									formattedFbData.gender = fbData.gender
								}

								if (fbData.email) {
									formattedFbData.email = fbData.email
								}

								if (fbData.id) {
									formattedFbData.fbID = fbData.id
								}

								if (fbData.job_title) {
									formattedFbData.jobTitle = fbData.job_title
								}

								if (fbData.birthday) {
									formattedFbData.dob = fbData.birthday
								}

							}

							formattedFbData = _.defaults(formattedFbData, defaultData)

							saveTempData(formattedFbData).then(
								() => {
									resolve(formattedFbData)
								}, 
								reject)
								
							},
							reject
						)

					} else {

						saveTempData(defaultData).then(
							() => {
								resolve({})
							}, 
							reject)

					}


				}

			},

			reject

		)

	})

}

const doesUserFBAlreadyExist = function isTheUserAlreadyExistOnTheSystem (FbId) {

	return new Promise (function (resolve, reject) {

		var data = {}

		data.sFacebookId = FbId

		fetch(Config.API_URL + 'auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {

                resolve(true, responseJson)

            })
            .catch(function(error) {

				resolve(false)

			});

	})

}

function _buildSubmitRegisterData(data) {

	var submitData = {
		"sAuthType": "EMAIL",
		"sUserName": data.userName,
		"sPassword": data.password,
		"sProfileImage": data.profileImage,
		"sFirstName": data.firstName,
		"sSecondName": data.lastName,
		"dDateOfBirth": data.dob,
		"sEmailAddress": data.email,
		"sPhoneNumber": data.phone,
		"sGender": data.gender,
		"sJobTitle": data.jobTitle,
		"iOrgId": ORGANISATION_ID,
		"sCurrentAddress": data.currentAddress,
		"sTimeAtCurrentAddress": data.timeAtCurrentAddress,
		"sRentPaid": data.rentPaid,
		"sReasonForLeaving": data.reasonsForLeaving,
		"sLandlordName": data.landlordName,
		"sLandlordPhone": data.landlordPhone,
		"sLandlordEmail": data.landlordEmail,
		"sPreviousAddresses": data.previousAddresses,
		"sAnnualEarnings": data.annualEarnings,
		"sEmployer": data.employer,
		"sEmployerContact": data.hrContact,
		"sEmployerContactPhone": data.hrPhoneNumber,
		"sEmployerContactEmail": data.hrEmail,
		"sGuarantorName": data.guarantorFullName,
		"sGuarantorDateOfBirth": data.guarantorDob,
		"sGuarantorPhone": data.guarantorPhone,
		"sGuarantorEmail": data.guarantorEmail,
		"sGuarantorAddress": data.guarantorAddress,
		"sGuarantorPreviousAddresses": data.guarantorPreviousAddresses,
		"sGuarantorAnnualEarnings": data.guarantorAnnualEarnings,
		"sGuarantorEmployer": data.guarantorJobTitle,
		"sGuarantorEmployerContact": data.guarantorHrContact,
		"sGuarantorEmployerPhone": data.guarantorHrPhoneNumber,
		"sGuarantorEmployerEmail": data.guarantorHrEmail,
		"iPrpId": data.selectedPropertyId,
		"sNameOnCard": data.nameOnCard,
		"sCardNumber": data.cardNumber,
		"sSecurityNumber": data.securityNumber,
		"sExpiryDate": data.expiryDate,
		"sAccountNumber": data.accountNumber,
		"sSortCode": data.sortCode
	}

	return submitData

}

function _submitRegisterData(data) {

	console.log('submitting data')
	console.log(data)

	return new Promise (function (resolve, reject) {

		fetch(Config.API_URL + 'user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {

				console.log(responseJson)

                resolve(responseJson)

            })
            .catch(function(error) {

				console.log(error)
				reject('register error')

			});

	})

}

const registerUser = function (data) {

	return new Promise (function (resolve, reject) {

		getTempData().then((data) => {

			var registerData = _buildSubmitRegisterData(data)

			return _submitRegisterData(registerData)

		}).then((responseJson) => {

			return resolve(responseJson)

		}).catch((error) => {

			console.log('theres an error!')
			console.log(error)
			reject()

		})

	})

}

export default {
	saveTempData,
	getTempData,
	clearTempData,
	registerUser,
	doesUserFBAlreadyExist
}