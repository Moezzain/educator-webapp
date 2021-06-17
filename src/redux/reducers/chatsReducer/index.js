import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from './../../../config/apiConfig';
export const getChatsAction = createAsyncThunk(
  'chats/getChatsAction',
  async (userAuths,{rejectWithValue}) => {
    console.log('getChatsAction');

    try {
      let result = await axios.get(
        `${url}/message?chatId=${userAuths.chatId}&educatorId=${userAuths.educatorId}`,
        {
          headers: {
            Authorization: `Bearer ${userAuths.token}`,
          },
          timeout: 10000,
        }
      );
      if (result?.data) {
        console.log(result);

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
  loading: false,
  error: null
};
const chatsReducer = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setChats: (state, action) => {
      state.chats = action.payload;
    },
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

export const { setChats: setChatsAction } = chatsReducer.actions;

export default chatsReducer.reducer;
