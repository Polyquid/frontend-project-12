import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import MessagesBody from './MessagesBody';
import MessagesForm from './MessagesForm';
import MessagesHeader from './MessagesHeader';
import { messagesApi, useGetMessagesQuery } from '../../store/api/messagesApi';
import SocketContext from '../../contexts';

const Messages = () => {
  const dispatch = useDispatch();
  const { data } = useGetMessagesQuery();
  const { name, id } = useSelector(({ ui }) => ({
    name: ui.currentChannel.name ?? ui.defaultChannel.name,
    id: ui.currentChannel.id ?? ui.defaultChannel.id,
  }));
  const { username } = useSelector((state) => state.authData);
  const socket = useContext(SocketContext);

  const currentMessages = data?.filter(({ channelId }) => channelId === id);

  useEffect(() => {
    const listener = (newData) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(newData);
        }),
      );
    };
    socket.on('newMessage', listener);
    return () => {
      socket.off('newMessage');
    };
  }, []);

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
