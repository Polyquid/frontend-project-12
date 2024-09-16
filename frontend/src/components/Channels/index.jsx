import { useDispatch, useSelector } from 'react-redux';
import {
  setClickedChannel,
  setCurrentChannel,
  setCurrentModal,
} from '../../services/slices/uiSlice';
import ChannelsHeader from './ChannelsHeader';
import ChannelsBody from './ChannelsBody';
import ChatModal from '../ChatModal';
import { useGetChannelsQuery } from '../../services/api/channelsApi';

const Channels = () => {
  const { data } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const currentChannelName = useSelector(({
    ui,
  }) => ui.currentChannel.name ?? ui.defaultChannel.name);
  const { name: modalName, show: modalShow } = useSelector((state) => state.ui.currentModal);

  const channelsNames = data?.map(({ name }) => name);
  const handleModalHide = () => {
    dispatch(setCurrentModal({ name: '', show: false }));
  };
  const handleSetCurrentChannel = (name, id) => () => {
    dispatch(setCurrentChannel({ name, id }));
  };
  const handleAddChannel = () => {
    dispatch(setCurrentModal({ name: 'addChannel', show: true }));
  };
  const handleDeleteChannel = () => {
    dispatch(setCurrentModal({ name: 'deleteChannel', show: true }));
  };
  const handleRenameChannel = () => {
    dispatch(setCurrentModal({ name: 'renameChannel', show: true }));
  };
  const handleClickChannel = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('id');
    const name = e.currentTarget.getAttribute('name');
    dispatch(setClickedChannel({ name, id }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader onClickAddButton={handleAddChannel} />
      <ChannelsBody
        data={data}
        currentChannelName={currentChannelName}
        onClickChannel={handleClickChannel}
        onDeleteChannel={handleDeleteChannel}
        onRenameChannel={handleRenameChannel}
        onSetCurrentChannel={handleSetCurrentChannel}
      />
      <ChatModal
        name={modalName}
        show={modalShow}
        onHide={handleModalHide}
        validationData={channelsNames}
      />
    </div>
  );
};

export default Channels;
