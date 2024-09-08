const MessagesBody = ({ currentMessages }) => {
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

  return (
    <div className="chat-messages overflow-auto px-5 ">
      {renderMessages()}
    </div>
  );
};

export default MessagesBody;
