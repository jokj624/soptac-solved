import React, { FC } from 'react';
import Table from './components/Table';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vm;
`;

const App: FC = () => {
  return (
    <Container>
      <Table />
    </Container>
  );
}

export default App;
