import React, { useState, useRef } from "react";
import { IconButton, TextField, Button } from "@material-ui/core";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Input } from "@mui/material";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import axios from "axios";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  refFromURL,
} from "firebase/storage";
const ProfileModal = ({ setOpenModal, profile, setUser, urlAPI }) => {
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [img, setImage] = useState(profile.url);
  const [address, setAddress] = useState(profile.address);
  const inputRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `avatar/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((response) => {
      console.log(response);
      getDownloadURL(response.ref).then((url) => {
        setImage(url);
      });
    });
    inputRef.current.value = null;
    setChangeAvatar(false);
  };

  const handleSaveChange = () => {
    console.log("phone: ", phone);
    console.log("add", address);
    console.log("img", img);
    const url = urlAPI + "api/user/update/" + profile.userID;
    axios
      .put(url, {
        email: email,
        url: img,
        address: address,
        phone: phone,
      })
      .then(async (response) => {
        console.log(response);
        await setUser(response.data);
        // SetUserLogin(response.data);
        await window.localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
        await window.localStorage.setItem(
          "urlAvatar",
          JSON.stringify(response.data.url)
        );
        // // fetchCart(true, response.data)
      });

    window.location.reload();
  };
  return (
    <div>
      <button
        style={{
          marginLeft: "auto",
          display: "flex",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          marginBottom: "-30px",
        }}
        onClick={() => setOpenModal(false)}
      >
        X
      </button>
      <h1 style={{ textAlign: "center" }}>Your Profile</h1>

      <div style={{ textAlign: "center" }}>
        <img
          style={{ borderRadius: "300px", width: "30%", height: "20%" }}
          src={img}
        ></img>
      </div>
      <div
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        {changeAvatar === false ? (
          <div>
            {" "}
            <Button
              style={{ fontSize: "12px", border: "1px solid black" }}
              variant="outlined"
              onClick={() => {
                setChangeAvatar(true);
              }}
            >
              Change
            </Button>
          </div>
        ) : (
          <div>
            <Input
              inputRef={inputRef}
              type="file"
              name="myImage"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
                // event.target.value = null;
                // console.log(event.target.files);
              }}
            ></Input>
            <div style={{}}>
              <IconButton
                style={{ color: "black", fontWeight: "bold" }}
                onClick={uploadImage}
              >
                <UploadFileIcon style={{ fontSize: "50px", color: "black" }} />
                Upload
              </IconButton>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <p style={{ fontWeight: "bold", fontSize: "15px" }}>📧 Email</p>
          <TextField
            id="outlined-basic"
            value={email}
            variant="outlined"
            style={{ width: "250px" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div style={{ marginLeft: "20%" }}>
          <p style={{ fontWeight: "bold", color: "black", fontSize: "15px" }}>
            📱 Phone
          </p>
          <TextField
            id="outlined-basic"
            value={phone}
            variant="outlined"
            style={{ width: "218px" }}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <p style={{ fontWeight: "bold", fontSize: "15px" }}>🗺️ Address</p>
        <TextField
          id="outlined-basic"
          value={address}
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div style={{ marginTop: "10%" }}>
        <Button style={{ marginLeft: "20%" }} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "black",
            color: "white",
            marginLeft: "20%",
            width: "150px",
          }}
          onClick={handleSaveChange}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileModal;
