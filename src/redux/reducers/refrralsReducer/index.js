import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commonState } from '../../../helpers/commonReducerState';
import axios from 'axios';
import url from '../../../config/apiConfig';

export const addRefrralsAction = createAsyncThunk(
  'refrrals/addRefrralsAction',
  async ({name, phone, specialty,referCode, medium, token, adminId}, { rejectWithValue }) => {
    console.log('ref', name, phone, specialty,referCode, medium, token);
    const data = {name, phone, specialty,referCode, medium}
    console.log('data', data);

    return axios
      .post(`${url}/referrer?adminId=${adminId}`, data, {headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        console.log('resa: ',res);
        if (res.data) {
         console.log('res: ',res);
          return res.data;
        } else return rejectWithValue('credintials');
      }).catch((e) => {
        console.log('error ',e);
      }) 
  }
);
export const getRefrralsAction = createAsyncThunk(
  'refrrals/getRefrralsAction',
  async ({token, adminId}, { rejectWithValue }) => {

    return axios
      .get(`${url}/referrers?adminId=${adminId}`, {headers: {
        Authorization: `Bearer ${token}`
      }})
      .then((res) => {
        console.log('resa: ',res);
        if (res.data) {
         console.log('res: ',res);
          return res.data;
        } else return rejectWithValue('credintials');
      }).catch((e) => {
        console.log('error ',e);
      }) 
  }
);
const initialState = {
  referral:null,
  referrers: [],
  ...commonState,
};
const refrralsReducer = createSlice({
  name: 'refrrals',
  initialState,
  reducers: {
    clearAll: () => initialState,
  },

  extraReducers: {
    [getRefrralsAction.fulfilled]: (state, action) => {
      state.referrers = action.payload
    },
    [getRefrralsAction.rejected]: (state, action) => {
      state.error = action.payload
    },
    [addRefrralsAction.fulfilled]: (state, action) => {
      console.log('res in red: ',action.payload);
      state.referrers.push(action.payload)
    },

  },
});

export const {
  clearAll: clearAllRefrralsAction,
} = refrralsReducer.actions;

export default refrralsReducer.reducer;
