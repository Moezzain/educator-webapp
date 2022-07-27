import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commonState } from '../../../helpers/commonReducerState';
import axios from 'axios';
import url from '../../../config/apiConfig';

export const sendNotification = createAsyncThunk(
  'notification/sendNotification',
  async (
    { notificationTarget, text, body, adminId, token },
    { rejectWithValue }
  ) => {
    const data = { notificationTarget, text, body };

    return axios
      .post(`${url}/notification?adminId=${adminId}`, data, {
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
const initialState = {
  ...commonState,
};
const NotificationsReducer = createSlice({
  name: 'notifications',
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
    [sendNotification.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [sendNotification.pending]: (state, action) => {
      state.loading = true;
    },
    [sendNotification.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  clearAll: clearAllNotificationsAction,
  clearErrors: clearErrorsAction,
} = NotificationsReducer.actions;

export default NotificationsReducer.reducer;
