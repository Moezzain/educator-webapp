import {combineReducers} from '@reduxjs/toolkit'
import chatsReducer from './chatsReducer'
const reducers = combineReducers({
    chats:chatsReducer
})

export default reducers