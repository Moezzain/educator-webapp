import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '../../../config/apiConfig';
import { getPatient } from '../../../API/apiEducator';
import { commonState } from '../../../helpers/commonReducerState';

export const getPatientAction = createAsyncThunk(
  'patient/getPatientAction',
  async ({ educatorId, token, patientId }, { rejectWithValue }) => {
    console.log('patient educatorId', educatorId);
    console.log('patient token', token);
    console.log('patient patientId', patientId);

    return await getPatient(educatorId, token, patientId)
      .then((patientData) => {
        console.log('patient: ', patientData);
        return patientData?.patientProfile;
      })
      .catch((e) => {
        console.log(e);
        return rejectWithValue(e);
      });
  }
);
const initialState = {
  patientProfile: null,
  patientId: null,
  ...commonState
};
const patientReducer = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
  },

  extraReducers: {
    [getPatientAction.fulfilled]: (state, action) => {
      state.patientProfile = action.payload;
      state.loading = false
    },
    [getPatientAction.rejeceted]: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false
    },
    [getPatientAction.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { setPatientId: setPatientIdAction, clearAll: clearAllPatientAction } = patientReducer.actions;

export default patientReducer.reducer;
