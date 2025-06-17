import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const useUser = () => useContext(UserContext);
export default useUser;

export const UserProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data.users);
      console.log(res);
    } catch (error) {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      console.log(res);
      if (res.data.message === "User Registered") {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
