import { useEffect, useRef } from 'react';

const MessagesBody = ({ currentMessages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const renderMessages = () => {
    if (!currentMessages) {
      return null;
    }
    return currentMessages.map(({ body, username, id }) => (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>
        {': '}
        {body}
      </div>
    ));
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className="chat-messages overflow-auto px-5 ">
      {renderMessages()}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesBody;
