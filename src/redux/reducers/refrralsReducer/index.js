import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commonState } from '../../../helpers/commonReducerState';
import axios from 'axios';
import url from '../../../config/apiConfig';

export const addRefrralsAction = createAsyncThunk(
  'refrrals/addRefrralsAction',
  async (
    { name, phone, specialty, referCode, medium, referAction, token, adminId },
    { rejectWithValue }
  ) => {
    const data = { name, phone, specialty, referCode, referAction, medium };

    return axios
      .post(`${url}/referrer?adminId=${adminId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        } else return rejectWithValue('credintials');
      })
      .catch((e) => {
        console.log('error ', e);
        return rejectWithValue('credintials');
      });
  }
);
export const getRefrralsAction = createAsyncThunk(
  'refrrals/getRefrralsAction',
  async ({ token, adminId }, { rejectWithValue }) => {
    return axios
      .get(`${url}/referrers?adminId=${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        } else return rejectWithValue('credintials');
      })
      .catch((e) => {
        console.log('error ', e);
      });
  }
);
const initialState = {
  referral: null,
  referrers: [],
  added: false,
  ...commonState,
};
const refrralsReducer = createSlice({
  name: 'refrrals',
  initialState,
  reducers: {
    clearAll: () => initialState,
    clearErrors: (state, action) => {
      state.added = false;
      state.error = false;
      state.loading = false;
    },
  },

  extraReducers: {
    [getRefrralsAction.fulfilled]: (state, action) => {
      state.referrers = action.payload;
    },
    [getRefrralsAction.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [addRefrralsAction.fulfilled]: (state, action) => {
      state.referrers.push(action.payload);
      state.loading = false;
      state.error = false;
      state.added = true;
    },
    [addRefrralsAction.pending]: (state, action) => {
      state.loading = true;
    },
    [addRefrralsAction.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      state.added = false;
    },
  },
});

export const {
  clearAll: clearAllRefrralsAction,
  clearErrors: clearErrorsAction,
} = refrralsReducer.actions;

export default refrralsReducer.reducer;
