import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthToken, setUserName } from '../services/authSlice';
import resetAuthDataInLocalStorage from '../utils/resetAuthDataInLocalStorage';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserName = localStorage.getItem('username');
  const renderUserName = () => {
    if (currentUserName) {
      return (
        <Navbar.Text>
          {'Вошли как: '}
          <b className="text-primary">{`${currentUserName}`}</b>
        </Navbar.Text>
      );
    }
    return null;
  };
  const handleClick = () => {
    resetAuthDataInLocalStorage();
    dispatch(setAuthToken({ token: '' }));
    dispatch(setUserName({ username: '' }));
    navigate('/login', { replace: false });
  };
  const renderExitButton = () => {
    if (currentUserName) {
      return (
        <Button variant="primary" className="mx-1" onClick={handleClick}>Выйти</Button>
      );
    }
    return null;
  };
  return (
    <Navbar className="shadow-sm navbar bg-white">
      <Container>
        <Navbar.Brand href="#home">Slack chat</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {renderUserName()}
          {renderExitButton()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
