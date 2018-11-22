import { actionTypes } from '../actions/messagesActions'

export const initialState = {
  messages: [],
  showSpinner: false,
  error: null
}

export const messagesReducer = (state = initialState, action) => {


  switch (action.type) {
    
    case actionTypes.RETRIEVING_MESSAGES:
    
      return { ...state, showSpinner: true, error: null, type: action.type, messages: [] }

    break

    case actionTypes.RETRIEVED_MESSAGES:

      return { ...state, showSpinner: false, error: null, messages: action.messages, type: action.type }

    break

    case actionTypes.RETRIEVED_MESSAGES_ERROR:
    case actionTypes.CREATED_MESSAGE_ERROR:
    case actionTypes.CREATED_RESPONE_ERROR:
  
      return { ...state, showSpinner: false, error: action.error, type: action.type }

    break

    case actionTypes.CREATING_MESSAGE:
    
      return { ...state, showSpinner: true, error: null, type: action.type }

    break

    case actionTypes.CREATED_MESSAGE_SUCCESS:

      return { ...state, showSpinner: false, error: null, type: action.type }

    break

    default:
      return state
  }

}

const initialSingeMessageState = {
  showSpinner: false,
  meta: {},
  payload: []
}

export const singleMessage = (state = initialSingeMessageState, action) => {

  switch (action.type) {
    

    case actionTypes.SELECTED_MESSAGE:

      return { ...state, meta: action.meta, type: action.type }

    case actionTypes.SELECTED_MESSAGE_RETRIEVED:
      return { ...state, type: action.type, payload: action.payload }

    case actionTypes.CREATING_RESPONSE:

      return { ...state, showSpinner: true, error: null, type: action.type }


    case actionTypes.CREATED_RESPONE_SUCCESS:

      return { ...state, showSpinner: false, error: null, type: action.type, messages: action.messages }


    default:
      return state
  }

}