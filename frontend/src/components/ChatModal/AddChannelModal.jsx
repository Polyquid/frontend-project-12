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
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../services/channelsApi';
import { setCurrentChannel } from '../../services/uiSlice';
import getErrorTextI18n from '../../utils/getErrorTextI18n';

const AddChannelModal = ({ onHide, schemas: { addChannelSchema } }) => {
  const [disabled, setDisabled] = useState(null);
  const innerRef = useRef(null);
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const changeToNewChannel = (channelName, id) => {
    dispatch(setCurrentChannel({ name: channelName, id }));
  };
  const handleAddSubmit = async (values) => {
    setDisabled('true');
    const res = await addChannel(values);
    if (res.data) {
      const { data: { name: channelName, id } } = res;
      toast.success(t('chat.notifications.add'));
      changeToNewChannel(channelName, id);
    } else {
      const textPathI18n = getErrorTextI18n(res);
      toast.error(t(textPathI18n));
    }
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
          {t('chat.modals.add.title')}
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
                  placeholder={t('chat.modals.add.form.name')}
                  id="name"
                  className={`form-control ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                />
                <label htmlFor="name">{t('chat.modals.add.form.name')}</label>
                <ErrorMessage
                  component="div"
                  name="name"
                  className="invalid-feedback"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onHide} variant="secondary" disabled={disabled}>{t('chat.modals.add.form.cancel')}</Button>
              <Button type="submit" disabled={disabled}>{t('chat.modals.add.form.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddChannelModal;
