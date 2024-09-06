const isMessage = (data) => {
  if (data.body === undefined) {
    return false;
  }
  return true;
};

export default isMessage;
