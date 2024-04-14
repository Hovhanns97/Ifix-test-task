import styled from 'styled-components';
import Heading from './Components/Heading';
import Table from './Components/Table';

import './App.css';

const Wrapper = styled.section`
  padding: 3em;
  margin: 0;
  min-height: 780px;
  height: 100%;
  background-color: black;
`;

function App() {
  return (
    <>
      <Wrapper>
        <Heading />
        <Table />
      </Wrapper>
    </>
  );
}

export default App;
