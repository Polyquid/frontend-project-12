const resetAuthDataInLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

export default resetAuthDataInLocalStorage;
