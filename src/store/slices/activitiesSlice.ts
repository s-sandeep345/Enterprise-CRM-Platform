import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../../types/crm';
import { INITIAL_ACTIVITIES } from '../../data/mockData';

interface ActivitiesState {
  activities: Activity[];
}

const initialState: ActivitiesState = {
  activities: INITIAL_ACTIVITIES,
};

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Omit<Activity, 'id' | 'timestamp'>>) => {
      const newAct: Activity = {
        ...action.payload,
        id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };
      state.activities.unshift(newAct);
    },
  },
});

export const { addActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;
