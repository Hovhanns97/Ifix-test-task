import { ITable } from '../../models/iTable';
import { AppDispatch } from '../store';
import axios from 'axios';
import { tableSlice } from './dataList';

export const fetchData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(tableSlice.actions.dataFetching());
    const response = await axios.get<ITable[]>(
      'https://my-json-server.typicode.com/Hovhanns97/IfixTestTaskdb/data',
    );
    dispatch(tableSlice.actions.dataFetchingSuccess(response.data));
  } catch (e: any) {
    dispatch(tableSlice.actions.dataFetchingError(e.message));
  }
};
