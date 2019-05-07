import _ from 'lodash'
import Config from '../configs'

import constants from '../configs/constants'

const getHome = function (iUsrId) {
    return new Promise (function (resolve, reject) {

		var data = {
			iUsrId
		}

		fetch(Config.API_URL + 'users/CheckHome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
		})
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			resolve(responseJson.Status === "True")
		})
		.catch(reject);

	})
}

const setHome = function (iUsrId, isHome) {
    return new Promise (function (resolve, reject) {
		var data = {
            iUsrId,
            cHome: isHome ? 'Y' : 'N'
				}
				
				console.log(data)
        
		fetch(Config.API_URL + 'user/SetHome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: JSON.stringify(data)
		})
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			resolve(responseJson)
		})
		.catch(reject);

	})
}

const checkDuplicate = function () {
    
}

const getProgress = function () {
    
}

const updateBankDetails = function (userId, details) {
	return new Promise ((resolve) => {
		setTimeout(resolve, 1500)
	})
}

export default {
    getHome,
    setHome,
    checkDuplicate,
		getProgress,
		updateBankDetails
}

