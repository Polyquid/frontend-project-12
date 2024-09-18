import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteChannelMutation } from '../../store/api/channelsApi';
import getErrorTextI18n from '../../utils/getErrorTextI18n';

const DeleteChannelModal = ({ onHide }) => {
  const [disabled, setDisabled] = useState(null);
  const [deleteChannel] = useDeleteChannelMutation();
  const { id } = useSelector((state) => state.ui.clickedChannel);
  const { t } = useTranslation();

  const handleDeleteSubmit = async () => {
    setDisabled('on');
    const res = await deleteChannel(id);
    if (res.data) {
      toast.success(t('chat.notifications.remove'));
    } else {
      const textPathI18n = getErrorTextI18n(res);
      toast.error(t(textPathI18n));
    }
    setDisabled(null);
    onHide();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('chat.modals.remove.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead mb-0">
          {t('chat.modals.remove.description')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary" disabled={disabled}>
          {t('chat.modals.remove.cancel')}
        </Button>
        <Button onClick={handleDeleteSubmit} variant="danger" disabled={disabled}>
          {t('chat.modals.remove.submit')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteChannelModal;
