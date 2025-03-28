import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/network/errorHandler";
import * as C from '../../constants/index';
import { networkCall } from '../../networking/Networking';


export const favouriteDashboard = createAsyncThunk(
    'users/FAVOURITEDATA/FAVOURITE',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.FAVOURITEDATA, 'GET', undefined, {});
            console.log("sdkskdnsdkns----FAVOURITEDATA", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const addFavouriteTab = createAsyncThunk(
    'favourite/add/Favourite',
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


const initialState = {
    loading: false,
    error: false,
    errorMessage: undefined,
    favouriteTabData: undefined,
    favouriteData: {},
};

export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        usersReset: (state, action) => {
            state.error = false;
            state.favouriteData = undefined;
            state.favouriteTabData = undefined;
        },
    },
    extraReducers: {
        [favouriteDashboard.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [favouriteDashboard.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.favouriteData = payload.data
        },
        [favouriteDashboard.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [addFavouriteTab.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [addFavouriteTab.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.favouriteTabData = payload.data
        },
        [addFavouriteTab.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        
    }
});

export const { } = favouriteSlice.actions;