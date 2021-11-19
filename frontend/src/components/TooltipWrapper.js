import React, { useState } from 'react';
import styled from 'styled-components';

const Label = styled.div`
  background-color: var(--black);
  position: absolute;
  margin: auto;
  height: 14px;
  font-size: 11px;
  font-weight: 700;
  color: var(--white);
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transform: translate(0px, -${props => props.amount}px);
  z-index: 2;

  ${props => props.below && `
    transform: translate(0px, ${props.amount}px);
  `}
`

const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const TooltipWrapper = ({text, below=false, amount=35, children}) => {
  const [show, setShow] = useState(false)

  return (
    <CenterWrapper onMouseLeave={() => { setShow(false) }}>
      {show &&
        <Label below={true} amount={amount}>
          {text}
        </Label>
      }
      <div onMouseEnter={() => { setShow(true) }}>
        {children}
      </div>
    </CenterWrapper>
  )
}
