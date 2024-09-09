import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useAddMessageMutation } from '../../services/messagesApi';
import getLeoProfanityInstance from '../../utils/getLeoProfanityInstance';

const MessagesForm = ({ currentChannelId, username }) => {
  const [body, setBody] = useState('');
  const innerRef = useRef();
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();

  const filter = getLeoProfanityInstance();
  const handleSubmit = (channelId) => (e) => {
    e.preventDefault();
    const newMessage = {
      body: filter.clean(body),
      channelId,
      username,
    };
    addMessage(newMessage);
    setBody('');
  };

  useEffect(() => innerRef?.current?.focus());
  useEffect(() => setBody(''), [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1"
        onSubmit={handleSubmit(currentChannelId)}
      >
        <InputGroup>
          <Form.Control
            ref={innerRef}
            type="text"
            name="body"
            required=""
            placeholder={t('chat.messages.form.newMessage')}
            id="body"
            className="form-control"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <Button
            type="submit"
            className="btn btn-group-vertical"
            variant="outline-primary"
            disabled={body ? '' : 'on'}
          >
            →
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
