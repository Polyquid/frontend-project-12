import Channels from '../components/Channels/index';
import Messages from '../components/Messages/index';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </div>
  </div>
);

export default Chat;
