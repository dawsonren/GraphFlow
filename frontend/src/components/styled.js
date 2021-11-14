import styled from 'styled-components';


export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const FlexGrow = styled.div`
  flex-grow: 1;
`

export const DropdownMenu = styled.div`
  position: absolute;
  border: 0.5px solid var(--black-2);
  border-radius: 5px;
  width: ${props => props.width}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: var(--black-3);
  z-index: 4;
`

export const DropdownMenuRow = styled(Row)`
  height: 20px;
  padding-left: 2px;
  border-radius: 5px;

  &:hover {
    background-color: var(--black-4);
  }
`
