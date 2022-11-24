import { border } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./style.css";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import greenTick from "../../assets/greenTick.png";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const unsuccessStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "200px",
    backgroundColor: "white",
    borderColor: "red",
  },
};

const successStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "100px",
    width: "200px",
    backgroundColor: "white",
    borderColor: "green",
  },
};

function SignUpForm({ urlAPI }) {
  useEffect(() => {
    setErrMsg("");
  }, []);
  const history = useHistory();
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    const cartTemp = window.localStorage.getItem("cartTemp");
    if (password !== confirmPassword) {
      setErrMsg("Password and Confirm Password do not match");
      await delay(200);
      setSignUpStatus(true);
      await delay(2000);
      setSignUpStatus(false);

      setSignUpSuccess(false);
    } else {
      const cart = JSON.parse(cartTemp);
      const url = urlAPI + "api/user/add_user";
      axios
        .post(url, {
          username: username,
          password: password,
          email: email,
          url: "https://static.thenounproject.com/png/363640-200.png",
          cartID: cart.id,
          userType: "user",
        })
        .then(async (res) => {
          {
            if (res.status === 200) {
              setErrMsg("");
              setSignUpSuccess(true);
              await delay(200);
              setSignUpStatus(true);
              await delay(2000);
              setSignUpStatus(false);
              history.push("/");
            }
          }
        })
        .catch(async (err) => {
          setErrMsg(err.response.data.message);
          await delay(200);
          setSignUpStatus(true);
          await delay(2000);
          setSignUpStatus(false);
        });
    }
  };
  return (
    <div style={{backgroundColor:"#e8ebe9",height:"1000px",overflow:"hidden",width:"auto"}}>
      <div style={{ display: "flex" }}>
        <button
          style={{
            display: "flex",
            backgroundColor: "transparent",
            border: "none",
            marginTop: "70px",
            cursor: "pointer",
            color: "black",
            fontSize: "20px",
            marginLeft: "5px",
          }}
          onClick={() => {
            history.push("/");
          }}
        >
          <ArrowBackIcon style={{fontSize:"30px"}} />
        </button>

        <p
          style={{
            marginTop: "50px",
            color: "black",
            marginLeft: "40%",
            fontSize: "50px",
            marginBottom: "-60px",
          }}
        >
          Sign Up
        </p>
      </div>
      <div className="form" onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="username">
            <label
              className="form__label"
              for="firstName"
              style={{ color: "black", fontWeight: "bold",fontSize:"20px"  }}
            >
              👤 Username{" "}
            </label>
            <input
              style={{
                justifyContent: "flex-end",
                display: "flex",
                border: "2px solid black",
              }}
              className="form__input"
              type="text"
              id="firstName"
              placeholder="Fill Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="email" style={{marginTop:"20px"}}>
            <label
              className="form__label"
              for="email"
              style={{ color: "black", fontWeight: "bold",fontSize:"20px"  }}
            >
             📧 Email{" "}
            </label>
            <input
              style={{
                justifyContent: "flex-end",
                display: "flex",
                border: "2px solid black",
              }}
              type="email"
              id="email"
              className="form__input"
              placeholder=" Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password" style={{marginTop:"20px"}}>
            <label
              className="form__label"
              for="password"
              style={{ color: "black", fontWeight: "bold",fontSize:"20px" }}
            >
             🔑 Password{" "}
            </label>
            <input
              className="form__input"
              style={{
                justifyContent: "flex-end",
                display: "flex",
                border: "2px solid black",
              }}
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="confirm-password" style={{marginTop:"20px"}}>
            <label
              className="form__label"
              for="confirmPassword"
              style={{ color: "black", fontWeight: "bold",fontSize:"20px" }}
            >
              🔐 Confirm Password{" "}
            </label>
            <input
              className="form__input"
              style={{
                justifyContent: "flex-end",
                display: "flex",
                border: "2px solid black",
              }}
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {errMsg === "" ? (
              <Modal
                isOpen={signUpStatus}
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
                  Register Success
                </p>
              </Modal>
            ) : (
              <div>
                <p style={{ color: "red" }}>❌{errMsg}</p>

                <Modal
                  isOpen={signUpStatus}
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
                    Register Fail
                  </p>
                </Modal>
              </div>
            )}
          </div>
        </div>
        <div></div>
        <div className="footer">
          <button
            style={{
              transitionDuration: "0.4s",
              backgroundColor: "black" /* Green */,
              color: "white",
              height: "48px",
              width: "200px",
              marginTop: "25px",
            }}
            type="submit"
            onClick={() => handleSubmit()}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignUpForm;
