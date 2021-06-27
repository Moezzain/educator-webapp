import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEducatorsAndPatients } from '../../../API/apiEducator';
import { commonState } from '../../../helpers/commonReducerState';

export const getEducatorsAndPatients = createAsyncThunk(
  'educators/getEducatorsAndPatients',
  async ({ educatorId, token },{rejectWithValue}) => {

    return await getAllEducatorsAndPatients(educatorId, token).then((data) => {
        if(data)
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
  currentEducator:'',
  ...commonState
};
const educatorsReducer = createSlice({
  name: 'educators',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setFetchedEducatiorId: (state, action) => {
        state.fetchedEducatorId = action.payload
    },
    setCurrentEducator: (state, action) => {
      state.currentEducator = action.payload
    }
  },

  extraReducers: {
      [getEducatorsAndPatients.fulfilled]: (state, action) => {
          
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
    setFetchedEducatiorId: setFetchedEducatorIdReducer,
    setCurrentEducator: setCurrentEducatorAction
} = educatorsReducer.actions;

export default educatorsReducer.reducer;
