import { useSelector } from 'react-redux';
import MessagesBody from './MessagesBody';
import MessagesForm from './MessagesForm';
import MessagesHeader from './MessagesHeader';

const Messages = ({ data, username }) => {
  const { name, id } = useSelector(({ ui }) => ({
    name: ui.currentChannel.name ?? ui.defaultChannel.name,
    id: ui.currentChannel.id ?? ui.defaultChannel.id,
  }));

  const currentMessages = data?.filter(({ channelId }) => channelId === id);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          countMessages={currentMessages?.length}
          currentChannelName={name}
        />
        <MessagesBody currentMessages={currentMessages} />
        <MessagesForm currentChannelId={id} username={username} />
      </div>
    </div>
  );
};

export default Messages;
