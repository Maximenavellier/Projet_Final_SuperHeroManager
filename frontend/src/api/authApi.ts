import API from './axiosConfig';

export const loginUser = (credentials: any) => API.post('/auth/login', credentials);
export const registerUser = (credentials: any) => API.post('/auth/register', credentials);
export const fetchUsers = () => API.get('/auth/users');