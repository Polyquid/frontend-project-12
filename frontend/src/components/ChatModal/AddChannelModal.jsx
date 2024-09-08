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
import { useDispatch } from 'react-redux';
import { useAddChannelMutation } from '../../services/channelsApi';
import { setCurrentChannel } from '../../services/uiSlice';

const AddChannelModal = ({ onHide, schemas: { addChannelSchema } }) => {
  const [disabled, setDisabled] = useState(null);
  const innerRef = useRef(null);
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();

  const changeToNewChannel = (channelName, id) => {
    dispatch(setCurrentChannel({ name: channelName, id }));
  };
  const handleAddSubmit = async (values) => {
    setDisabled('true');
    const { data: { name: channelName, id } } = await addChannel(values);
    setDisabled(null);
    changeToNewChannel(channelName, id);
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
          name: '',
        }}
        validationSchema={addChannelSchema}
        onSubmit={handleAddSubmit}
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
                  placeholder="Имя канала"
                  id="name"
                  className={`form-control ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                />
                <label htmlFor="name">Имя канала</label>
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

export default AddChannelModal;
