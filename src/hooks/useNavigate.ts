import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useNavigate = () => {
  const history = useHistory();

  return useCallback(
    (route: string) => {
      history.push(route);
    },
    [history]
  );
};

export default useNavigate;
