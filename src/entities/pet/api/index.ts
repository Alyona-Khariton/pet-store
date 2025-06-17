import axios from '@shared/api/AxiosInstance';
import { Status, Pet } from '@entities/pet/model';

export const findByStatus = async (status: Status) => {
  const searchParams = new URLSearchParams();

  searchParams.append('status', status.toString());

  const response = await axios.get(`pet/findByStatus?${searchParams}`);
  return response.data.map((item: Pet, index: number) => ({
    ...item,
    rowId: `${index}-${item.id}`,
  }));
};

export const getPetById = async (id: number) => {
  const response = await axios.get(`pet/${id}`);

  return response.data;
};
