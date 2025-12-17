import axios from "axios";

export const login = async (form) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    form,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
