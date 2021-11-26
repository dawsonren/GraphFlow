import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiFileCopy2Fill, RiUpload2Line, RiSaveLine, RiDeleteBin2Fill } from 'react-icons/ri'
import { useParams, useNavigate } from 'react-router-dom'

import { TooltipWrapper } from '../TooltipWrapper'
import { Modal } from '../modals/Modal'
import { deleteGraph, updateGraph } from '../../api/api-requests'


const IconHolder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  border: none;
  background-color: var(--black-3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  &:hover {
    background-color: var(--black-2);
  }
`


export const ActionSelector = ({graphJson, setGraphJson, pub, graphTitle}) => {
  const [showLoad, setShowLoad] = useState(false)
  const [json, setJson] = useState('')
  const { uuid } = useParams()

  const navigate = useNavigate()

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(
      f=>f,
      function handleFailure() {
        console.log('Failed to copy to clipboard')
    });
  }

  function submit() {
    setGraphJson(JSON.parse(json))
    setShowLoad(false)
    setJson('')
  }

  async function saveGraph() {
    const savedGraph = {
      name: graphTitle,
      user_id: uuid,
      ...graphJson
    }
    const res = await updateGraph(uuid, savedGraph)
    await setGraphJson(res)
  }

  async function deleteTheGraph() {
    await deleteGraph(uuid)
    await navigate('/account')
  }

  return (
    <div style={{alignSelf: 'flex-start', marginLeft: 5}}>
      <TooltipWrapper text='Copy JSON'>
        <IconHolder onClick={() => updateClipboard(JSON.stringify(graphJson))}>
          <RiFileCopy2Fill size={20} />
        </IconHolder>
      </TooltipWrapper>
      <TooltipWrapper text='Load JSON'>
        <IconHolder onClick={() => setShowLoad(true)}>
          <RiUpload2Line size={20} />
        </IconHolder>
      </TooltipWrapper>
      {!pub &&
        <Fragment>
          <TooltipWrapper text='Save Graph'>
            <IconHolder onClick={saveGraph}>
              <RiSaveLine size={20} />
            </IconHolder>
          </TooltipWrapper>
          <TooltipWrapper text='Delete Graph'>
            <IconHolder onClick={deleteTheGraph}>
              <RiDeleteBin2Fill size={20} />
            </IconHolder>
          </TooltipWrapper>
        </Fragment>
      }
      {showLoad &&
        <Modal close={() => { setShowLoad(false); setJson('') }}>
          <p>Paste your graph data here in JSON format:</p>
          <textarea style={{width: '50vw', height: '50vh', marginBottom: 10}}
            value={json} onChange={(e) => setJson(e.target.value)} />
          <button onClick={submit}>Submit</button>
        </Modal>
      }
    </div>
  )
}
