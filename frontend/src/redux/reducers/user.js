export const authenticateUser = value => ({
  type: 'SET_USER',
  value,
});

export const resetUser = value => ({
  type: 'RESET_USER',
  value,
});

const defaultState = {
  user: null,
  isAuthenticated: false,
};

export const user = (state = defaultState, { type, value }) => {
  if (type === 'SET_USER') {
    return { ...value, isAuthenticated: true}
  } else if (type === 'RESET_USER') {
    return defaultState;
  }

  return state;
};
