import { actionTypes } from '../actions/documentActions'

export const initialState = {
  documents: [],
  retrievingDocuments: false,
  error: null
}

export const documentReducer = (state = initialState, action) => {


  switch (action.type) {
    
    case actionTypes.RETRIEVING_DOCUMENTS:
    
      return { ...state, retrievingDocuments: true, error: null }

    break

    case actionTypes.RETRIEVED_DOCUMENTS:
    
      return { ...state, retrievingDocuments: false, error: null, documents: action.documents }

    break

    case actionTypes.RETRIEVED_DOCUMENTS_ERROR:
    
      return { ...state, retrievingDocuments: false, error: action.error }

    break

    default:
      return state
  }

}
