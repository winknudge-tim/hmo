import documentService from '../services/document.service'

const _actionTypes = {}

_actionTypes.RETRIEVING_DOCUMENTS = 'RETRIEVING_DOCUMENTS'
_actionTypes.RETRIEVED_DOCUMENTS = 'RETRIEVED_DOCUMENTS'
_actionTypes.RETRIEVED_DOCUMENTS_ERROR = 'RETRIEVED_DOCUMENTS_ERROR'

const getDocuments = function getDocumentsListForTheUser (iPrpId, iTcyId) {

	return (dispatch) => {
		
		dispatch({ type: _actionTypes.RETRIEVING_DOCUMENTS })

		documentService.getDocuments(iPrpId, iTcyId).then(
			(documents) => {
				dispatch({ type: _actionTypes.RETRIEVED_DOCUMENTS, documents })
			},
			(error) => {
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