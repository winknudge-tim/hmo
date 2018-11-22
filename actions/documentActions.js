import documentService from '../services/document.service'

const _actionTypes = {}

_actionTypes.RETRIEVING_DOCUMENTS = 'RETRIEVING_DOCUMENTS'
_actionTypes.RETRIEVED_DOCUMENTS = 'RETRIEVED_DOCUMENTS'
_actionTypes.RETRIEVED_DOCUMENTS_ERROR = 'RETRIEVED_DOCUMENTS_ERROR'

const getDocuments = function getDocumentsListForTheUser () {

	return (dispatch) => {
		
		dispatch({ type: _actionTypes.RETRIEVING_DOCUMENTS })

		documentService.getDocuments().then(
			(documents) => {
				console.log(documents)
				dispatch({ type: _actionTypes.RETRIEVED_DOCUMENTS, documents })
			},
			(error) => {
				console.log('error')
				dispatch({ type: _actionTypes.RETRIEVED_DOCUMENTS_ERROR, error })
			}
		)

	}
}

_actionTypes.SIGNING_DOCUMENT = 'SIGNING_DOCUMENT'
_actionTypes.SIGN_DOCUMENT_SUCCESS = 'SIGN_DOCUMENT_SUCCESS'
_actionTypes.SIGN_DOCUMENT_ERROR = 'SIGN_DOCUMENT_ERROR'

const signDocument = function signTheDocumentAndUploadToServer () {

}

export const actions = {
	getDocuments
}


export const actionTypes = _actionTypes;