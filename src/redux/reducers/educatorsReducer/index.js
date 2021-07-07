import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isCaseHandler, getEducatorIds,getEducatorData } from '../../../API/apiEducator';
import { commonState } from '../../../helpers/commonReducerState';
import url from '../../../config/apiConfig'
export const getEducatorsAndPatients = createAsyncThunk(
  'educators/getEducatorsAndPatients',
  async ({ educatorId, token },{rejectWithValue}) => {
    
    try {
      const caseHandler = await isCaseHandler(educatorId,token)
      if(caseHandler){
        
      
      const tempEducators = await getEducatorIds(educatorId, token);
      
      let patients = {}
      for (var i in tempEducators) {
        let educator = tempEducators[i]
        let {chats, appointments, educators}= await getEducatorData(educator.id, token)
        const isCaseHandler = educators?.find((filterEducator) => {
          return filterEducator?.id === educator?.id
        }).isCaseHandler
        educator.isCaseHandler = isCaseHandler
        if (chats) {
          educator.chats = chats
          educator.count = chats.length
          chats.forEach((chat) => {
            let patient = patients[chat.patientId]
            if (!patient) {
              patients[chat.patientId] = chat
              patient= patients[chat.patientId]
            }
            if (patient && patient.educators) {
              patient.educators.push({id: educator.id, name: educator.name})
            }
            else {
              patient.educators = [{id: educator.id, name: educator.name}]
            }
          })
          // break;
  
        }
        if (appointments) {
          tempEducators[i].appointments = appointments
        }
      
      }
      return {tempEducators, patients};
  }
  else{
    
    let patients = {}
    let {chats, appointments, educator}= await getEducatorData(educatorId, token)
    
    if (chats) {
      educator.chats = chats
      educator.count = chats.length
      chats.forEach((chat) => {
        let patient = patients[chat.patientId]
        if (!patient) {
          patients[chat.patientId] = chat
          patient= patients[chat.patientId]
        }
        if (patient && patient.educators) {
          patient.educators.push({id: educator.id, name: educator.name})
        }
        else {
          patient.educators = [{id: educator.id, name: educator.name}]
        }
      })
      

    }
    
    if (appointments) {
      educator.appointments = appointments
    }
    const tempEducators = [educator]
    
    return {tempEducators,patients}
  }

}
    catch (error) {
      console.log(' Error getEducatorsAndPatients', error);
      return rejectWithValue(error)
    }
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
          state.educators = action.payload.tempEducators
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
