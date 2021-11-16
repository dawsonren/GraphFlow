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

export const Link = styled.a`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const LoginButton = styled.button`
  width: 70px;
  height: 30px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--black-2);
  background-color: inherit;

  &:hover {
    color: var(--black);
  }
`

export const RegisterButton = styled.button`
  margin-left: 10px;
  width: 70px;
  height: 30px;
  font-size: 13px;
  color: var(--white);
  font-weight: bold;
  background-color: var(--accent);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-shade);
  }
`

export const FormInput = styled.input`
  width: 350px;
  height: 40px;
  font-size: 15px;
  border: 0.5px solid var(--black);
  border-radius: 10px;
  padding: 0px 10px;
`

export const FormInputLabel = styled.label`
  align-self: flex-start;
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 14px;
`

export const FormSubmitButton = styled.button`
  align-self: center;
  margin-top: 30px;
  width: 160px;
  height: 40px;
  font-size: 14px;
  color: var(--white);
  font-weight: bold;
  background-color: var(--accent);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-shade);
  }
`
