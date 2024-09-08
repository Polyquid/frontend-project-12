/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditChannelMutation } from '../../services/channelsApi';

const RenameChannelModal = ({ onHide, schemas: { renameChannelSchema } }) => {
  const [disabled, setDisabled] = useState(null);
  const innerRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const { id, name: clickedChannelName } = useSelector((state) => state.ui.clickedChannel);

  const handleRenameSubmit = async ({ name: newName }) => {
    setDisabled('true');
    await editChannel({ id, name: newName });
    setDisabled(null);
    onHide();
  };

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.focus();
    }
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: clickedChannelName,
        }}
        validationSchema={renameChannelSchema}
        onSubmit={handleRenameSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Modal.Body>
              <div className="form-floating">
                <Field
                  innerRef={innerRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required=""
                  placeholder="clickedChannelName"
                  id="name"
                  className={`form-control ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                />
                <label htmlFor="name">Новое имя канала</label>
                <ErrorMessage
                  component="div"
                  name="name"
                  className="invalid-feedback"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onHide} variant="secondary" disabled={disabled}>Отменить</Button>
              <Button type="submit" disabled={disabled}>Отправить</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameChannelModal;
