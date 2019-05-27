import Store from 'react-native-simple-store'

import _ from 'lodash'
import Config from '../configs'

import constants from '../configs/constants'
const {
	TEMP_REG_LABEL
} = constants

const getMessages = function getMessagesFromServer (iPrpId, iUsrId) {

	return new Promise (function (resolve, reject) {

		var data = {
			iPrpId,
			iUsrId
		}

		var sendData = JSON.stringify(data)

		fetch(Config.API_URL + 'Messages/ListChats', {
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
			resolve(responseJson.chats)
		})
		.catch(reject);

	})

}

const getChat = function getChatFromServer (iChaId) {

	return new Promise (function (resolve, reject) {

		console.log('iChaId: ', iChaId)

		var data = {
			iChaId
		}

		var sendData = JSON.stringify(data)

		fetch(Config.API_URL + 'Messages/GetChat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'apiKey': Config.API_KEY
			},
			body:sendData
		})
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			resolve(responseJson.messages)
		})
		.catch(reject);
	})

}

const createMessage = function createMessageOnServer (iPrpId, iUsrId, sTitle, iIncId = null) {

	return new Promise (function (resolve, reject) {

		var data = {
			sTitle,
			iPrpId,
			iUsrId,
			sUsers: iUsrId,
			iIncId
		}

		var sendData = JSON.stringify(data)

		fetch(Config.API_URL + 'Messages/CreateChat', {
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
			resolve(responseJson)
		})
		.catch(reject);

	})

}

const createResponse = function createResponseToMessage (iChaId, cMessageType, sMessage, iUsrId) {

	var data = {
		iChaId,
		cMessageType,
		sMessage,
		iUsrId
	}

	var sendData = JSON.stringify(data)


	return new Promise (function (resolve, reject) {
		fetch(Config.API_URL + 'Messages/AddMessage', {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
              	'apiKey': Config.API_KEY
			},
			body: sendData
		})
		.then((response) => {
			response.json()
		})
		.then((responseJson) => {
			resolve(responseJson)
		})
		.catch(reject);

	})

} 

const updateMessageRead = function updateMessageReadOnServer (data) {

}

const DATE_OFF_MESSEAGE = 'DATE_OFF_MESSEAGE'

const getDateOfLastMessageChecked = function () {
	return new Promise((resolve, reject) => {
		console.log('getDateOfLastMessageChecked')
		return Store.get(DATE_OFF_MESSEAGE)
			.then((res) => {
				console.log(res)
				if (res === null) {
					var date = new Date()
					return Store.save(DATE_OFF_MESSEAGE, date)
				}
				return resolve(res)
			})
			.then(resolve)
			.catch(reject)
	})
}

const setDateOfLastMessageChecked = function () {
	return new Promise((resolve, reject) => {
		var date = new Date()
		return Store.save(DATE_OFF_MESSEAGE, date)
		.then(() => {
			return Store.get(DATE_OFF_MESSEAGE)
		})
		.then((res) => {
			return resolve(res)
		})
		.catch(reject)
	})
}

export default {
	getMessages,
	createMessage,
	createResponse,
	updateMessageRead,
	getChat,
	getDateOfLastMessageChecked,
	setDateOfLastMessageChecked
}