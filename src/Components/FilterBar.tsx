import styled from 'styled-components';
import ToggleSwitch from './ToggleSwitch';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { tableSlice } from '../Store/reducers/dataList';

const Wrapper = styled.section`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const RadioArea = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { filtersCheck } = useAppSelector((state) => state.tableReducer);

  const [filters, setFilters] = useState<any>({
    approved: filtersCheck.approved,
    declined: filtersCheck.declined,
    pending: filtersCheck.pending,
  });

  const onSwitchChange = (e: any, title: string) => {
    let clone = structuredClone(filters);

    Object.keys(clone).forEach((item) => {
      item === title.toLowerCase() && (clone[item] = e.target.checked);
    });

    dispatch(tableSlice.actions.setFiltersCheck(clone));
  };

  useEffect(() => {
    setFilters(filtersCheck);
  }, [filtersCheck]);

  return (
    <Wrapper>
      <RadioArea>
        <ToggleSwitch
          title={'Approved'}
          color={''}
          checked={filters.approved}
          onClick={onSwitchChange}
        />
      </RadioArea>
      <RadioArea>
        <ToggleSwitch
          title={'Pending'}
          color={'#dbc921'}
          checked={filters.pending}
          onClick={onSwitchChange}
        />
      </RadioArea>
      <RadioArea>
        <ToggleSwitch
          title={'Declined'}
          color={'#ba1c1c'}
          checked={filters.declined}
          onClick={onSwitchChange}
        />
      </RadioArea>
    </Wrapper>
  );
};

export default FilterBar;
