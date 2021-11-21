import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiFileCopy2Fill, RiUpload2Line } from 'react-icons/ri'

import { TooltipWrapper } from '../TooltipWrapper'


const IconHolder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background-color: var(--black-3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  &:hover {
    background-color: var(--black-2);
  }
`


export const ActionSelector = ({graphJson, setGraphJson}) => {

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      f=>f,
      function handleFailure() {
        console.log('Failed to copy to clipboard')
    });
  }

  return (
    <div style={{alignSelf: 'flex-start', marginLeft: 5}}>
      <TooltipWrapper text='Copy JSON'>
        <IconHolder onClick={() => updateClipboard(JSON.stringify(graphJson))}>
          <RiFileCopy2Fill size={20} />
        </IconHolder>
      </TooltipWrapper>
      <TooltipWrapper text='Load JSON'>
        <IconHolder onClick={() => updateClipboard(JSON.stringify(graphJson))}>
          <RiUpload2Line size={20} />
        </IconHolder>
      </TooltipWrapper>
    </div>
  )
}
