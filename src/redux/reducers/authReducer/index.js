import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import url from '../../../config/apiConfig';
import { sha256 } from 'js-sha256';
import { commonState } from '../../../helpers/commonReducerState';
const encrypt = (text) => {
  return sha256(text);
};

export const loginEducatorAction = createAsyncThunk(
  'auth/loginEducatorAction',
  async ({ username, password }, { rejectWithValue }) => {
    let encryptedPassword = await encrypt(password);
    let auths = {};
    const data = {
      id: username,
      password: encryptedPassword,
    };
    return axios
      .post(`${url}/login`, data)
      .then((res) => {
        if (res.data.educator) {
          const { educatorId, appointments, chats } = res.data;
          rejectWithValue();
          const educator = JSON.parse(res.data.educator);
          const tokens = educator.token;

          auths.token = tokens[tokens.length - 1];
          auths.educatorId = educatorId;
          auths.appointments = appointments;
          auths.chats = chats;
          auths.admin = false;
          return auths;
        } else return rejectWithValue('credintials');
      })
      .catch((e) => {
        console.log('error', e);
        return rejectWithValue('network');
      });
  }
);
export const loginAdminAction = createAsyncThunk(
  'auth/loginAdminAction',
  async ({ username, password }, { rejectWithValue }) => {

    let encryptedPassword = await encrypt(password);
    let auths = {};
    const data = {
      adminUsername: username,
      password: encryptedPassword,
    };
    return axios
      .post(`${url}/login`, data)
      .then((res) => {
        if (res.data.admin) {
          const admin = JSON.parse(res.data.admin);
          const { id } = admin;
          const tokens = admin.token;

          auths.token = tokens[tokens.length - 1];
          auths.educatorId = id;
          auths.admin = true;

          return auths;
        } else return rejectWithValue('credintials');
      })
      .catch((e) => {
        console.log('error', e);
        return rejectWithValue('network');
      });
  }
);
export const logoutAction = createAsyncThunk(
  'auth/logout',
  async ({ educatorId, token, adminId }) => {
    let body;
    if (adminId)
      body = {
          adminId,
          // notificationToken: ' ',
        };
        else
        body = {
            educatorId,
            notificationToken: ' ',
      };

    const result = await axios
      .patch(`${url}/logout`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((e) => {
        console.log('error ', e);
      });
    return result;
  }
);
export const resetPasswordAction = createAsyncThunk(
    'auth/resetPasswordAction',
    async({adminId, token, oldPassword, newPassword},{rejectWithValue}) => {
      try{

        const encryptedPassword = await encrypt(newPassword)
        const encryptedOldPassword = await encrypt(oldPassword)
        const body = {
            adminId,
            oldPassword: encryptedOldPassword,
            password: encryptedPassword,
        }
        return await axios.patch(`${url}/admin?adminId=${adminId}`,body ,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        } ).then((res) => {
          if(res.data.id){

            return res.data
          }
          else 
          return rejectWithValue('wrong password')
          
        }).catch((e) => {
            console.log('error reseting ',e);
            return rejectWithValue(e)
        })
      } catch (error){
        return rejectWithValue(error)
      }
    }
)
const initialState = {
  token: null,
  educatorId: null,
  appointments: null,
  chats: null,
  response: null,
  darkMode: false,
  admin: false,
  resetError: '',
  ...commonState,
};
const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAll: () => initialState,
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setResetError: (state, action) => {
        state.resetError = action.payload
    }
  },

  extraReducers: {
    [loginEducatorAction.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.educatorId = action.payload.educatorId;
      state.appointments = action.payload.appointments;
      state.chats = action.payload.chats;
      state.admin = action.payload.admin;
      state.loading = false;
    },
    [loginEducatorAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loginEducatorAction.rejected]: (state, action) => {
      if (action.payload === 'network') state.error = "There's a Network issue";
      else if (action.payload === 'credintials')
        state.error = 'The Username or Password is incorrect';
      state.loading = false;
    },
    [loginAdminAction.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.educatorId = action.payload.educatorId;
      state.admin = action.payload.admin;
      state.loading = false;
    },
    [loginAdminAction.pending]: (state, action) => {
      state.loading = true;
    },
    [loginAdminAction.rejected]: (state, action) => {
      if (action.payload === 'network') state.error = "There's a Network issue";
      else if (action.payload === 'credintials')
        state.error = 'The Username or Password is incorrect';
      state.loading = false;
    },
    [resetPasswordAction.fulfilled]: (state, action) => {
        state.token = action.payload.token[0]
    },
    [resetPasswordAction.rejected]: (state, action) => {
      state.resetError = 'somthing went wrong'
    },
  },
});

export const {
  setLoading: setLoadingAction,
  setChats: setChatsAction,
  clearAll: clearAllAuthAction,
  setDarkMode: setDarkModeAction,
  setResetError: setResetErrorAction
} = authReducer.actions;

export default authReducer.reducer;
