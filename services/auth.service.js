import Config from '../configs'

import _ from 'lodash'

import constants from '../configs/constants'

loginWithEmail = function (sUsername, sPassword) {

	return new Promise((resolve, reject) => {

		var data = {
			sUsername,
			sPassword
		}
		console.log('attempt to login')
		fetch(
			Config.API_URL + 'auth/signin',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'apiKey': Config.API_KEY
				},
				body: JSON.stringify(data)
			}
		)
		.then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson)
			if (!responseJson.PrpId && responseJson.PrpId === "0") {
				return reject(new Error("No user found"))
			}
			return resolve(responseJson)
		})
		.catch(function(error) {
			console.log('error')
			console.log(error)
			reject('register error')
		});

	})


}

export default {
	loginWithEmail
}