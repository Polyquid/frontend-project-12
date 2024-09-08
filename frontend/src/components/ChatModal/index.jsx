import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const addErrorsTexts = {
    required: t('chat.modals.add.form.errors.required'),
    length: t('chat.modals.add.form.errors.length'),
    uniq: t('chat.modals.add.form.errors.uniq'),
  };
  const renameErrorsTests = {
    required: t('chat.modals.rename.form.errors.required'),
    length: t('chat.modals.rename.form.errors.required'),
    uniq: t('chat.modals.rename.form.errors.required'),
  };
  const schemas = {
    addChannelSchema: getAddChannelSchema(validationData ?? [], addErrorsTexts),
    renameChannelSchema: getRenameChannelSchema(validationData ?? [], renameErrorsTests),
  };

  const ModalBody = mapModal[name];
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody onHide={onHide} schemas={schemas} />
    </Modal>
  );
};

export default ChatModal;
