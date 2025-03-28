import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/network/errorHandler";
import * as C from '../../constants/index';
import { networkCall } from '../../networking/Networking';
import { setAuthorization } from "../../networking/utils";
import { saveData } from "../../utils/network/commonFunction";


export const login = createAsyncThunk(
  'users/login/password',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.LOGIN, 'POST', params, {});
      if (response?.data?.status) {
        console.log("sdkskdnsdkns----121212", response.data);
        if (response.data.auth_token != undefined) {
          await saveData(response.data.auth_token, C.LocalStorage.AUTH_TOKEN)
          setAuthorization()
        }
        return response;
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const signUp = createAsyncThunk(
  'users/Signup/Register',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.REGISTER, 'POST', params, {});
      console.log("sdkskdnsdkns----", response.data);
      // if (response?.data?.status) {
        console.log("sdkskdnsdkns----Register", response.data);
        return response;
      // } else {
        // return rejectWithValue(errorHandler(response));
      // }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'users/verifyOTP/Register',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.VERIFYEMAIL, 'POST', params, {});
      console.log("sdkskdnsdkns----", response.data, response.status);
      if (response?.data?.status) {
        await saveData(response.data.token, C.LocalStorage.AUTH_TOKEN)
        setAuthorization()
        return response;
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword/password',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.FORGOTPASSWORD, 'POST', params, {});
      console.log("sdkskdnsdkns----", response.data, response.status);
      if (response?.data?.status) {
        return response;
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword/password',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.RESETPASSWORD, 'POST', params, {});
      console.log("sdkskdnsdkns----", response.data, response.status);
      if (response?.data?.status) {
        return response;
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const resendOTP = createAsyncThunk(
  'users/verifyOTP/Resend',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.RESENDOTP, 'POST', params, {});
      console.log("sdkskdnsdkns----", response.data, response.status);
      if (response?.data?.status) {
        return response;
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const googleSignIn = createAsyncThunk(
  'users/googleSignIn/signIn',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.GOOGLE_SIGNIN, 'POST', params, {});
      if (response?.data?.status) {
        console.log("11sdkskdnsdkns----googleSignIn", response.data, response.data.access_token);
        if (response.data.access_token != undefined) {
          await saveData(response.data.access_token, C.LocalStorage.AUTH_TOKEN)
          setAuthorization()
        }
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const appleSignIn = createAsyncThunk(
  'users/applesignIN/signIn',
  async (params, { rejectWithValue }) => {
    try {
      const response = await networkCall(C.APPLE_SIGNIN, 'POST', params, {});
      if (response?.data?.status) {
        console.log("11sdkskdnsdkns----applesignin", response.data, response.data.access_token);
        if (response.data.access_token != undefined) {
          await saveData(response.data.access_token, C.LocalStorage.AUTH_TOKEN)
          setAuthorization()
        }
      } else {
        return rejectWithValue(errorHandler(response));
      }
    } catch (error) {
      console.log("err", error);
      return rejectWithValue(errorHandler(error));
    }
  }
)

export const logoutFromApp = createAsyncThunk(
  'users/logout',
  async (params, { rejectWithValue }) => {
  return rejectWithValue('error');
  }
)

const initialState = {
  isUserLoggedIn: false,
  loading: false,
  error: false,
  errorMessage: undefined,
  errorSignUPMessage: undefined,
  errorOTPMessage: undefined,
  errorResetMessage: undefined,
  errorPasswordData: undefined,
  googleSignInData: undefined,
  loginUserData: {},
  registerData: {},
  verifyOTPData: {},
  resetPasswordData: {},
  forgotPasswordData: {},
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    usersReset: (state, action) => {
      state.error = false;
      state.registerData = undefined;
      state.resetPasswordData = undefined;
      state.forgotPasswordData = undefined;
      state.errorOTPMessage = undefined;
      state.errorResetMessage = undefined;
      state.errorPasswordData = undefined;
      state.googleSignInData = undefined;
      state.resetPasswordData = {};
    },
  },
  extraReducers: {
    [login.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [login.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = true;
      state.error = false;
      state.loading = false;
      state.loginUserData = payload.data
    },
    [login.rejected.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = false;
      state.error = true;
      state.loading = false;
      state.errorMessage = payload
    },
    [signUp.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [signUp.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.error = false;
      state.loading = false;
      state.registerData = payload.data
    },
    [signUp.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
      state.errorSignUPMessage = payload
    },
    [verifyOTP.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [verifyOTP.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = true;
      state.error = false;
      state.loading = false;
      state.verifyOTPData = payload.data
      state.loginUserData = payload.data
    },
    [verifyOTP.rejected.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = false;
      state.error = true;
      state.loading = false;
      state.errorOTPMessage = payload
    },
    [resendOTP.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [resendOTP.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.error = false;
      state.loading = false;
    },
    [resendOTP.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
    },
    [forgotPassword.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [forgotPassword.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.error = false;
      state.loading = false;
      state.forgotPasswordData = payload;
    },
    [forgotPassword.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
      state.errorPasswordData = payload;
    },
    [resetPassword.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [resetPassword.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.error = false;
      state.loading = false;
      state.resetPasswordData = payload
    },
    [resetPassword.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
      state.errorResetMessage = payload;
    },
    [googleSignIn.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [googleSignIn.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = true;
      state.error = false;
      state.loading = false;
      state.loginUserData = payload;
    },
    [googleSignIn.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
      state.errorResetMessage = payload;
    },
    [appleSignIn.pending.type]: (
      state,
      { payload }
    ) => {
      state.loading = true;
      state.error = false;
    },
    [appleSignIn.fulfilled.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = true;
      state.error = false;
      state.loading = false;
      state.loginUserData = payload;
    },
    [appleSignIn.rejected.type]: (
      state,
      { payload }
    ) => {
      state.error = true;
      state.loading = false;
      state.errorResetMessage = payload;
    },
    [logoutFromApp.rejected.type]: (
      state,
      { payload }
    ) => {
      state.isUserLoggedIn = false;
    },
  },
});

export const { } = authSlice.actions;