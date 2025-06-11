import axios from '../../api/AxiosInstance';
import { LoginFields } from '../model';

export const login = async ({ username, password }: LoginFields) => {
  const searchParams = new URLSearchParams();

  searchParams.append('username', username.toString());
  searchParams.append('password', password.toString());

  const response = await axios.get(`/user/login?${searchParams}`);
  return response.data;
};