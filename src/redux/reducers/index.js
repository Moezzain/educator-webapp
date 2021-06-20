import {combineReducers} from '@reduxjs/toolkit'
import chatsReducer from './chatsReducer'
import authReducer from './authReducer'
import educatorsReducer from './educatorsReducer'
import patientReducer from './patientReducer'

const reducers = combineReducers({
    chats:chatsReducer,
    auth:authReducer,
    educators:educatorsReducer,
    patient:patientReducer
})

export default reducers