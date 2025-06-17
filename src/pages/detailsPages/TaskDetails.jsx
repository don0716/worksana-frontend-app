import { Link, useParams } from "react-router"
import useAppData from "../../contexts/AppDataContext"
import LoadingUI from "../../components/LoadingUI"

const TaskDetails = () => {
    const {tasks, updateTasks, loading, error} = useAppData()
    const {taskId} = useParams()
    const taskData = tasks?.find(task => task._id === taskId)
    const validStatuses = ["To Do", "In Progress", "Blocked"]

     if (!tasks.length) return <p>Loading...</p>

     const dueDate = new Date(taskData.createdAt)
     dueDate.setDate(dueDate.getDate() + taskData.timeToComplete)

    

    return (
        <div>

            <Link to={`/project/${taskData.project._id}`} style={{textDecoration: "none"}} className="text-color-primary "><strong>← Back to {taskData.project.name || "Project" } Overview</strong></Link>


            <h2>{taskData.name}</h2>

            <div className="row">
                <div className="col-md-6">
                    <div className="card border-0 bg-light" >
                        <div className="card-body">
                            <p><strong>Project: </strong> {taskData.project.name} </p>
                            <p><strong>Team: </strong> {taskData.team?.name ? taskData.team.name : <strong className="text-danger">Team Deleted</strong> } </p>
                            <p><strong>Owners: </strong> {taskData.owners?.map(owner => owner.name).join(", ")}</p>
                            <p><strong>Tags: </strong> {taskData.tags.map(tag => tag.name).join(", ")} </p>
                            <p><strong>Due Date: </strong> {dueDate.toLocaleDateString()} </p>
                            <hr />
                            {
                                loading ? LoadingUI() : (
                                    <p><strong>Status: </strong>{taskData.status}</p>
                                )
                            }
                            <p><strong>Time Remaining: </strong>{taskData.timeToComplete}</p>
                            {
                                taskData.status === "Completed" ? (
                                    <select onChange={(e) => updateTasks({status: e.target.value}, taskData._id) } className="form-select" name="statusChange" >
                                        <option hidden value=""  >Change Status</option>
                                        {
                                            validStatuses.map((status) => (
                                                <option value={status}>{status}</option>
                                            ))
                                        }
                                    </select>
                                ) : (
                                    <button onClick={() => updateTasks({status: "Completed"}, taskData._id) } className="btn btn-warning btn-sm">Mark as complete</button>
                                )
                            }
                        </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails