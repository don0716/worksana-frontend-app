import { useEffect, useState } from "react"
import useAppData from "../contexts/AppDataContext"
import { Modal } from "bootstrap/js/dist/modal"
import AddNewProjectForm from "../components/forms/AddNewProjectForm"
import AddNewTaskForm from "../components/forms/AddNewTaskForm"
import UserAvatar from "../components/UserAvatar"
import { Link } from "react-router-dom"
import Project from "./Project"
import LoadingUI from "../components/LoadingUI"


const Dashboard = () => {
    const {tasks, projects, setSearchInput, filter, setFilter, loading, error} = useAppData()

   

    useEffect(() => {
    const modalElement = document.getElementById("formModal");
    if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
    }
}, []); // run once on mount

//      function projectsJSX() {
//         return (
//              <section className="projectsUI my-2">

//                 <div className="d-flex justify-content-between align-items-center">
//                     <div className="d-flex align-items-center gap-2">
//                         <h2 className="mb-0">Projects</h2>
//                         {/* <select className="form-select" name="" id="">
//                             <option value="">--Select a filter--</option>
//                         </select> */}
//                     </div>
//                     <div>
//                         <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
//   data-bs-target="#addProjectModal">+ New Project</button>
//                     </div>
//                 </div>

                
//                     <div className="row my-2">
//                         {
//                             projects.map((proj) => (
//                                 <Link to={`/project/${proj._id}`} key={proj._id} className="col-md-4 my-2" style={{textDecoration: "none"}}>
//                                     <div className="card bg-light border-0">
//                                     <div className="card-body">
//                                         <div>
//                                             <span className="badge text-bg-success"></span>
//                                         </div>
//                                         <h5>{proj.name}</h5>
//                                         <p>{proj.description}</p>
//                                     </div>
//                                  </div>
//                                 </Link>
//                             ))
//                         }
//                     </div>
            


//             </section>
//         )
//     }

    function tasksJSX() {
        return (
             <section className="projectsUI my-2">

                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <h2 className="mb-0">Tasks</h2>
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
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                            + New Task
                            </button>
                    </div>
                </div>

                
                    <div className="row my-2">
                        {
                            tasks.map((task) => {
                                const statusColor = task.status === "To Do" ? "primary" : task.status === "In Progress" ? "success" : task.status === "Blocked" ? "danger" : "warning"
                                const dueDate = new Date(task.createdAt)
                                dueDate.setDate(dueDate.getDate() + task.timeToComplete)
                                return (
                                    <div key={task._id} className="col-md-4 my-2">
                                        <Link to={`/task/${task._id}`} className="card bg-light border-0" style={{textDecoration: "none"}}>
                                            <div className="card-body">
                                                <div>
                                                    <span className={`badge text-bg-${statusColor}`}>{task.status}</span>
                                                </div>
                                                <h5>{task.name}</h5>
                                                <i className="">Project: {task.project.name}</i>
                                                <p><small className="text-body-secondary">Due on: {dueDate.toLocaleDateString()}</small></p>
                                                
                                                <UserAvatar members={task.owners} />
                                                    
                                            </div>
                                        </Link>
                                   </div>
                                )
                            } )
                        }
                    </div>
            


            </section>
        )
    }
    


    return (
        <div className="container">

            

            <section className="searchJSX mb-3 my-4">
                <div className="input-group ">
                    <input onChange={(e) => setSearchInput(e.target.value)} className="form-control" type="text" placeholder="Search" />
                    <i className="bi bi-search input-group-text"></i>
                </div>
            </section>

            <div className="text-center my-2">
                {
                    loading && LoadingUI()
                }
            </div>
            

            {/* {projectsJSX()} */}
            {<Project isDashboardPage= {true} />}

            {tasksJSX()}                                                                                                                                

            {/* Modals */}
            <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                    <AddNewProjectForm />
                    </div>
                </div>
                </div>                 


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

export default Dashboard