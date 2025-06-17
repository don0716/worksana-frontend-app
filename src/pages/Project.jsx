import useAppData from "../contexts/AppDataContext"
import { Link, useLocation } from "react-router"
import AddNewProjectForm from '../components/forms/AddNewProjectForm'
import ProtectedRoute from "../auth/ProtectedRoute"
import { useFetch } from "../hooks/useFetch"
import LoadingUI from "../components/LoadingUI"

const Project = ({isDashboardPage = false}) => {
    const {projects, loading, error} = useAppData()
    const pageDetail = useLocation()
    
     



    return (
        <div className="">
            {
                pageDetail.pathname === "/project" && (
                    <Link to={`/`} style={{textDecoration: "none"}} className="text-color-primary "><strong>← Back to Dashboard</strong></Link>
                )
            }

            {
                !isDashboardPage && (
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
                )
            }

            <section className="projectsUI my-2">

                    <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <h2 className="mb-0">Projects</h2>
                        {/* <select className="form-select" name="" id="">
                            <option value="">--Select a filter--</option>
                        </select> */}
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm" data-bs-toggle="modal"
  data-bs-target="#addProjectModal">+ New Project</button>
                    </div>
                </div>

                
                    <div className="row my-2">
                        {
                            projects.map((proj) => (
                                <Link to={`/project/${proj._id}`} key={proj._id} className="col-md-4 my-2" style={{textDecoration: "none"}}>
                                    <div className="card bg-light border-0">
                                    <div className="card-body">
                                        <div>
                                            <span className="badge text-bg-success"></span>
                                        </div>
                                        <h5>{proj.name}</h5>
                                        <p>{proj.description}</p>
                                    </div>
                                 </div>
                                </Link>
                            ))
                        }
                    </div>
            


            </section>


            {/* Modals */}
                        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-3">
                                <AddNewProjectForm />
                                </div>
                            </div>
                            </div>      
        </div>
    )
}

export default Project