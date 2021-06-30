const authenticate = async (jwt) => {
  if (typeof window !== 'undefined') {
    await sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }
};

const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;
  if (sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt'));
  else return false;
};

export { authenticate, isAuthenticated };
