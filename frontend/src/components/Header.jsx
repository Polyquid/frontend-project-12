import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import resetAuthDataInLocalStorage from '../utils/resetAuthDataInLocalStorage';
import { resetAuthData } from '../services/authDataSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentUserName = useSelector(({ authData }) => authData.username);
  const renderUserName = () => {
    if (currentUserName) {
      return (
        <Navbar.Text>
          {t('header.signedAs')}
          <b className="text-primary">{`${currentUserName}`}</b>
        </Navbar.Text>
      );
    }
    return null;
  };
  const handleClick = () => {
    resetAuthDataInLocalStorage();
    dispatch(resetAuthData());
    navigate('/login', { replace: false });
  };
  const renderExitButton = () => {
    if (currentUserName) {
      return (
        <Button variant="primary" className="mx-1" onClick={handleClick}>{t('header.exit')}</Button>
      );
    }
    return null;
  };

  return (
    <Navbar className="shadow-sm navbar bg-white">
      <Container>
        <Navbar.Brand href="/">{t('header.title')}</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {renderUserName()}
          {renderExitButton()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
