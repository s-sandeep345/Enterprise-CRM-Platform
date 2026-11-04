import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead } from '../../types/crm';
import { INITIAL_LEADS } from '../../data/mockData';

interface LeadsState {
  leads: Lead[];
  filterStatus: string;
  searchQuery: string;
}

const initialState: LeadsState = {
  leads: INITIAL_LEADS,
  filterStatus: 'All',
  searchQuery: '',
};

export const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Omit<Lead, 'id' | 'createdAt'>>) => {
      const newLead: Lead = {
        ...action.payload,
        id: `LD-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      state.leads.unshift(newLead);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addLead, updateLead, deleteLead, setFilterStatus, setSearchQuery } = leadsSlice.actions;
export default leadsSlice.reducer;
