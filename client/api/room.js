import axios from 'axios';

export const getRooms = async () => {
  return await axios.get('http://localhost:5000/api/room/'
  );
}

export const updateRoom = async (id, form) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/room/${id}`,
    form,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
export const deleteRoom = async (id) => {
  return await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/room/${id}`,
    {
      withCredentials: true,  
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};