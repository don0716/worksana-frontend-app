import { useState } from "react"
import useAppData from "../../contexts/AppDataContext"
import useUser from "../../contexts/UserContext"

const AddNewTeamForm = () => {
    const initialState = {
        name: "",
        description: "",
        members: []
    }
    const [formData, setFormData] = useState(initialState)
    const {addTeam} = useAppData()
    const {users} = useUser()

    const inputHandler = (e) => {
        const {value, name, checked, type} = e.target

        if(type === "checkbox"){
            setFormData(prev => ({
                ...prev,
                [name]: checked ? [...prev[name], value ] : prev[name].filter(item => item !== value )
            }))
            return 
        }


        setFormData(prev => ({...prev, [name]: value}))


    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log(formData)
        await addTeam(formData)

        setFormData(initialState)
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="name" className="form-label">Team Name: </label>
                <input type="text" className="form-control" value={formData.name} onChange={inputHandler} id="name" name="name" />

                <label htmlFor="description" className="form-label">Desciption: </label>
                <textarea name="description" value={formData.description} id="description" onChange={inputHandler} className="form-control"></textarea>

                <label htmlFor="members" className="form-label" >Members: </label>

                {
                    users.map(user => (
                        <div key={user._id} className="form-check">
                            <input type="checkbox" className="form-check-input" name="members" value={user._id} id={user._id} onChange={inputHandler} checked={formData.members.includes(user._id)} />
                            <label htmlFor={user._id} className="form-check-label">{user.name}</label>
                        </div>
                    ))
                }
                

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
    )
}

export default AddNewTeamForm