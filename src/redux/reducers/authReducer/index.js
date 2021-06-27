import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '../../../config/apiConfig';
import { sha256 } from 'js-sha256';
import { commonState } from '../../../helpers/commonReducerState';
import {api} from '../../../network'
const encrypt = (text) => {
    return sha256(text);
}

export const loginAction = createAsyncThunk(
    'auth/loginAction',
    async({ username, password },{rejectWithValue}) => {
        let encryptedPassword = await encrypt(password);
        let auths = {}
        const data = {
            id: username,
            password: encryptedPassword
        }
        return axios.post(`${url}/login`, data).then((res) => {
            const {educatorId, appointments, chats} = res.data;

            const educator = JSON.parse(res.data.educator)
            const tokens = educator.token;

            auths.token = tokens[tokens.length -1];
            auths.educatorId = educatorId
            auths.appointments = appointments
            auths.chats = chats
            
            return auths
        }).catch((e) => {
            console.log('error',e);
            return rejectWithValue(true)
        })
        
        
    }
)

const initialState = {
  token: null,
  educatorId: null,
  appointments: null,
  chats: null,
  response: null,
  darkMode: false,
  ...commonState
};
const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setLoading: (state, action) => {
        state.loading = action.payload
    },
    setChats: (state, action) => {
      state.chats = action.payload
    },
    setDarkMode: (state, action) => {
        state.darkMode = action.payload
    }
  },

  extraReducers: {
      [loginAction.fulfilled]: (state, action) => {
          state.token = action.payload.token
          state.educatorId = action.payload.educatorId
          state.appointments = action.payload.appointments
          state.chats = action.payload.chats
          state.loading = false
      },
      [loginAction.pending]: (state, action) => {
          state.loading = true
      },
      [loginAction.rejected]: (state, action) => {
          state.error = action.payload
          state.loading = false
      }
  },
});

export const {
    setLoading:setLoadingAction,
    setChats: setChatsAction,
    clearAll: clearAllAuthAction,
    setDarkMode: setDarkModeAction
} = authReducer.actions;

export default authReducer.reducer;
