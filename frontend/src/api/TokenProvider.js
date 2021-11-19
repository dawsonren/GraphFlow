import useAsync from 'react-use/lib/useAsync';
import { loadToken } from './http';
import { useDispatch } from 'react-redux';

import { tokenAuth } from './api-requests'
import { authenticateUser } from '../redux/reducers/user';

export function TokenProvider({ children }) {
  const dispatch = useDispatch();
  const { loading } = useAsync(async () => {
    const value = await loadToken();

    if (value){
      const result = await tokenAuth()
      dispatch(authenticateUser(result.user));
    }

  }, []);

  if (loading) {
    return null;
  }

  return children;
}
