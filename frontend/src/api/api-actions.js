export function tokenAction() {
  return {
    url: `/api/users/auth/`,
    method: 'get',
  };
}

export function registerUserAction(user) {
  return {
    url: `/api/users/register`,
    data: user,
    method: 'post'
  }
}

export function loginUserAction(user) {
  return {
    url: `/api/users/login`,
    data: user,
    method: 'post'
  }
}

export function getGraphAction(id) {
  return {
    url: `/api/graph/${id}`,
    method: 'get'
  }
}

export function createGraphAction() {
  return {
    url: `/api/graph/create`,
    method: 'post'
  }
}

export function deleteGraphAction(id) {
  return {
    url: `/api/graph/${id}/delete`,
    method: 'post'
  }
}

export function updateGraphAction(id, values) {
  return {
    url: `/api/graph/${id}/update`,
    data: values,
    method: 'post'
  }
}
