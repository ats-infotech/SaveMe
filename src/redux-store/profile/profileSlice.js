import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/network/errorHandler";
import * as C from '../../constants/index';
import { networkCall } from '../../networking/Networking';


export const profileData = createAsyncThunk(
    'users/profileData/PROFILE',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.PROFILEDATA, 'GET', undefined, {});
            console.log("sdkskdnsdkns----PROFILEDATA", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const imageData = createAsyncThunk(
    'profile/imageData/Image',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.IMAGEDATA, 'POST', params, {});
            console.log("----sdkskdnsdkns----imageData", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const recentDashboard = createAsyncThunk(
    'users/recent/RECENT',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.RECENTDATA, 'GET', undefined, {});
            console.log("sdkskdnsdkns----profileSlice", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'users/deleteAccount',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.DELETEACCOUNT, 'POST', params, {});
            console.log("sdkskdnsdkns----profileSlice", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const logout = createAsyncThunk(
    'users/deleteAccount',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.LOGOUT, 'POST', params, {});
            console.log("sdkskdnsdkns----profileSlice", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

const initialState = {
    loading: false,
    error: false,
    errorMessage: undefined,
    profileDataValue: {},
    recentDashboardData: {},
    imageProfileData: {},
    deleteAccountData: {}
};

export const profileSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        usersReset: (state, action) => {
            state.error = false;
            state.recentDashboardData = {};
        },
    },
    extraReducers: {
        [profileData.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [profileData.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.profileDataValue = payload.data
        },
        [profileData.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [recentDashboard.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [recentDashboard.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.recentDashboardData = payload.data
        },
        [recentDashboard.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [imageData.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [imageData.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.imageProfileData = payload.data
        },
        [imageData.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [deleteAccount.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [deleteAccount.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.deleteAccountData = payload.data
        },
        [deleteAccount.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
    }
});

export const { } = profileSlice.actions;