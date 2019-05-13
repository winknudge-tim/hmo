import messagesService from '../services/messages.service'

const _actionTypes = {}

_actionTypes.RETRIEVING_MESSAGES = 'RETRIEVING_MESSAGES'
_actionTypes.RETRIEVED_MESSAGES = 'RETRIEVED_MESSAGES'
_actionTypes.RETRIEVED_MESSAGES_ERROR = 'RETRIEVED_MESSAGES_ERROR'

const getMessages = function getDocumentsListForTheUser (iPrpId, iUsrId) {

	return (dispatch) => {
		
		dispatch({ type: _actionTypes.RETRIEVING_MESSAGES })

		messagesService.getMessages(iPrpId, iUsrId).then((messages) => {

			dispatch({ type: _actionTypes.RETRIEVED_MESSAGES, messages: messages })

		})

	}
}

_actionTypes.SELECTED_MESSAGE = 'SELECTED_MESSAGE'
_actionTypes.SELECTED_MESSAGE_RETRIEVED = 'SELECTED_MESSAGE_RETRIEVED'
_actionTypes.SELECTED_MESSAGE_ERROR = 'SELECTED_MESSAGE_ERROR'

const selectMessage = function selectTheMessageToView (message) {

	return (dispatch) => {
		
		dispatch({ type: _actionTypes.SELECTED_MESSAGE, meta: message })

		messagesService.getChat(message.ChaId)
			.then((payload) => {
				dispatch({ type: _actionTypes.SELECTED_MESSAGE_RETRIEVED, payload: payload })
			})
			.catch((err) => {
				console.log(err)
				dispatch({ type: _actionTypes.SELECTED_MESSAGE_ERROR })
			})


	}

}

_actionTypes.CREATING_MESSAGE = 'CREATING_MESSAGE'
_actionTypes.CREATED_MESSAGE_SUCCESS = 'CREATED_MESSAGE_SUCCESS'
_actionTypes.CREATED_MESSAGE_ERROR = 'CREATED_MESSAGE_ERROR'

const createMessage = function createMessageToTheMessage (iPrpId, iUsrId, subject) {

	return (dispatch) => {
		
		dispatch({ type: _actionTypes.CREATING_MESSAGE })

		messagesService.createMessage(iPrpId, iUsrId, subject).then(
			() => {

				dispatch({ type: _actionTypes.CREATED_MESSAGE_SUCCESS })

			},
			(error) => {
				console.log(error)
			}
		)

	}

}

_actionTypes.CREATING_RESPONSE = 'CREATING_RESPONSE'
_actionTypes.CREATED_RESPONE_SUCCESS = 'CREATED_RESPONE_SUCCESS'
_actionTypes.CREATED_RESPONE_ERROR = 'CREATED_RESPONE_ERROR'

const createResponse = function createResponseToTheMessage (msgId, type, message, userId) {

	return (dispatch) => {
		
		console.log('createResponse', message)

		dispatch({ type: _actionTypes.CREATING_RESPONSE })

		messagesService.createResponse(msgId, type, message, userId).then(
			(messages) => {
				dispatch({ type: _actionTypes.CREATED_RESPONE_SUCCESS, payload: messages })

			},
			(err) => {
				console.log('ERROR!', err)
				dispatch({ type: _actionTypes.CREATED_RESPONE_ERROR })
				
			}
		)

	}

}

export const actions = {
	getMessages,
	selectMessage,
	createResponse,
	createMessage
}


export const actionTypes = _actionTypes;