import { useGetChannelsQuery } from '../services/channelsApi';
import { useGetMessagesQuery } from '../services/messagesApi';
import Channels from './Channels/index';
import Messages from './Messages/index';

const Chat = () => {
  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const currentUsername = localStorage.getItem('username');
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels data={channels} username={currentUsername} />
        <Messages data={messages} username={currentUsername} />
      </div>
    </div>
  );
};

export default Chat;
