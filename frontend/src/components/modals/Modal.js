import React, { useRef } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--light-black);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`

const ModalContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  z-index: 3;
  overflow-y: scroll;
  max-height: 100vh;
  max-width: 100vw;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Modal = ({children, close}) => {
  const inner = useRef(null)

  function requestClose(e){
    if (!inner.current.contains(e.target)){
      close()
    }
  }

  return (
    <Overlay onClick={requestClose}>
      <ModalContainer ref={inner}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};
