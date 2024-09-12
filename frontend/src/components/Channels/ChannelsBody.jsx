import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

const ChannelsBody = ({
  data,
  currentChannelName,
  onClickChannel,
  onDeleteChannel,
  onRenameChannel,
  onSetCurrentChannel,
}) => {
  const { t } = useTranslation();
  const renderButton = (name, id) => (
    <button
      type="button"
      className={`w-100 text-start rounded-0 btn ${currentChannelName === name ? 'btn-secondary' : ''}`}
      onClick={onSetCurrentChannel(name, id)}
    >
      <span className="me-1">{t('chat.channels.marker')}</span>
      {name}
    </button>
  );
  const renderDropdown = (name, id) => (
    <Dropdown
      title={name}
      align="end"
      variant={currentChannelName === name ? 'secondary' : 'none'}
      drop="down"
      className="d-flex btn-group"
    >
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={currentChannelName === name ? 'secondary' : 'none'}
        onClick={onSetCurrentChannel(name, id)}
      >
        <span className="me-1">{t('chat.channels.marker')}</span>
        {name}
      </Button>

      <Dropdown.Toggle split variant={currentChannelName === name ? 'secondary' : 'none'}>
        <span className="visually-hidden">{t('chat.channels.editButton')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        <Dropdown.Item onClick={onDeleteChannel}>{t('chat.channels.removeButton')}</Dropdown.Item>
        <Dropdown.Item onClick={onRenameChannel}>{t('chat.channels.renameButton')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  const renderChannels = () => {
    if (data) {
      return data.map(({ id, name, removable }) => (
        <li key={id} id={`${id}`} name={`${name}`} className="nav-item w-100" onClick={onClickChannel} role="presentation">
          {removable ? renderDropdown(name, id) : renderButton(name, id)}
        </li>
      ));
    }
    return null;
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {renderChannels()}
    </ul>
  );
};

export default ChannelsBody;
