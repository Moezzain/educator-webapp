import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '../../../config/apiConfig';
import { getPatient, getAppointments } from '../../../API/apiPatient';
import { commonState } from '../../../helpers/commonReducerState';

export const getPatientAction = createAsyncThunk(
  'patient/getPatientAction',
  async ({ educatorId, token, patientId }, { rejectWithValue }) => {
    return await getPatient(educatorId, token, patientId)
      .then((patientData) => {
        return patientData?.patientProfile;
      })
      .catch((e) => {
        console.log(e);
        return rejectWithValue(e);
      });
  }
);
export const getAppointmentsAction = createAsyncThunk(
  'patinet/getAppointmentsAction',
  async ({educatorId,token,patientId},{rejectWithValue}) => {
    return await getAppointments(patientId,token,educatorId).then((data) => {
      if(data)
      return data


    }).catch((e) => {
      console.log(e);
      rejectWithValue(e)
    })
  }
)
const initialState = {
  patientProfile: null,
  patientId: null,
  appointments: null,
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
      state.error = action.payload;
      state.loading = false
    },
    [getPatientAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getAppointmentsAction.fulfilled]: (state, action) => {
      state.appointments = action.payload
    }
  },
});

export const { setPatientId: setPatientIdAction, clearAll: clearAllPatientAction } = patientReducer.actions;

export default patientReducer.reducer;
