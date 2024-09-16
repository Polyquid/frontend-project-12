/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEditChannelMutation } from '../../services/channelsApi';
import getErrorTextI18n from '../../utils/getErrorTextI18n';

const RenameChannelModal = ({ onHide, validationData }) => {
  const [disabled, setDisabled] = useState(null);
  const innerRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const { id, name: clickedChannelName } = useSelector((state) => state.ui.clickedChannel);
  const { t } = useTranslation();

  const errorsTexts = {
    required: t('chat.modals.rename.form.errors.required'),
    length: t('chat.modals.rename.form.errors.required'),
    uniq: t('chat.modals.rename.form.errors.required'),
  };
  const handleRenameSubmit = async ({ name: newName }) => {
    setDisabled('true');
    const res = await editChannel({ id, name: newName });
    if (res.data) {
      toast.success(t('chat.notifications.rename'));
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
          {t('chat.modals.rename.title')}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: clickedChannelName,
        }}
        validationSchema={
          Yup.object({
            name: Yup.string()
              .min(3, errorsTexts.length)
              .max(20, errorsTexts.length)
              .notOneOf(validationData, errorsTexts.uniq)
              .required(errorsTexts.required),
          })
        }
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
                <label htmlFor="name">{t('chat.modals.rename.form.name')}</label>
                <ErrorMessage
                  component="div"
                  name="name"
                  className="invalid-feedback"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={onHide} variant="secondary" disabled={disabled}>{t('chat.modals.rename.form.cancel')}</Button>
              <Button type="submit" disabled={disabled}>{t('chat.modals.rename.form.submit')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RenameChannelModal;
