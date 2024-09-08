import Button from 'react-bootstrap/esm/Button';

const ChannelsHeader = ({ handleClick }) => (
  <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-3">
    <b>Каналы</b>
    <Button variant="outline-primary" size="sm" className="mx-1" onClick={handleClick}>+</Button>
  </div>
);

export default ChannelsHeader;
