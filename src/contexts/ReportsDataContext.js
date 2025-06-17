import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext();
const useReport = () => useContext(ReportContext);
export default useReport;

export const ReportsProvider = ({ children }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [tasksCompletedLastWeek, setTasksCompletedLastWeek] = useState([]);
  const [tasksCompletedByTeam, setTasksCompletedByTeam] = useState([]);
  const [pendingWorkByProject, setPendingWorkByProject] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasksCompletedLastWeek();
    getTasksCompletedByTeam();
    getPendingWorkByProject();
  }, []);

  const getTasksCompletedLastWeek = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/report/last-week`);
      setTasksCompletedLastWeek(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
    }
  };
  const getTasksCompletedByTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/report/completed-by-team`);
      setTasksCompletedByTeam(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
    }
  };
  const getPendingWorkByProject = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/report/pending-work-by-project`);
      setPendingWorkByProject(res.data);
      console.log(res.data);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        getTasksCompletedByTeam,
        getPendingWorkByProject,
        getTasksCompletedLastWeek,
        tasksCompletedByTeam,
        pendingWorkByProject,
        tasksCompletedLastWeek,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
