import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../services/channelsApi';
import { useGetMessagesQuery } from '../services/messagesApi';
import Channels from './Channels/index';
import Messages from './Messages/index';
import { setCurrentModalShow } from '../services/uiSlice';
import ChatModal from './ChatModal';

const Chat = () => {
  const dispath = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  const { name: modalName, show: modalShow } = useSelector((state) => state.ui.currentModal);

  const currentUsername = localStorage.getItem('username');
  const channelsNames = channels?.map(({ name }) => name);
  const handleModalHide = () => {
    dispath(setCurrentModalShow({ show: false }));
  };

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels data={channels} username={currentUsername} />
          <Messages data={messages} username={currentUsername} />
        </div>
      </div>
      <ChatModal
        name={modalName}
        show={modalShow}
        onHide={handleModalHide}
        validationData={channelsNames}
      />
    </>
  );
};

export default Chat;
