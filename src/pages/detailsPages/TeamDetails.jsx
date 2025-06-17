import { useParams, Link } from "react-router"
import useAppData from "../../contexts/AppDataContext"
import UserAvatar from "../../components/UserAvatar"
import useUser from "../../contexts/UserContext"
import LoadingUI from "../../components/LoadingUI"

const TeamDetails = () => {
    const {teamId} = useParams()
    const {teams, updateTeam, loading, error} = useAppData()
    const {users} = useUser()
    const teamData = teams?.find(team => team._id === teamId)

    const teamMemberIds = teamData?.members?.map(member => member._id) || [];
    const usersNotInTeam = users.filter(user => !teamMemberIds.includes(user._id));

    console.log("users", users)
    console.log("userNotInTGeam", usersNotInTeam)

    console.log("TEamData:: ", teamData)

    if (!teams.length ) return <p>Loading...</p>


    return (
        <div>
            
            
            <div className="">

                <Link to={`/teams`} style={{textDecoration: "none"}} className="text-color-primary "><strong>← Back to Teams</strong></Link>
                
                            <h3 className="mt-4">{teamData.name}</h3>
                            {/* <p><strong>Description: </strong>{teamData.description}</p> */}
                            
                            <p>
                                <span className="text-secondary px-5"><strong>MEMBERS </strong></span>
                                <ol>
                                    {teamData.members.map((user) => (
                                    <li key={user._id} className="d-flex align-items-center">
                                        <span className="px-2">{<UserAvatar members={[user]} />}</span>  {user.name}
                                        
                                    </li>
                                ))}
                                </ol>
                            </p>
                           <div className="row">
                             <div className="text-center my-2 col-md-4">
                                        {
                                            loading && LoadingUI()
                                        }
                                    </div>
                           </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <select onChange={(e) => updateTeam({memberId: e.target.value}, teamData._id) } name="" id="" className="form-select">
                                    <option value="">---Add Member to Team---</option>
                                    {
                                        usersNotInTeam.map(user => (
                                            <option key={user._id} value={user._id}>
                                                {user.name}
                                            </option>
                                        ))
                                    }
                                    
                                </select>
                                </div>
                            </div>
                        
            </div>



        </div>
    )
}

export default TeamDetails