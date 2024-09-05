import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../../services/uiSlice';
import ChannelsHeader from './ChannelsHeader';
import ChannelsBody from './ChannelsBody';

const Channels = ({ data }) => {
  const dispatch = useDispatch();
  const currentChannelName = useSelector((state) => state.ui.currentChannel.name);
  const handleClick = (name, id) => () => {
    dispatch(setCurrentChannel({ name, id }));
  };
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelsHeader />
      <ChannelsBody data={data} currentChannelName={currentChannelName} handleClick={handleClick} />
    </div>
  );
};

export default Channels;
