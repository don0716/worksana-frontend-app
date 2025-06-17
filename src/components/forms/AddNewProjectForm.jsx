import { useState } from "react";
import useAppData from "../../contexts/AppDataContext";

const AddNewProjectForm = () => {
    const {addProjects} = useAppData()
   const [projectFormData, setProjectFormData] = useState({
          name: "",
          description: ""
      })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProjects(projectFormData)

   setProjectFormData({name: "", description: ""})

  };

  return (
    <div>
      <h4>Create New Project</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectName" className="form-label">Project Name:</label>
        <input
          id="projectName"
          type="text"
          value={projectFormData.name}
          onChange={(e) => setProjectFormData(prev => ({...prev, name: e.target.value}))}
          className="form-control"
        />
        <label htmlFor="projectDescription" className="form-label mt-3">Project Description:</label>
        <textarea
          id="projectDescription"
          className="form-control"
          rows="4"
          value={projectFormData.description}
          onChange={(e) => setProjectFormData(prev => ({...prev, description: e.target.value }))}
        ></textarea>
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

export default AddNewProjectForm;
