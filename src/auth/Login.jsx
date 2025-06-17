import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false)
  const navigate = useNavigate()

  // Check localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [navigate]);

  // Fetch only if logged in
  const { data, error } = useFetch(
    isLoggedIn ? `${API_URL}/admin/api/data` : null
  );
  console.log("error",error)
  console.log("data:: " ,data)

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData((prevVal) => ({ ...prevVal, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
        const password = formData.password;
        const email = formData.email
        
        if(isUserLogin) {
          const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            console.log(res)
            if (data.token) {
            localStorage.setItem("adminToken", data.token);
            setIsLoggedIn(true);
            navigate(`/`)
            } else {
            alert("Invalid secret");
            }

        } else {
          const res = await fetch(`${API_URL}/admin/api/data`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.token) {
            localStorage.setItem("adminToken", data.token);
            setIsLoggedIn(true);
            navigate(`/`)
            } else {
            alert("Invalid secret");
            }
        }

        

        
    
    } catch(error) {
        console.error("Fetch error: ", error)
        alert("Something went wrong while logging in.")
    }
    
  };

  return (
    <div className="container">
      <h1>Login to your account</h1>
      <p>Please Enter your Details.</p>
      
      <div class="form-check form-switch">
      <input onChange={(e) => e.target.checked ? setIsUserLogin(true) : setIsUserLogin(false)} class="form-check-input toggle-switch" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
      <label class="form-check-label" for="flexSwitchCheckDefault">Switch To {!isUserLogin ? "User Login" : "Admin Login"}</label>
    </div>

    <h4 className="py-2">{isUserLogin ? "User Login" : "Admin Login"}</h4>


      <div className="row">
        <div className="col-md-6">
          {
        isUserLogin ? (
              <form onSubmit={handleLogin}>
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  onChange={onChangeHandler}
                />
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form-control"
                  name="password"
                  type="text"
                  onChange={onChangeHandler}
                />
                <button className="btn btn-primary my-2" type="submit">
                  Sign In
                </button>
          </form>
        ): (
          <form onSubmit={handleLogin}>
        <label className="form-label" htmlFor="password">
          Password:
        </label>
        <input
          className="form-control"
          name="password"
          type="text"
          onChange={onChangeHandler}
        />
           <button className="btn btn-primary my-2" type="submit">
          Sign In
        </button>
          
      </form>
        )
      }
        </div>
      </div>

      <div className="d-flex align-items-center">
        <p className="text-secondary px-2">Not a user? </p>
         <Link to={`/register`} className="btn btn-secondary btn-sm my-2">Sign Up</Link>
      </div>

      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoggedIn && data && (
        <div className="alert alert-success mt-3">
          <strong>Protected Message:</strong> {data.message}
        </div>
      )}
    </div>
  );
};

export default Login;
