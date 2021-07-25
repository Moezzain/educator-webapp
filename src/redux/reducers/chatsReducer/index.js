import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from './../../../config/apiConfig';
import { commonState } from '../../../helpers/commonReducerState';
import { parseArray } from '../../../helpers/Converters';
export const getChatsAction = createAsyncThunk(
  'chats/getChatsAction',
  async ({ chatId, educatorId, token, adminId }, { rejectWithValue }) => {
    try {
      const adminParam = adminId ? `adminId=${adminId}&` : '';
      let result = await axios.get(
        `${url}/message?chatId=${chatId}&${adminParam}educatorId=${educatorId}`,
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
export const getAllChatsAction = createAsyncThunk(
  'chats/getAllChats',
  async ({ educatorId, token, adminId }, { rejectWithValue }) => {
    try {
      const adminParam = adminId ? `adminId=${adminId}&` : '';
      let result = await axios.get(
        `${url}/chats?educatorId=${educatorId}&${adminParam}filterDate=all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      if (result?.data) {
        const chats = parseArray(result.data?.chats);
        const archivedChats = parseArray(result.data?.archivedChats);
        const parsedData = {
          chats,
          archivedChats,
        };
        return parsedData;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
const initialState = {
  messages: null,
  currentChat: null,
  allChats: [],
  archivedChats: [],
  allChatsLoading: false,
  ...commonState,
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
      state.currentChat = action.payload;
    },
  },

  extraReducers: {
    [getChatsAction.fulfilled]: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    [getChatsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getChatsAction.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getAllChatsAction.pending]: (state, action) => {
      state.allChatsLoading = true;
    },
    [getAllChatsAction.fulfilled]: (state, action) => {
      state.allChats = action.payload.chats;
      state.archivedChats = action.payload.archivedChats;
      state.allChatsLoading = false;
    },
    [getAllChatsAction.rejected]: (state, action) => {
      state.allChatsLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setChats: setChatsAction,
  setCurrentChat: setCurrentChatAction,
  clearAll: clearAllChatsAction,
} = chatsReducer.actions;

export default chatsReducer.reducer;
