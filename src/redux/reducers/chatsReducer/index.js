import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from './../../../config/apiConfig';
import {commonState} from '../../../helpers/commonReducerState'

export const getChatsAction = createAsyncThunk(
  'chats/getChatsAction',
  async ({chatId, educatorId, token},{rejectWithValue}) => {

    try {
      let result = await axios.get(
        `${url}/message?chatId=${chatId}&educatorId=${educatorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      if (result?.data) {

        return result.data.reverse();
      }
    } catch (error) {
      console.log('error', error);

      return rejectWithValue(error);
    }
  }
);
const initialState = {
  messages: null,
  currentChat:null,
  ...commonState
};
const chatsReducer = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChat: (state, action) => {
        state.currentChat = action.payload
    } 
  },

  extraReducers: {
    [getChatsAction.fulfilled]: (state, action) => {
      state.messages = action.payload;
      state.loading = false
    },
    [getChatsAction.pending]: (state, action) => {
        state.loading = true
    },
    [getChatsAction.rejected]: (state, action) => {
        state.error = action.payload
    }
  },
});

export const { 
    setChats: setChatsAction,
    setCurrentChat: setCurrentChatAction,
    clearAll:clearAllChatsAction
} = chatsReducer.actions;

export default chatsReducer.reducer;
