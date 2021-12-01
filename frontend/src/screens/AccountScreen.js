import React, { Fragment, useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Wrapper } from '../components/containers/Wrapper'
import { Table } from '../components/tables/Table'
import { Row, FlexGrow, Link } from '../components/styled'
import { removeToken } from '../api/http'
import { resetUser } from '../redux/reducers/user'
import { getUserGraphs, createGraph } from '../api/api-requests'

export const AccountScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(data => data.user)

  const [userGraphs, setUserGraphs] = useState(null)

  async function loadData() {
    try {
      const res = await getUserGraphs(user.uuid)
      setUserGraphs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Load on page load
  useEffect(() => {
    loadData()
  }, [])

  const graphColumns = useMemo(() => [
    {
      Header: (
        <div style={{float: 'left'}}>Name</div>
      ),
      accessor: 'name'
    },
    {
      Header: (
        <div style={{float: 'left'}}>Date Created</div>
      ),
      accessor: 'date'
    }
  ])

  const graphData = userGraphs ? userGraphs.map((graph) => {
    return {
      name: (
        <div style={{width: '50vw', float: 'left'}}>
          <Link onClick={() => navigate(`/graph/${graph._id}`)}>{graph.name}</Link>
        </div>
      ),
      date: (
        <div style={{width: '30vw', float: 'left'}}>
          {graph.date}
        </div>
      )
    }
  }) : []


  async function logout() {
    await dispatch(resetUser())
    await removeToken()
    await navigate('/')
  }

  async function newGraph() {
    const graph = await createGraph('Untitled Graph', user.uuid)
    await navigate(`/graph/${graph._id}`)
  }

  return (
    <Wrapper showIn={true}>
      <Row>
        <h1>{`Welcome Back, ${user.name}`}</h1>
        <FlexGrow />
        <button onClick={logout}>Logout</button>
      </Row>
      <button onClick={newGraph}>Create New Graph</button>
      <Table columns={graphColumns} data={graphData} />
    </Wrapper>
  )
}
