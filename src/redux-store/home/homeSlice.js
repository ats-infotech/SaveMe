import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { errorHandler } from "../../utils/network/errorHandler";
import * as C from '../../constants/index';
import { networkCall } from '../../networking/Networking';


export const homeDashboard = createAsyncThunk(
    'users/DASHBOARD/Home',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.DASHBOARD, 'GET', undefined, {});
            console.log("sdkskdnsdkns----homeSlice", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const getAllTypes = createAsyncThunk(
    'users/DASHBOARD/alltypes',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.GETALLTYPES, 'GET', undefined, {});
            console.log("sdkskdnsdkns----DASHBOARD", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const setLocationValue = createAsyncThunk(
    'users/location/setLocationValue',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.UPDATELOCATION, 'POST', params, {});
            console.log("sdkskdnsdkns----location", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const getLastHourtypes = createAsyncThunk(
    'users/lastHour/types',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.LASTHOURTYPES, 'GET', undefined, {});
            console.log("sdkskdnsdkns----LASTHOURTYPES", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const onGlobalSearch = createAsyncThunk(
    'users/search/global',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.GLOBALSEARCH + `?query=${params}`, 'GET', undefined, {});
            console.log("sdkskdnsdkns----onGlobalSearch", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const stripePayment = createAsyncThunk(
    'users/stripePayment/payment',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.STRIPE_API, 'POST', params,{});
            console.log("sdkskdnsdkns----stripePayment", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const payViaCard = createAsyncThunk(
    'users/payViaCard/card',
    async (params, { rejectWithValue }) => {
        console.log("dsdlsldmsld---",params);
        try {
            const response = await networkCall(C.PAYVIACARD, 'POST', params, {});
            console.log("sdkskdnsdkns----payViaCard", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const payViaCash = createAsyncThunk(
    'users/payViaCash/cash',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.PAYVIACASH, 'POST', params, {});
            console.log("sdkskdnsdkns----PAYVIACASH", response.data,response.status);
            return response;
        } catch (error) {
            console.log("err", error);
            return rejectWithValue(errorHandler(error));
        }
    }
)

export const getDetailsBundle = createAsyncThunk(
    'users/Details/types',
    async (params, { rejectWithValue }) => {
        try {
            const response = await networkCall(C.DETAILSBUNDLES + `?bundleId=${params.id}` , 'GET', undefined, {});
            console.log("sdkskdnsdkns----getDetailsBundle", response.data,response.status);
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
    homeData: {},
    alltypesData: {},
    lasttypesData: {},
    detailData: {},
    payViaCardData: undefined,
    payViaCashData: undefined,
    locationValue: undefined,
    globalSearchData: undefined,
    stripePaymentData: undefined,
    loctaionStatus: false,
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        usersReset: (state, action) => {
            state.error = false;
            state.payViaCardData=undefined;
            state.payViaCashData=undefined;
            state.stripePaymentData=undefined;
        },
    },
    extraReducers: {
        [homeDashboard.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [homeDashboard.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.homeData = payload.data
        },
        [homeDashboard.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [getAllTypes.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [getAllTypes.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.alltypesData = payload.data
        },
        [getAllTypes.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [getLastHourtypes.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [getLastHourtypes.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.lasttypesData = payload.data
        },
        [getLastHourtypes.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [getDetailsBundle.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [getDetailsBundle.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.detailData = payload.data
        },
        [getDetailsBundle.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [payViaCard.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [payViaCard.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.payViaCardData = payload.data
        },
        [payViaCard.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [payViaCash.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [payViaCash.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.payViaCashData = payload.data
        },
        [payViaCash.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [setLocationValue.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [setLocationValue.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.locationValue = payload.data
            state.loctaionStatus = true
        },
        [setLocationValue.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [onGlobalSearch.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [onGlobalSearch.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.globalSearchData = payload;
        },
        [onGlobalSearch.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
        [stripePayment.pending.type]: (
            state,
            { payload }
        ) => {
            state.loading = true;
            state.error = false;
        },
        [stripePayment.fulfilled.type]: (
            state,
            { payload }
        ) => {
            state.error = false;
            state.loading = false;
            state.stripePaymentData = payload;
        },
        [stripePayment.rejected.type]: (
            state,
            { payload }
        ) => {
            state.error = true;
            state.loading = false;
            state.errorMessage = payload
        },
    }
});

export const { } = homeSlice.actions;