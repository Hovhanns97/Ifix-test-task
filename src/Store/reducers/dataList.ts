import { ITable } from '../../models/iTable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  data: ITable[];
  isLoading: boolean;
  error: string;
  searchTerm: string;
  searchResults: ITable[];
  filteringData: ITable[];
  filtersCheck: { approved: boolean; declined: boolean; pending: boolean };
}

const initialState: TableState = {
  data: [],
  isLoading: false,
  error: '',
  searchTerm: '',
  searchResults: [],
  filteringData: [],
  filtersCheck: <any>{
    approved: false,
    declined: false,
    pending: false,
  },
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    dataFetching(state) {
      state.isLoading = true;
    },
    dataFetchingSuccess(state, action: PayloadAction<ITable[]>) {
      state.isLoading = false;
      state.error = '';
      state.data = action.payload;
    },
    dataFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSearchResults(state, action: PayloadAction<ITable[]>) {
      state.searchResults = action.payload;
    },
    setFiltersCheck(state, action: PayloadAction<any>) {
      state.filtersCheck = action.payload;
    },
    setFilteringData(state, action: PayloadAction<ITable[]>) {
      state.filteringData = action.payload;
    },
  },
});

export default tableSlice.reducer;
