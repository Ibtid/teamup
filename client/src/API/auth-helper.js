import { signout } from './auth';

const auth = {
  authenticate(jwt) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
    }
  },
};

export default auth;
