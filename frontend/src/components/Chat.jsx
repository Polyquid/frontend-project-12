import { useGetChannelsQuery } from '../services/channelsApi';
import { useGetMessagesQuery } from '../services/messagesApi';
import Channels from './Channels/index';
import Messages from './Messages/index';

const Chat = () => {
  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels data={channels} />
        <Messages data={messages} />
      </div>
    </div>
  );
};

export default Chat;
