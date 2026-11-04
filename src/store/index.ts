import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadsSlice';
import pipelineReducer from './slices/pipelineSlice';
import customersReducer from './slices/customersSlice';
import tasksReducer from './slices/tasksSlice';
import activitiesReducer from './slices/activitiesSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    pipeline: pipelineReducer,
    customers: customersReducer,
    tasks: tasksReducer,
    activities: activitiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
