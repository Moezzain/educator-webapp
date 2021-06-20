import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '../../../config/apiConfig';
import { getAllEducatorsAndPatients } from '../../../API/apiEducator';

export const getEducatorsAndPatients = createAsyncThunk(
  'educators/getEducatorsAndPatients',
  async ({ educatorId, token },{rejectWithValue}) => {
    console.log(educatorId, token);

    return await getAllEducatorsAndPatients(educatorId, token).then((data) => {
      console.log('geteducatorsandpatients: ', data);
        return data
    }).catch((e) => {
        console.log('error',e);
        return rejectWithValue(e)
    });
  }
);

const initialState = {
  educators: [],
  patients: [],
  fetchedEducatorId: '',
  error: null,
  loading:false
};
const educatorsReducer = createSlice({
  name: 'educators',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setFetchedEducatiorId: (state, action) => {
        state.fetchedEducatorId = action.payload
    }
  },

  extraReducers: {
      [getEducatorsAndPatients.fulfilled]: (state, action) => {
          console.log('fulfilled: ',action.payload);
          
          state.educators = action.payload.educators
          state.patients = action.payload.patients
          state.loading = false
      },
      [getEducatorsAndPatients.pending]: (state, action) => {
          state.loading = true
      },
      [getEducatorsAndPatients.rejected]: (state, action) => {
          state.loading = false
      },
  },
});

export const {
    clearAll: clearAllEducatorsAction,
    setFetchedEducatiorId: setFetchedEducatorIdReducer
} = educatorsReducer.actions;

export default educatorsReducer.reducer;
