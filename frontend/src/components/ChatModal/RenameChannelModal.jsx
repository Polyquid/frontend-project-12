/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useEditChannelMutation } from '../../services/api/channelsApi';
import getErrorTextI18n from '../../utils/getErrorTextI18n';

const RenameChannelModal = ({ onHide, validationData }) => {
  const innerRef = useRef(null);
  const [editChannel] = useEditChannelMutation();
  const { id, name: clickedChannelName } = useSelector((state) => state.ui.clickedChannel);
  const { t } = useTranslation();

  const errorsTexts = {
    required: t('chat.modals.rename.form.errors.required'),
    length: t('chat.modals.rename.form.errors.length'),
    uniq: t('chat.modals.rename.form.errors.uniq'),
  };
  const handleRenameSubmit = async ({ name: newName }) => {
    const res = await editChannel({ id, name: newName });
    if (res.data) {
      toast.success(t('chat.notifications.rename'));
    } else {
      const textPathI18n = getErrorTextI18n(res);
      toast.error(t(textPathI18n));
    }
    onHide();
  };
  const formik = useFormik({
    initialValues: {
      name: clickedChannelName,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, errorsTexts.length)
        .max(20, errorsTexts.length)
        .notOneOf(validationData, errorsTexts.uniq)
        .required(errorsTexts.required),
    }),
    onSubmit: handleRenameSubmit,
  });

  useEffect(() => {
    innerRef?.current?.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('chat.modals.rename.title')}
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-floating">
            <input
              ref={innerRef}
              type="text"
              name="name"
              autoComplete="name"
              required=""
              placeholder="clickedChannelName"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className={classNames('form-control', { 'is-invalid': !!formik.errors.name })}
            />
            <label htmlFor="name">{t('chat.modals.rename.form.name')}</label>
            {formik.errors.name && <div className="invalid-feedback">{`${formik.errors.name}`}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary" disabled={formik.isSubmitting}>{t('chat.modals.rename.form.cancel')}</Button>
          <Button type="submit" disabled={formik.isSubmitting}>{t('chat.modals.rename.form.submit')}</Button>
        </Modal.Footer>
      </form>
    </>
  );
};

export default RenameChannelModal;
