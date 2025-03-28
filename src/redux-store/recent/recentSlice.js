import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/network/errorHandler";
import * as C from '../../constants/index';
import { networkCall } from '../../networking/Networking';


export const recentDashboard = createAsyncThunk(
    'users/recent/RECENT',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.RECENTDATA, 'GET', undefined, {});
            console.log("sdkskdnsdkns----recentSlice", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const addFavourite = createAsyncThunk(
    'users/add/Favourite',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.ADDFAVOURITEDATA + '?bundle_id=' + params , 'POST', undefined, {});
            console.log("sdkskdnsdkns----favouriteData", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const searchData = createAsyncThunk(
    'users/add/searchData',
    async (params, { rejectWithValue }) => {
        try {
            // const response = await networkCall(C.SEARCHDATA + '?category_ids[0]=' + params.id + '&lat=' + params.lat + '&lng=' + params.lng , 'GET', undefined, {});
            const response = await networkCall(C.SEARCHDATA + '?' +   params.id  + '&radius=' + params.radius , 'GET', undefined, {});
            console.log("sdkskdnsdkns----SEARCHDATA", response.data.result,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const rating = createAsyncThunk(
    'users/add/rate',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.RATING, 'POST', params, {});
            console.log("sdkskdnsdkns----favouriteData", response.data,response.status);
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
    recentData: undefined,
    favouriteData: undefined,
    searchDataValue: undefined,
};

export const recentSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        usersReset: (state, action) => {
            state.error = false;
            state.favouriteData = undefined;
        },
    },
    extraReducers: {
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
            state.recentData = payload.data
        },
        [recentDashboard.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [addFavourite.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [addFavourite.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.favouriteData = payload.data
        },
        [addFavourite.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [rating.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [rating.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.ratingData = payload.data
        },
        [rating.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [searchData.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [searchData.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.searchDataValue = payload.data
        },
        [searchData.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        
    }
});

export const { } = recentSlice.actions;