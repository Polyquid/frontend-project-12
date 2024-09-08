import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';

const ChannelsHeader = ({ handleClick }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-3">
      <b>{t('chat.channels.title')}</b>
      <Button variant="outline-primary" size="sm" className="mx-1" onClick={handleClick}>+</Button>
    </div>
  );
};

export default ChannelsHeader;
