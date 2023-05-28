import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from './../../../config/apiConfig';
import { commonState } from '../../../helpers/commonReducerState';

export const getInvoicesAction = createAsyncThunk(
  'invoices/getIvoicesAction',
  async ({ startDate, endDate, token, adminId }, { rejectWithValue }) => {
    try {
      const adminParam = adminId ? `&adminId=${adminId}` : '';
      let result = await axios.get(
        `${url}/invoices?get=allInvoices&startDate=${startDate? startDate : ''}&endDate=${endDate? endDate : ''}${adminParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );
      if (result?.data) {
        return result.data;
      }
    } catch (error) {
      console.log('error', error);

      return rejectWithValue(error);
    }
  }
);


const initialState = {
  invoices: null,
  currentChat: null,
  allInvoices: [],
  archivedInvoices: [],
  allInvoicesLoading: false,
  ...commonState,
};
const invoicesReducer = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },

  extraReducers: {
    [getInvoicesAction.fulfilled]: (state, action) => {
      state.allInvoices = action.payload;
      state.loading = false;
    },
    [getInvoicesAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getInvoicesAction.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setInvoices: setInvoicesAction,
  setCurrentChat: setCurrentChatAction,
  clearAll: clearAllInvoicesAction,
} = invoicesReducer.actions;

export default invoicesReducer.reducer;
