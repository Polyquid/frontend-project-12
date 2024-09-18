/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import {
  setClickedChannel,
  setCurrentChannel,
  setCurrentModal,
} from '../../store/slices/uiSlice';
import ChannelsHeader from './ChannelsHeader';
import ChannelsBody from './ChannelsBody';
import ChatModal from '../ChatModal';
import { channelsApi, useGetChannelsQuery } from '../../store/api/channelsApi';
import SocketContext from '../../contexts';

const Channels = () => {
  const { data } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const currentChannelName = useSelector(({
    ui,
  }) => ui.currentChannel.name ?? ui.defaultChannel.name);
  const { name: modalName, show: modalShow } = useSelector((state) => state.ui.currentModal);
  const { currentChannel, clickedChannel, defaultChannel } = useSelector((state) => state.ui);
  const socket = useContext(SocketContext);

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

  useEffect(() => {
    const listenerNewChannelEvent = (newData) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(newData);
        }),
      );
    };
    const listenerRemoveChannelEvent = ({ id: removedId }) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter(({ id }) => id !== removedId)),
      );
      if (currentChannel.id === clickedChannel.id) {
        dispatch(setCurrentChannel(defaultChannel));
      }
    };
    const listenerRenameChannelEvent = (changedData) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((channel) => {
          if (channel.id === changedData.id) {
            return changedData;
          }
          return channel;
        })),
      );
      dispatch(setCurrentChannel(changedData));
    };
    socket.on('newChannel', listenerNewChannelEvent);
    socket.on('removeChannel', listenerRemoveChannelEvent);
    socket.on('renameChannel', listenerRenameChannelEvent);
    return () => {
      socket.off('newChannel', listenerNewChannelEvent);
      socket.off('removeChannel', listenerRemoveChannelEvent);
      socket.off('renameChannel', listenerRenameChannelEvent);
    };
  }, []);

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
