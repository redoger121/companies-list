import { configureStore } from '@reduxjs/toolkit';
import companiesSlice from './companiesSlice';

export const store = configureStore({
  reducer: {
    companies: companiesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export default AppDispatch;
