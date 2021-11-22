import React from 'react';
import { useParams } from 'react-router-dom'

import { GraphContainer } from '../components/containers/GraphContainer'

export const GraphScreen = ({}) => {
  return (
    <GraphContainer pub={false} />
  )
}
