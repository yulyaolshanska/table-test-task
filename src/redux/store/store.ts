import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "redux/authSlice";
import { createWrapper } from "next-redux-wrapper";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default store;
// export type AppStore = ReturnType<typeof store>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

// export const wrapper = createWrapper<AppStore>(store);
const makeStore = () => store;

export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore);