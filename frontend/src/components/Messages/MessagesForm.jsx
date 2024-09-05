// import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MessagesForm = ({ currentChannelId }) => {
  console.log(currentChannelId);
  // const [body, setBody] = useState('');
  return (
    <div className="mt-auto px-5 py-3">
      <Form
        className="py-1 border rounded-2"
      >
        <InputGroup>
          <Form.Control
            type="text"
            name="body"
            required=""
            placeholder="Введите сообщение..."
            id="body"
            className="form-control"
          />
          <Button className="btn btn-group-vertical" variant="outline-primary">
            →
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;
