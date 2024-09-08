import Modal from 'react-bootstrap/Modal';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import AddChannelModal from './AddChannelModal';
import getAddChannelSchema from '../../utils/validation/getAddChannelSchema';
import getRenameChannelSchema from '../../utils/validation/getRenameChannelSchema';

const mapModal = {
  renameChannel: RenameChannelModal,
  deleteChannel: DeleteChannelModal,
  addChannel: AddChannelModal,
};

const ChatModal = ({
  name,
  show,
  onHide,
  validationData,
}) => {
  const schemas = {
    addChannelSchema: getAddChannelSchema(validationData ?? []),
    renameChannelSchema: getRenameChannelSchema(validationData ?? []),
  };

  const ModalBody = mapModal[name];
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody onHide={onHide} schemas={schemas} />
    </Modal>
  );
};

export default ChatModal;
