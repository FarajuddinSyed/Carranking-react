import React, { useState, useEffect } from "react";
import "./Login.css";
import Header from "./Header";
import Footer from "./Footer";
import users from "../users.json";
import loadingCircle from "../assets/loadingCircle.gif";
import Loadingcarranking from "../assets/carranking_Loading.gif";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [emptyUser, setEmptyUser] = useState(false);
  const [alreadyLoggedin, setAlreadyLoggedIn] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalid, setInvalid] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmpassword: ""
  });
  const handleRegister = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData({ ...formData, [key]: value });
  };


  const validationCheck = (data) => {
    if (!data.username) {
      setEmptyUser(true);
      setEmptyPassword(false);
      setInvalid(false)
      return false;
    }
    if (!data.password) {
      setEmptyUser(false);
      setEmptyPassword(true);
      setInvalid(false)
      return false;
    }
    if (!data.confirmpassword) {
        setEmptyUser(false);
        setEmptyPassword(true);
        setInvalid(false)
        return false;
      }
      if (data.confirmpassword !== data.password) {
        setEmptyUser(false);
        setEmptyPassword(false);
        setInvalid(true)
        return false;
      }
    setEmptyUser(false);
    setEmptyPassword(false);
    setInvalid(false)
    return true;
  };

  const register = async (formData) => {
    if (!validationCheck(formData)) {
      return;
    }
    setLoading(true);

    try {
       
      if (loggedUser === formData.username) {
        setFormData({
          username: "",
          password: "",
          confirmpassword: ""
        });
        setAlreadyLoggedIn(true);
        setFound(true);
        setNotFound(false);
        setLoading(false);
  
      } else {
        for (let i = 0; i < users.length; i++) {
          if (
            formData.username === users[i].username &&
            formData.password === users[i].password
          ) {
            setFound(true);
            setNotFound(false);
            setLoading(false)
            localStorage.clear()
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            
            setFound(false);
            setNotFound(true);
            setLoading(false);
         
           
                setFormData({
                    username: "",
                    password: "",
                    confirmpassword: ""
                  });
              
                    persistStorage(formData.username);
                    setTimeout(() => {
                        navigate("/home");
                      }, 2000);
                      
                
                      
          }
        }
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setShowSnackbar(true);
      setErrorMessage(e.message);
    }
  };
  if (showSnackbar === true) {
    setTimeout(() => {
      setShowSnackbar("false");
      setErrorMessage("");
    }, 3000);
  }
  const persistStorage = (username) => {
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, "3000");
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loadingScreen">
          <img className="loadingIcon" src={Loadingcarranking} alt="Loading" />
        </div>
      ) : (
        <>
          <div className="login-head">
            <Header />
          </div>
          <div className="login-body">
            <div className="welcome-note">
              <h1>
                Welcome to Car Rankings. The perfect place where you can find
                your New Top 3 Favorite Luxury Car brands
              </h1>
            </div>

            <div className="login-card register-card">
              <h1 className="login-heading">Register</h1>

              <div className="input-login">
                <input
                  placeholder=" "
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleRegister}
                  required
                />
                <label>Username</label>
              </div>

              <div className="input-login">
                <input
                  placeholder=" "
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleRegister}
                  required
                />
                <label>Password</label>
              </div>
              <div className="input-login">
                <input
                  placeholder=" "
                  type="password"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleRegister}
                  required
                />
                <label>Confirm Password</label>
              </div>
              <div className="submit-button">
                {loading ? (
                  <button className="login-button load spaced">
                    <img
                      className="loadingCircleGreen"
                      src={loadingCircle}
                      alt="..."
                    />
                  </button>
                ) : (
                  <button
                    className="login-button spaced"
                    onClick={() => {
                      register(formData);
                    }}
                  >
                    Register
                  </button>
                )}
                <>
                   <Link className="bottom-redirect" to="/">
                <div className="not-a-user">Already a User? Login</div>
                </Link>
              </>
              </div>

              <div className="displayCode">
                {emptyUser ? (
                  <p className="displayFailure">Username is a required field</p>
                ) : emptyPassword ? (
                  <p className="displayFailure">Password is a required field</p>
                ) : alreadyLoggedin ? (
                    <p className="displayLoggedIn">You are already Logged in!</p>
                  ) : found ? (
                  <p className="displayFailure">Username already exists!</p>
                ) : notFound === true ? (
                  <p className="displaySuccess">
                    Successfully created!
                  </p>
                ) :  invalid ?  <p className="displayFailure">Password must match</p> : (
                  <p></p>
                )}
              </div>
            </div>
            {showSnackbar === true ? (
              <div className="snackbar">{errorMessage}</div>
            ) : (
              <div className=""></div>
            )}
          </div>
          <div className="login-footer">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
