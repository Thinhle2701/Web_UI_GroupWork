import React, { Fragment, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import EditModal from "./ProfileModal";
const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "600px",
    width: "600px",
    backgroundColor: "white",
    borderColor: "black",
  },
};
const ProfileUser = ({ user, checkLogin, setLoginUser,urlAPI }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(user);
  const handleEdit = () => {
    console.log("edit");
    setModalOpen(true);
  };
  return (
    <Fragment
      style={{ backgroundColor: "#EEEEEE", width: "100%", height: "100vh" }}
    >
      <h1 style={{ marginTop: "100px", textAlign: "center" }}>
        Welcome Back {user.username} !!!
      </h1>
      <div
        style={{
          margin: "auto",
          width: "50%",
          border: "1px solid green",
          padding: "10px",
          marginTop: "20px",
          backgroundColor: "white",
        }}
      >
        {modalOpen === true ? (
          <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
            <EditModal
              setOpenModal={setModalOpen}
              profile={user}
              setUser={setLoginUser}
              urlAPI={urlAPI}
            />
          </Modal>
        ) : (
          <p></p>
        )}
        <CardContent style={{ alignItems: "center", justifyContent: "center" }}>
          <div>
            {user.user_type === "admin" ? (
              <>
                {" "}
                <h1 style={{ textAlign: "center" }}>{user.user_type}</h1>
              </>
            ) : (
              <>
                <h1 style={{ textAlign: "center", fontSize: "30px" }}>
                  Customer
                </h1>
              </>
            )}
          </div>

          <div style={{ display: "flex", width: "100%" }}>
            <img
              style={{ borderRadius: "1000px", width: "30%", height: "250px" }}
              src={user.url}
            ></img>
            <div style={{ width: "40%" }}>
              <ul>
                <li>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold" }}>User Name: </p>
                    <p style={{ paddingLeft: "10px" }}>{user.username}</p>
                  </div>
                </li>
                <li>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold" }}>Email: </p>
                    <p style={{ marginLeft: "10%", paddingLeft: "10px" }}>
                      {user.email}
                    </p>
                  </div>
                </li>
                <li>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold" }}>Phone: </p>
                    {user.phone === undefined ? (
                      <>
                        <p style={{ marginLeft: "10%", paddingLeft: "10px" }}>
                          none
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p style={{ marginLeft: "10%", paddingLeft: "10px" }}>
                          {user.phone}
                        </p>
                      </>
                    )}
                  </div>
                </li>
                <li>
                  <div style={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold" }}>Address: </p>
                    {user.address === undefined ? (
                      <>
                        <p style={{ marginLeft: "10%", paddingLeft: "10px" }}>
                          none
                        </p>
                      </>
                    ) : (
                      <>
                        {" "}
                        <p style={{ marginLeft: "10%", display: "block" }}>
                          {user.address}
                        </p>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            <div
              style={{
                marginLeft: "auto",
                marginRight: "10px",
                marginTop: "28%",
              }}
            >
              <Button
                variant="contained"
                style={{
                  fontSize: "20px",
                  border: "0px solid white",
                  borderRadius: "200px",
                  color: "white",
                  backgroundColor: "black",
                }}
                onClick={(e) => {
                  handleEdit(e);
                  // setModalEdit(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Fragment>
  );
};

export default ProfileUser;
