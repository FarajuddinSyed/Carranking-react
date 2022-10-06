import React, { useState, useEffect } from "react";
import "./Login.css";
import Header from "./Header";
import Footer from "./Footer";
import users from "../users.json";
import loadingCircle from "../assets/loadingCircle.gif";
import Loadingcarranking from "../assets/carranking_Loading.gif";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setFormData({ ...formData, [key]: value });
  };

  const validationCheck = (data) => {
    if (!data.username) {
      setEmptyUser(true);
      setEmptyPassword(false);
      return false;
    }
    if (!data.password) {
      setEmptyUser(false);
      setEmptyPassword(true);
      return false;
    }
    setEmptyUser(false);
    setEmptyPassword(false);
    return true;
  };

  const login = async (formData) => {
    if (!validationCheck(formData)) {
      return;
    }
    setLoading(true);

    try {
      if (loggedUser === formData.username) {
        setFormData({
          username: "",
          password: "",
        });
        setAlreadyLoggedIn(true);
        setFound(false);
        setNotFound(false);
        setLoading(false);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        for (let i = 0; i < users.length; i++) {
          if (
            formData.username === users[i].username &&
            formData.password === users[i].password
          ) {
            setFormData({
              username: "",
              password: "",
            });
            setFound(true);
            setNotFound(false);
            setLoading(false);

            persistStorage(formData.username);
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          } else {
            setFound(false);
            setNotFound(true);
            setLoading(false);
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

            <div className="login-card">
              <h1 className="login-heading">Login</h1>

              <div className="input-login">
                <input
                  placeholder=" "
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleLogin}
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
                  onChange={handleLogin}
                  required
                />
                <label>Password</label>
              </div>
              <div className="submit-button">
                {loading ? (
                  <button className="login-button load">
                    <img
                      className="loadingCircleGreen"
                      src={loadingCircle}
                      alt="..."
                    />
                  </button>
                ) : (
                  <button
                    className="login-button"
                    onClick={() => {
                      login(formData);
                    }}
                  >
                    Login
                  </button>
                )}
                <>
                <Link className="bottom-redirect" to="/register">
                <div className="not-a-user">Not a user? Register account</div>
                </Link>
              </>
              </div>
              

              <div className="displayCode">
                {emptyUser ? (
                  <p className="displayFailure">Username is a required field</p>
                ) : emptyPassword ? (
                  <p className="displayFailure">Password is a required field</p>
                ) : found ? (
                  <p className="displaySuccess">Successfully logged in!</p>
                ) : notFound ? (
                  <p className="displayFailure">
                    Invalid Username or Password!
                  </p>
                ) : alreadyLoggedin ? (
                  <p className="displayLoggedIn">You are already Logged in!</p>
                ) : (
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

export default Login;
