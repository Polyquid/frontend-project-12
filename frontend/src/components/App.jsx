import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat.jsx';
import Header from './Header.jsx';

const App = () => {
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem('token');
  useEffect(() => {
    if (localStorageToken === null) {
      navigate('/login');
    }
  }, [localStorageToken, navigate]);
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Chat />
    </div>
  );
};

export default App;
