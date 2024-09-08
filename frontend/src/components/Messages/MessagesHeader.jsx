const MessagesHeader = ({ countMessages, currentChannelName }) => (
  <div className="bg-light mb-4 p-3 shadow-sm small">
    <p className="m-0">
      <b>{`# ${currentChannelName}`}</b>
    </p>
    <span className="text-muted">{countMessages}</span>
  </div>
);

export default MessagesHeader;
