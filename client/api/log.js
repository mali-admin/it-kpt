import axios from 'axios';

export const getLogs = async () => {
  return await axios.get('http://localhost:5000/api/log'
  );
}
export const createLog = async (form) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/logs`,
    form,
    {
      withCredentials: true,
        headers: {
        "Content-Type": "application/json"
        }
    }
  );
};