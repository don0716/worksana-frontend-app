import { useState } from "react"
import useUser from "../contexts/UserContext"
import { Link } from "react-router"

const SignUp = () =>{
    const initialFormValue = {name: "", email: "", password: ""}
    const [formData, setFormData] = useState(initialFormValue)
    const {registerUser} = useUser()

    const inputHandler = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({...prev, [name]: value }) )
        
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        await registerUser(formData)
        
        setFormData(initialFormValue)
    }


    return (
        <div className="container">
            <h2>Register a User</h2>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={registerHandler}>
                        <label htmlFor="name" className="form-label" >Name:</label>
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={inputHandler} />
                        <label htmlFor="email" className="form-label" >Email:</label>
                        <input type="text" name="email" value={formData.email} onChange={inputHandler} className="form-control" />
                        <label htmlFor="password" className="form-label" >Name:</label>
                        <input type="text" name="password" value={formData.password} onChange={inputHandler} className="form-control" />
                                <button type="submit" className="btn btn-primary my-2">
                                Sign Up
                                </button>
                               
                    </form>

                    <div className="d-flex align-items-center">
                    <p className="text-secondary px-2">Not a user? </p>
                    <Link to={`/login`} className="btn btn-secondary btn-sm my-2">Sign In</Link>
                </div>

                    
            
                </div>
            </div>
        </div>
    )
}

export default SignUp