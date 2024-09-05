import { useSelector } from 'react-redux';
import MessagesBody from './MessagesBody';
import MessagesForm from './MessagesForm';
import MessagesHeader from './MessagesHeader';

const Messages = ({ data }) => {
  const { name, id } = useSelector((state) => state.ui.currentChannel);
  const currentMessages = data?.filter(({ channelId }) => channelId === id);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader
          countMessages={currentMessages?.length}
          currentChannelName={name}
        />
        <MessagesBody currentMessages={currentMessages} />
        <MessagesForm currentChannelId={id} />
      </div>
    </div>
  );
};

export default Messages;
