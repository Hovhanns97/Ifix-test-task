import styled from 'styled-components';
import FilterBar from './FilterBar';
import SearchInput from './SearchInput';

const Wrapper = styled.section`
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = () => {
  return (
    <Wrapper>
      <FilterBar />
      <SearchInput />
    </Wrapper>
  );
};

export default Heading;
