import { Link, useParams } from "react-router"
import useAppData from "../../contexts/AppDataContext"
import UserAvatar from "../../components/UserAvatar"
import AddNewTaskForm from "../../components/forms/AddNewTaskForm"
import LoadingUI from "../../components/LoadingUI"

const ProjectDetails = () => {
    const {projectId} = useParams()
    const {projects, tasks, filter, setFilter, loading, error} = useAppData()
    const projectData = projects?.find(proj => proj._id === projectId)
    const projectTasks = tasks?.filter(task => task.project._id === projectData._id )
    

     if (!projects.length || !tasks.length) return <p>Loading...</p>



    return (
        <div>

            <Link to={`/project`} style={{textDecoration: "none"}} className="text-color-primary "><strong>← Back to Projects Overview</strong></Link>

            <h2>{projectData.name}</h2>
            <p>{projectData.description}</p>

            <div className="py-2">

                <div className="d-flex justify-content-between align-items-center">
                    {/* <p>Sort By: </p> */} <p></p>
                <div className="d-flex">
                    <select onChange={(e) => setFilter(prev => ({...prev, status: e.target.value }) )} className="form-select" name="" id="">
                            <option hidden value="">--Select a filter--</option>
                            <option value="">All</option>
                            {
                                filter.validStatuses.map(status => (
                                    <option key={status} value={status} >
                                        {status}
                                    </option>
                                ))
                            }
                        </select>
                    <button className="btn btn-primary btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                            + New Task
                            </button>
                </div>
                </div>


            </div>

                {
                    loading ? (
                        <div  className="text-center my-2">
                                {
                                    loading && LoadingUI()
                                }
                                {
                                    error && (
                                        <div>
                                            {error}
                                        </div>
                                    )
                                }
                            </div>
                    ) : (
                         <table className="table table-bordered align-middle" >
                <thead className="table-light">
                    <tr>
                    <th>#</th>
                    <th>TASKS</th>
                    <th>OWNER</th>
                    <th>PRIORITY</th>
                    <th>DUE ON</th>
                    <th>STATUS</th>
                    <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {projectTasks.map((task, index) => {
                        const dueDate = new Date(task.createdAt)
                         dueDate.setDate(dueDate.getDate() + task.timeToComplete)
                        return (
                    <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>{task.name}</td>

                        {/* Owners */}
                        <td>
                            <UserAvatar members={task.owners} />
                        </td>

                        {/* Priority */}
                        <td>
                        <span className={`badge rounded-pill px-3 py-2 
                            ${task.priority === "High" ? "bg-danger text-white" : ""}
                            ${task.priority === "Medium" ? "bg-primary text-white" : ""}
                            ${task.priority === "Low" ? "bg-secondary text-white" : ""}
                        `}>
                            {task.priority || "—"}
                        </span>
                        </td>

                        {/* Due Date */}
                        <td>
                        {dueDate.toLocaleDateString()}
                        </td>

                        {/* Status */}
                        <td>
                        <span className={`badge rounded-pill px-3 py-2
                            ${task.status === "Completed" ? "bg-success" : ""}
                            ${task.status === "In Progress" ? "bg-warning text-dark" : ""}
                            ${task.status === "Pending" ? "bg-secondary" : ""}
                            ${task.status === "To Do" ? "bg-primary" : ""}
                        `}>
                            {task.status}
                        </span>
                        </td>

                        {/* Arrow Button */}
                        <td>
                        <Link to={`/task/${task._id}`} style={{textDecoration: "none"}}>
                            →
                        </Link>
                        </td>
                    </tr>
                    )
                    } )}
                </tbody>
                </table>
                    )
                }

           




            <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-3">
                                <AddNewTaskForm />
                                </div>
                            </div>
                            </div>
                        
        </div>
    )
}

export default ProjectDetails