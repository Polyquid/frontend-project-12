import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ countMessages, currentChannelName }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`${t('chat.messages.marker')} ${currentChannelName}`}</b>
      </p>
      <span className="text-muted">{t('chat.messages.count', { count: countMessages ?? 0 })}</span>
    </div>
  );
};

export default MessagesHeader;
