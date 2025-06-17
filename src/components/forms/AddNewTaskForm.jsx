import { useState } from "react";
import useUser from "../../contexts/UserContext";
import useAppData from "../../contexts/AppDataContext";

const AddNewTaskForm = () => {
    const {addTasks, teams, projects, tags, filter} = useAppData()
    const {users} = useUser()
    const initialState = {
        name: "",
          project: "", //project id's
          team: "", //team id's
          owners: [], //users id's
          tags: [],
          timeToComplete: "", 
          status: "",
    }
   const [taskFormData, setTaskFormData] = useState(initialState)

      const inputHandler = (e) => {
        const {name, value, type, checked} = e.target

        if(type === "checkbox") {
            setTaskFormData((prev) => ({
                ...prev,
                [name]: checked ? [...prev[name], value] : prev[name].filter(item => item !== value)
            }))
            return;
        }

        setTaskFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))

      }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(taskFormData)

    addTasks(taskFormData)
    

   setTaskFormData(initialState)

  };

  return (
    <div>
      <h4>Create New Project</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName" className="form-label">Task Name:</label>
        <input
          id="taskName"
          type="text"
          value={taskFormData.name}
          onChange={inputHandler}
          className="form-control"
          name="name"
        />

        <label htmlFor="projectId" className="form-label">Project:</label>
        <select name="project" value={taskFormData.project} className="form-select" id="projectId" onChange={inputHandler}>
            <option hidden value="">--Select a Project--</option>
            {
                projects?.map((project) => (
                    <option key={project._id} value={project._id}>
                        {project.name}
                    </option>
                ))
            }
        </select>

        <label htmlFor="teamId" className="form-label">Team:</label>
        <select name="team" value={taskFormData.team} className="form-select" id="teamId" onChange={inputHandler}>
            <option hidden value="">--Select a Team--</option>
            {
                teams.map((team) => (
                    <option key={team._id} value={team._id}>
                        {team.name}
                    </option>
                ))
            }
        </select>

        <label htmlFor="owners" className="form-label">Owners:</label>
        {
            users?.map(user => (
                <div key={user._id} className="form-check">
                    <input className="form-check-input" type="checkbox" name="owners" value={user._id} id={user._id} onChange={inputHandler} checked={taskFormData.owners.includes(user._id)}  /> 
                    <label className="form-check-label" htmlFor={user._id}>
                    {user.name}
                  </label>
                </div>
            ))
        }

        <label htmlFor="tags" className="form-label">Tags:</label>
        {
            tags?.map(tag => (
                <div key={tag._id} className="form-check">
                    <input className="form-check-input" type="checkbox" name="tags" value={tag._id} id={tag._id} onChange={inputHandler} checked={taskFormData.tags.includes(tag._id)}  /> 
                    <label className="form-check-label" htmlFor={tag._id}>
                    {tag.name}
                  </label>
                </div>
            ))
        }

        <label htmlFor="timeToComplete" className="form-label">Time To Complete:</label>
        <input
          id="timeToComplete"
          type="number"
          value={taskFormData.timeToComplete}
          onChange={inputHandler}
          className="form-control"
          name="timeToComplete"
        />

        <label htmlFor="status" className="form-label">Status:</label>
        <select name="status" value={taskFormData.status} className="form-select" id="status" onChange={inputHandler}>
            <option hidden value="">--Select a Status--</option>
            {
                filter.validStatuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))
            }
        </select>
        
        <hr />
        <div className="d-flex justify-content-between">
          <div></div>
          <div className="d-flex">
            <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewTaskForm;
