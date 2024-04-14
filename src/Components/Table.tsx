import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import copy from '../assets/copy.png';
import adjust from '../assets/adjust.png';
import ToggleSwitch from './ToggleSwitch';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';
import { fetchData } from '../Store/reducers/ActionCreators';
import { ITable } from '../models/iTable';
import { tableSlice } from '../Store/reducers/dataList';

const Wrapper = styled.section`
  width: 90%;
  margin: auto;
  background-color: #17212b;
  border-radius: 20px 20px 0 0;
  margin-top: 30px;
`;

const PaginationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 95%;
  height: 100%;
  align-items: flex-end;
`;

const FilterWrapper = styled.section`
  width: 95%;
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

const StyledTable = styled.table`
  width: 100%;
  border: none;
`;

const StyledTH = styled.tr`
  height: 80px;
  background-color: #14486b;
`;

const StyledTDH = styled.td`
  font-size: 22px;
  color: white;
  text-transform: uppercase;
  width: ${({ width }) => (width && width) || '25%'};
  text-align: start;
  padding: 0 1em;
  border: none;
  position: relative;
`;

const StyledTR = styled.tr`
  height: 75px;
  background-color: ${({ color }) => (color && color) || '#17212b'};
  color: white;
  border-radius: 20px;
`;

const StyledTDR = styled.td`
  padding: 0 1.5em;
  border-right: 1px solid #4a4c4d;
  position: relative;
  &:last-child {
    border: none;
  }
`;

const StyledStatus = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${({ color }) => color && color};
  position: absolute;
  top: 30px;
  right: 10px;
`;

const BtnSection = styled.section`
  width: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 20px;
`;

const Table = () => {
  const dispatch = useAppDispatch();
  const { data, searchResults, searchTerm, filtersCheck, filteringData } =
    useAppSelector((state) => state.tableReducer);
  const [paginatedData, setPaginatedData] = useState<ITable[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const dateFormatter = (date: string) => {
    let current = new Date(date);
    return current.toDateString();
  };

  const onPageChange = (event: any) => {
    let tableData =
      searchTerm === '' ? (isFiltering ? filteringData : data) : searchResults;
    const newOffset = (event.selected * 6) % tableData.length;

    let newData = tableData.slice(newOffset, newOffset + 6);
    setPaginatedData(newData);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    const currentItems = data.slice(0, 6);
    setPaginatedData(currentItems);

    setPageCount(Math.ceil(data.length / 6));
  }, [data]);

  useEffect(() => {
    if (searchTerm !== '') {
      let newData = data.filter((item: any) => {
        return Object.keys(item).some((key: any) =>
          item[key].toString().toLowerCase().includes(searchTerm),
        );
      });

      dispatch(tableSlice.actions.setSearchResults(newData));
      setPaginatedData(newData.slice(0, 6));
      setPageCount(Math.ceil(newData.length / 6));
    } else {
      setPaginatedData(data.slice(0, 6));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (filtersCheck.approved) {
      let newData = data.filter((item: any) => {
        return item.status === 'approved';
      });

      dispatch(tableSlice.actions.setFilteringData(newData));
      setPaginatedData(newData.slice(0, 6));
      setPageCount(Math.ceil(newData.length / 6));
      setIsFiltering(true);
    }

    if (!filtersCheck.approved) {
      setIsFiltering(false);
      const currentItems = data.slice(0, 6);
      setPaginatedData(currentItems);

      setPageCount(Math.ceil(data.length / 6));
    }
  }, [filtersCheck.approved]);

  useEffect(() => {
    if (filtersCheck.declined) {
      let newData = data.filter((item: any) => {
        return item.status === 'declined';
      });

      dispatch(tableSlice.actions.setFilteringData(newData));
      setPaginatedData(newData.slice(0, 6));
      setPageCount(Math.ceil(newData.length / 6));
      setIsFiltering(true);
    }
    if (!filtersCheck.declined) {
      setIsFiltering(false);
      const currentItems = data.slice(0, 6);
      setPaginatedData(currentItems);

      setPageCount(Math.ceil(data.length / 6));
    }
  }, [filtersCheck.declined]);

  useEffect(() => {
    if (filtersCheck.pending) {
      let newData = data.filter((item: any) => {
        return item.status === 'pending';
      });
      dispatch(tableSlice.actions.setFilteringData(newData));
      setPaginatedData(newData.slice(0, 6));
      setPageCount(Math.ceil(newData.length / 6));
      setIsFiltering(true);
    }
    if (!filtersCheck.pending) {
      setIsFiltering(false);
      const currentItems = data.slice(0, 6);
      setPaginatedData(currentItems);
      setPageCount(Math.ceil(data.length / 6));
    }
  }, [filtersCheck.pending]);

  return (
    <>
      <Wrapper>
        <FilterWrapper>
          {/* <ToggleSwitch color={'#4f95d6'} title={'Filtering'} checked={false} /> */}
        </FilterWrapper>
        <StyledTable cellSpacing='0'>
          <StyledTH>
            <StyledTDH width={'28%'}>
              Username
              <BtnSection>
                <img src={adjust} alt='adjust' />
                <img src={copy} alt='copy' />
              </BtnSection>
            </StyledTDH>
            <StyledTDH width={'12%'}>
              Email{' '}
              <BtnSection>
                <img src={adjust} alt='adjust' />
                <img src={copy} alt='copy' />
              </BtnSection>
            </StyledTDH>
            <StyledTDH width={'12%'}>
              Case{' '}
              <BtnSection>
                <img src={adjust} alt='adjust' />
                <img src={copy} alt='copy' />
              </BtnSection>
            </StyledTDH>
            <StyledTDH width={'20%'}>
              Reason{' '}
              <BtnSection>
                <img src={adjust} alt='adjust' />
                <img src={copy} alt='copy' />
              </BtnSection>
            </StyledTDH>
            <StyledTDH width={'28%'}>
              Submision date{' '}
              <BtnSection>
                <img src={adjust} alt='adjust' />
                <img src={copy} alt='copy' />
              </BtnSection>
            </StyledTDH>
          </StyledTH>
          {data &&
            paginatedData.map((item) => (
              <StyledTR color={item.id % 2 === 0 ? '#1e2f3b' : ''}>
                <StyledTDR>
                  {item.username}{' '}
                  <StyledStatus
                    color={
                      item.status === 'pending'
                        ? '#dbc921'
                        : item.status === 'approved'
                        ? ''
                        : '#ba1c1c'
                    }
                  ></StyledStatus>
                </StyledTDR>
                <StyledTDR>{item.email}</StyledTDR>
                <StyledTDR>{item.case_number}</StyledTDR>
                <StyledTDR>{item.reason}</StyledTDR>
                <StyledTDR>{dateFormatter(item.date)}</StyledTDR>
              </StyledTR>
            ))}
        </StyledTable>
      </Wrapper>
      <PaginationWrapper>
        <ReactPaginate
          activeClassName={'item active'}
          breakClassName={'item break-me'}
          breakLabel={'...'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          marginPagesDisplayed={2}
          nextClassName={'item next'}
          nextLabel='Next'
          onPageChange={(e) => onPageChange(e)}
          pageCount={pageCount}
          pageClassName={'item pagination-page'}
          pageRangeDisplayed={2}
          previousClassName={'item previous'}
          previousLabel='Prev'
        />
      </PaginationWrapper>
    </>
  );
};

export default Table;
