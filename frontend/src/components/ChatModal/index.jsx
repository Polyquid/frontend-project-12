import Modal from 'react-bootstrap/Modal';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import AddChannelModal from './AddChannelModal';

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
  const ModalBody = mapModal[name] ?? (() => null);
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody onHide={onHide} validationData={validationData} />
    </Modal>
  );
};

export default ChatModal;
