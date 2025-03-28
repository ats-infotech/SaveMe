import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
// import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { homeSlice } from "./home/homeSlice";
import { favouriteSlice } from "./favourite/favouriteSlice";
import { recentSlice } from "./recent/recentSlice";
import { profileSlice } from "./profile/profileSlice";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = persistReducer(persistConfig,  combineReducers({
  auth: authSlice.reducer,
  home: homeSlice.reducer,
  favourite: favouriteSlice.reducer,
  recent: recentSlice.reducer,
  profile: profileSlice.reducer,
}));


export const store = configureStore({
  reducer,
  middleware: [thunk],
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
