import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types/crm';
import { INITIAL_CUSTOMERS } from '../../data/mockData';

interface CustomersState {
  customers: Customer[];
  selectedCustomerId: string | null;
}

const initialState: CustomersState = {
  customers: INITIAL_CUSTOMERS,
  selectedCustomerId: INITIAL_CUSTOMERS[0].id,
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Omit<Customer, 'id' | 'joinDate' | 'totalSpent'>>) => {
      const newCust: Customer = {
        ...action.payload,
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0],
      };
      state.customers.unshift(newCust);
    },
    setSelectedCustomer: (state, action: PayloadAction<string>) => {
      state.selectedCustomerId = action.payload;
    },
  },
});

export const { addCustomer, setSelectedCustomer } = customersSlice.actions;
export default customersSlice.reducer;
