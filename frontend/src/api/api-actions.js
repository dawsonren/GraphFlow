export function getGraphAction(id) {
  return {
    url: `/graph/${id}`,
    method: 'get'
  }
}

export function createGraphAction() {
  return {
    url: `/graph/create`,
    method: 'post'
  }
}

export function deleteGraphAction(id) {
  return {
    url: `/graph/${id}/delete`,
    method: 'post'
  }
}

export function updateGraphAction(id, values) {
  return {
    url: `/graph/${id}/update`,
    data: values,
    method: 'post'
  }
}
