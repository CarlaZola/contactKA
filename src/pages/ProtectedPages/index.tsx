import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProtectedPages = () => {
  const { isLog } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLog) {
      navigate('/');
    }

  }, []);

  return isLog ? <Outlet /> : null;
};

export default ProtectedPages;