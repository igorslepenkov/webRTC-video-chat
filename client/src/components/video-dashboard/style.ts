import styled from 'styled-components';

export const StyledVideoDashboard = styled.section`
  flex-grow: 1;
  display: grid;
  grid-template-areas:
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'display display display display chat'
    'toolbar toolbar toolbar toolbar chat-input';
  column-gap: 1em;
  row-gap: 0.5em;
  margin: 20px;
`;
