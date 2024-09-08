import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeleteChannelMutation } from '../../services/channelsApi';

const DeleteChannelModal = ({ onHide }) => {
  const [disabled, setDisabled] = useState(null);
  const [deleteChannel] = useDeleteChannelMutation();
  const { id } = useSelector((state) => state.ui.clickedChannel);

  const handleDeleteSubmit = async () => {
    setDisabled('true');
    await deleteChannel(id);
    setDisabled(null);
    onHide();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead mb-0">
          Уверены?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary" disabled={disabled}>
          Отменить
        </Button>
        <Button onClick={handleDeleteSubmit} variant="danger" disabled={disabled}>
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DeleteChannelModal;
