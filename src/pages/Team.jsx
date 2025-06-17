
import { Link } from "react-router";
import AddNewTeamForm from "../components/forms/AddNewTeamForm"
import UserAvatar from "../components/UserAvatar";
import useAppData from "../contexts/AppDataContext"
import LoadingUI from "../components/LoadingUI";
const Team = () => {
    const {teams, loading, error} = useAppData()
    
    return (
        <div>
            <Link to={`/`} style={{textDecoration: "none"}} className="text-color-primary "><strong>← Back to Dashboard</strong></Link>
            <div className="text-center my-2">
                {
                    loading && LoadingUI()
                }
            </div>
            <section>
                <div className="d-flex justify-content-between">
                    <h4>Teams</h4>
                    <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addTaskModal">+ New Team</button>
                </div>
            </section>

            <section>

                <div className="row">
                    {
                    teams.map(team => (
                        <Link to={`/teams/${team._id}`} key={team._id} className="col-md-4" style={{textDecoration: "none"}}>
                            <div className="card bg-light my-2 border-0">

                            <div className="card-body">
                                <p><strong>{team.name}</strong></p>
                                 <p className="text-secondary">{team.description}</p>

                                <div className="d-flex align-items-center mt-2">
                                    <div className="d-flex">
                                        <UserAvatar members={team.members} />
                                    </div>
                                </div>
                                
                               



                            </div>
                            
                        </div>
                        </Link>
                    ))
                }
                </div>

            </section>





            <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">
                    <AddNewTeamForm/>
                    </div>
                </div>
                </div>    
        </div>
    )
}

export default Team