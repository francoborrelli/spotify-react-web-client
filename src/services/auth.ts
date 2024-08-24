import axios from '../axios';

import type { User } from '../interfaces/user';

const fetchUser = () => axios.get<User>('/me');

export const authService = {
  fetchUser,
};
