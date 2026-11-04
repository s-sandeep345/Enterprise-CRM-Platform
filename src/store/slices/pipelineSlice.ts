import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Deal, DealStage } from '../../types/crm';
import { INITIAL_DEALS } from '../../data/mockData';

interface PipelineState {
  deals: Deal[];
}

const initialState: PipelineState = {
  deals: INITIAL_DEALS,
};

export const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    addDeal: (state, action: PayloadAction<Omit<Deal, 'id'>>) => {
      const newDeal: Deal = {
        ...action.payload,
        id: `DL-${Math.floor(100 + Math.random() * 900)}`,
      };
      state.deals.push(newDeal);
    },
    updateDealStage: (state, action: PayloadAction<{ id: string; stage: DealStage }>) => {
      const deal = state.deals.find((d) => d.id === action.payload.id);
      if (deal) {
        deal.stage = action.payload.stage;
      }
    },
    deleteDeal: (state, action: PayloadAction<string>) => {
      state.deals = state.deals.filter((d) => d.id !== action.payload);
    },
  },
});

export const { addDeal, updateDealStage, deleteDeal } = pipelineSlice.actions;
export default pipelineSlice.reducer;
