import {combineReducers} from '@reduxjs/toolkit'
import chatsReducer from './chatsReducer'
import authReducer from './authReducer'
import educatorsReducer from './educatorsReducer'
import patientReducer from './patientReducer'
import {persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}
const reducers = persistCombineReducers(persistConfig,{
    chats:chatsReducer,
    auth:authReducer,
    educators:educatorsReducer,
    patient:patientReducer
})

export default reducers