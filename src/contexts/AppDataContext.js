import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppDataContext = createContext();
const useAppData = () => useContext(AppDataContext);
export default useAppData;

export const TaskProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState({
    status: "",
    validStatuses: ["To Do", "In Progress", "Completed", "Blocked"],
  });

  useEffect(() => {
    getTeams();
    getTags();
    getTeams();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      getTasks();
      getProjects();
    }, 600); // wait 500 ms after user stops typing
    return () => clearTimeout(delay); //clear previous timeout if searchInput changes before 500ms
  }, [searchInput]);

  useEffect(() => {
    if (!searchInput) {
      getTasks();
      getProjects();
    }
  }, []);

  useEffect(() => {
    filterQuery();
  }, [filter]);

  const getTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/teams`);
      if (res.data) {
        setTeams(res.data.teams);
        setMessage(res.data.message);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage("Error");
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };
  const addTeam = async (newTeam) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/teams`, newTeam);
      if (res.data.message) {
        setLoading(false);
        setMessage(res.data.message);
        await getTeams();
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };
  const updateTeam = async (userId, teamId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/teams/${teamId}`, userId);
      if (res.data.message) {
        setLoading(false);
        await getTeams();
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/tasks?search=${searchInput}`);
      if (res.data) {
        setTasks(res.data.tasks);
        setMessage(res.data.message);
      } else {
        setMessage("Error");
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };
  const addTasks = async (newTask) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/tasks`, newTask);
      if (res.data.message) {
        setLoading(false);
        await getTasks();
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };
  const updateTasks = async (updatedTask, taskId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
      if (res.data.message) {
        setLoading(false);
        await getTasks();
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/projects?search=${searchInput}`);
      if (res.data) {
        setProjects(res.data.projects);
        setMessage(res.data.message);
      } else {
        setMessage("Error");
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };
  const addProjects = async (newProject) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/projects`, newProject);
      if (res.data.message) {
        setLoading(false);
        await getProjects();
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.get(`${API_URL}/tags`);
      if (res.data) {
        setTags(res.data.tags);
        setMessage(res.data.message);
      } else {
        setMessage("Error");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const filterQuery = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append("status", filter.status);
      const res = await axios.get(`${API_URL}/tasks?${params.toString()}`);
      setTasks(res.data.tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        loading,
        error,
        tasks,
        projects,
        teams,
        tags,
        setSearchInput,
        filter,
        setFilter,
        addProjects,
        addTasks,
        updateTasks,
        updateTeam,
        addTeam,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
