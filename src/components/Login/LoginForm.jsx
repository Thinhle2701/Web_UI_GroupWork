import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import jwt_decode from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import greenTick from "../../assets/greenTick.png";
const api = axios.create({
  baseURL: `http://localhost:8000/api/user`,
});
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const successStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "100px",
    backgroundColor: "white",
    borderColor: "green",
  },
};

const unsuccessStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "100px",
    backgroundColor: "white",
    borderColor: "red",
  },
};
function LoginModal({
  setOpenModal,
  setLoginUser,
  setSuccessLogin,
  setTypeLogin,
  SetURL,
}) {
  // const userRef = useRef();
  // const errRef = useRef();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loginStatus, SetLoginStatus] = useState(false);


  const headers = {
    "Content-Type": "application/json",
  };
  const url = "http://localhost:8000/api/user";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, password);

    axios
      .post("http://localhost:8000/api/user/login", {
        username: user,
        password: password,
      })
      .then(async (res) => {
        {
          if (res.status === 200) {
            // console.log("Login success");
            await delay(200);
            SetLoginStatus(true);
            await delay(2000);
            SetLoginStatus(false);
            // setSuccess(true);
            setSuccessLogin(true);
            setLoginUser(res.data);
            setTypeLogin("normal");
            setOpenModal(false);
          }
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
        setSuccessLogin(false);
      });
  };
  const handleClickLogin = async () => {
    if (user !== "" && password != "") {
      await delay(200);
      SetLoginStatus(true);
      await delay(2000);
      SetLoginStatus(false);
    }
  };

  function handleCallbackResponse(response) {
    // console.log("Encode with JWT ID token: " + response.credentials);
    console.log(response);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setLoginUser(userObject);
    setSuccessLogin(true);

    setTypeLogin("google");
    setOpenModal(false);
  }
  useEffect(() => {
    setErrMsg("");
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "46616188877-jkv38okuk5n4prdsk1lm8crd1gdpp43f.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      height: "200px",
      marginTop: "10px",
      width: "250px",
    });
  }, [user, password]);

  const responseFacebook = (response) => {
    console.log("login result", response);
    setLoginUser(response);
    setSuccessLogin(true);
    setTypeLogin("facebook");
    setOpenModal(false);
  };

  const componentClicked = (data) => {
    console.warn(data);
  };
  return (
    <div>
      <div>
        <button
          style={{
            marginLeft: "auto",
            display: "flex",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            marginBottom:'-30px'
          }}
          onClick={() => setOpenModal(false)}
        >
          X
        </button>
        <div style={{ display: "flex", justifyContent: "center",marginBottom:'-40px',fontSize:'20px' }}>
          <h2>Login</h2>
        </div>
        <section>
          <p aria-live="assertive">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="Username"
                style={{ color: "black", fontSize: "20px" }}
              >
                Username
              </label>
              <div style={{ display: "flex" }}>
                <input
                  style={{
                    display: "block",
                    width: "40%",
                    padding: "12px 20px",
                    marginLeft: "1px",
                    border: "2px solid",
                    borderColor: "green",
                    borderRadius: "4px",
                    margin: "8px 0",
                    boxSizing: "border-box",
                  }}
                  type="text"
                  id="username"
                  // ref={userRef}
                  autoComplete="off"
                  value={user}
                  placeholder="Fill your username"
                  required
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                ></input>

                <div
                  id="signInDiv"
                  style={{
                    border: "2px solid #D34836",
                    width: "250px",
                    marginLeft: "20%",
                    height: "42px",
                    marginTop: "5px",
                  }}
                ></div>
              </div>

              <label
                htmlFor="Password"
                style={{ color: "black", fontSize: "20px" }}
              >
                Password
              </label>
              <label
                style={{ color: "black", fontSize: "20px", margin: "40%" }}
              >
                OR
              </label>
              <div style={{ display: "flex" }}>
                <input
                  style={{
                    display: "block",
                    width: "40%",
                    padding: "12px 20px",
                    marginLeft: "1px",
                    border: "2px solid",
                    borderColor: "blue",
                    borderRadius: "4px",
                    margin: "8px 0",
                    boxSizing: "border-box",
                  }}
                  type="password"
                  id="password"
                  // ref={userRef}
                  autoComplete="off"
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                ></input>

                <div style={{ marginLeft: "20%", display: "flex" }}>
                  <div style={{ height: "30px" }}>
                    <FacebookLogin
                      style={{ width: "500px" }}
                      appId="481173887187613"
                      autoLoad={false}
                      fields="name,email,picture"
                      onClick={componentClicked}
                      callback={responseFacebook}
                      icon={FaBeer}
                    ></FacebookLogin>
                  </div>
                </div>
              </div>
              {errMsg != "" ? (
                <div>
                  <p style={{ color: "red" }}>❌{errMsg}</p>

                  <Modal
                    isOpen={loginStatus}
                    style={unsuccessStyles}
                    ariaHideApp={false}
                  >
                    <img
                      style={{
                        height: "40px",
                        width: "40px",
                        display: "block",
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      src="https://www.nicepng.com/png/detail/910-9107823_image-of-transparent-cross-x-mark-in-red.png"
                    ></img>
                    <p
                      style={{
                        textAlign: "center",
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      Login Fail
                    </p>
                  </Modal>
                </div>
              ) : (
                <Modal
                  isOpen={loginStatus}
                  style={successStyles}
                  ariaHideApp={false}
                >
                  <img
                    style={{
                      height: "40px",
                      width: "50px",
                      display: "block",
                      textAlign: "center",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    src={greenTick}
                  ></img>
                  <p
                    style={{
                      textAlign: "center",
                      color: "green",
                      fontSize: "16px",
                    }}
                  >
                    Login Success
                  </p>
                </Modal>
              )}
              <div></div>
              <div style={{ display: "flex" }}>
                <button
                  type="submit"
                  style={{
                    border: "2px solid orange",
                    transitionDuration: "0.4s",
                    backgroundColor: "orange" /* Green */,
                    color: "white",
                    height: "48px",
                    width: "200px",
                    marginLeft: "8%",
                    marginTop: "15px",
                  }}
                  onClick={handleClickLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
            <p style={{ fontSize:'15px'}}>
              if you do not have any account ?{" "}
              <Link
                style={{ color: "red" }}
                to="/Signup"
                onClick={() => setOpenModal(false)}
              >
                SignUp
              </Link>
            </p>
          </p>
        </section>
      </div>
    </div>
  );
}

export default LoginModal;
