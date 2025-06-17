import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const useUser = () => useContext(UserContext);
export default useUser;

export const UserProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users`);
      if (res.data) {
        setUsers(res.data.users);
        setLoading(false);
        setMessage(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      console.log(res);
      if (res.data.message === "User Registered") {
        setLoading(false);
        setMessage(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, loading, registerUser, message, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
