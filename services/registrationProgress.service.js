import Store from 'react-native-simple-store'
import _ from 'lodash'
import Config from '../configs'

import constants from '../configs/constants'

export const getProgress = function (iUsrId: string) {

    return new Promise (function (resolve, reject) {

		var data = {
			iUsrId
		}

		var sendData = JSON.stringify(data)

		fetch(Config.API_URL + 'Users/GetProgress', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiKey': Config.API_KEY
			},
			body: sendData
		})
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			resolve(responseJson.progress)
		})
		.catch(reject);

	})

}