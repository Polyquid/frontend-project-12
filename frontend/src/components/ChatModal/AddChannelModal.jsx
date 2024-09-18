/* eslint-disable jsx-a11y/label-has-associated-control */
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useAddChannelMutation } from '../../store/api/channelsApi';
import { setCurrentChannel } from '../../store/slices/uiSlice';
import getErrorTextI18n from '../../utils/getErrorTextI18n';
import getLeoProfanityInstance from '../../utils/getLeoProfanityInstance';

const AddChannelModal = ({ onHide, validationData }) => {
  const innerRef = useRef(null);
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();

  const errorsTexts = {
    required: t('chat.modals.add.form.errors.required'),
    length: t('chat.modals.add.form.errors.length'),
    uniq: t('chat.modals.add.form.errors.uniq'),
  };
  const filter = getLeoProfanityInstance();
  const changeToNewChannel = (channelName, id) => {
    dispatch(setCurrentChannel({ name: channelName, id }));
  };
  const handleAddSubmit = async ({ name }) => {
    const res = await addChannel({ name: filter.clean(name) });
    if (res.data) {
      const { data: { name: channelName, id } } = res;
      toast.success(t('chat.notifications.add'));
      changeToNewChannel(channelName, id);
    } else {
      const textPathI18n = getErrorTextI18n(res);
      toast.error(t(textPathI18n));
    }
    onHide();
  };
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, errorsTexts.length)
        .max(20, errorsTexts.length)
        .notOneOf(validationData, errorsTexts.uniq)
        .required(errorsTexts.required),
    }),
    onSubmit: handleAddSubmit,
  });

  useEffect(() => {
    innerRef?.current?.focus();
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('chat.modals.add.title')}
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
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('chat.modals.add.form.name')}
              id="name"
              className={classNames('form-control', { 'is-invalid': !!formik.errors.name })}
            />
            <label htmlFor="name">{t('chat.modals.add.form.name')}</label>
            {formik.errors.name && <div className="invalid-feedback">{`${formik.errors.name}`}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary" disabled={formik.isSubmitting}>{t('chat.modals.add.form.cancel')}</Button>
          <Button type="submit" disabled={formik.isSubmitting}>{t('chat.modals.add.form.submit')}</Button>
        </Modal.Footer>
      </form>
    </>
  );
};

export default AddChannelModal;
