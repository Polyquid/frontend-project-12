import { useEffect, useRef } from 'react';

const MessagesBody = ({ currentMessages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className="chat-messages overflow-auto px-5 ">
      {currentMessages?.map(({ body, username, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          {': '}
          {body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesBody;
