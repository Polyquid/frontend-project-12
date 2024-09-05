const setAuthDataInLocalStorage = (token, username) => {
  if (localStorage.getItem('token') !== null) {
    localStorage.removeItem('token');
  }
  if (localStorage.getItem('username') !== null) {
    localStorage.removeItem('username');
  }
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
};

export default setAuthDataInLocalStorage;
