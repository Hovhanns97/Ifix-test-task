import styled from 'styled-components';

import img from '../assets/searchIcon.png';
import { useAppDispatch } from '../hooks/redux';
import { tableSlice } from '../Store/reducers/dataList';

const Input = styled.input`
  width: 15%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid lightgrey;
  background-color: #4f4d4d;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: 8px 5px;
  opacity: 0.7;
  outline-style: none;
  padding: 0 2.5em;
  color: white;
  font-size: 20px;
`;

const SearchInput = () => {
  const dispatch = useAppDispatch();

  const onInputChange = (e: any) => {
    dispatch(tableSlice.actions.setSearchTerm(e.target.value.toLowerCase()));
  };

  return (
    <>
      <Input
        placeholder='Search in results'
        onChange={(e) => onInputChange(e)}
      />
    </>
  );
};

export default SearchInput;
