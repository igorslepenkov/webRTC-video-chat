import styled from 'styled-components';

export const StyledVideoDashboard = styled.section`
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 80vh 8vh;
  grid-template-areas:
    'display display display display chat'
    'toolbar toolbar toolbar toolbar chat-input';
  column-gap: 1em;
  row-gap: 0.5em;
  margin: 20px;
`;
