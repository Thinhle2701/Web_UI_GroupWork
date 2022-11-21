import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  refFromURL,
} from "firebase/storage";
import Select from "react-select";
import { Input } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IconButton, TextField, Button } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { v4 } from "uuid";
import { set } from "react-hook-form";
import { URL } from "url";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const ProductModal = ({ setOpenModal, categories,urlAPI }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageChoose, setImageChoose] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);
  const [checkUploadImage, setCheckUploadImage] = useState(false);
  const [optionCategories, setOptionCategories] = useState([{}]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("<p></p>");
  const inputRef = useRef(null);
  const uploadImage = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `temp/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((response) => {
      console.log(response);
      const obj = {
        fileName: response.metadata.name,
        original: "",
        thumbnail: "",
      };
      getDownloadURL(response.ref).then((url) => {
        obj.original = url;
        obj.thumbnail = url;
        axios
          .post(
            "https://api.chec.io/v1/assets",
            {
              filename: obj.fileName,
              url: url,
            },
            {
              headers: {
                "X-Authorization":
                  "sk_451326b93cb3e4b4a7e3f853056401fccabf5fa7facfe",
              },
            }
          )
          .then((response) => {
            const asset = {
              id: response.data.id,
              fileName: response.data.filename,
              original: response.data.url,
              thumbnail: response.data.url,
            };
            setImageList((prev) => [...prev, asset]);
          })
          .catch(function (err) {
            console.log(err);
          });
      });
      setCheckUploadImage(true);
    });
  };
  const handleRemoveItem = (original) => {
    setImageList(imageList.filter((item) => item.original !== original));
  };
  const handleDelete = () => {
    if (imageList.length > 1) {
      for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].original.localeCompare(imageChoose) == 1) {
          handleRemoveItem(imageList[i].original);
          deleteFirebase(imageList[i].fileName);
        }
      }
      // console.log("deleted", imageChoose);
      // console.log("list ", imageList);
    } else {
      alert("Your product should have one image");
    }
  };

  console.log("image ne", imageList);
  console.log("text", description.toString());

  const imageListRef = ref(storage, "temp/");
  const deleteFirebase = (fileName) => {
    const desertRef = ref(storage, `temp/${fileName}`);
    deleteObject(desertRef)
      .then((res) => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  useEffect(() => {
    function tranferCategories() {
      for (let i = 0; i < categories.length; i++) {
        const obj = {
          value: categories[i].id,
          label: categories[i].name,
        };
        setOptionCategories((prev) => [...prev, obj]);
      }
    }

    tranferCategories();
  }, [categories]);

  // console.log("name: ", productName);
  // console.log("price: ", productPrice);
  // console.log("category: ", productCategory);

  const handleCreateProduct = async () => {
    if (productName == "" || productPrice == 0 || productCategory == "") {
      setErrorMessage("You need to fill fully Product Information !!!");
    } else {
      const assetsList = [];
      for (let i = 0; i < imageList.length; i++) {
        const obj = {
          id: imageList[i].id,
        };
        assetsList.push(obj);
      }
      const category = [];
      const cate_temp = { id: productCategory };
      category.push(cate_temp);
      await axios
        .post(
          "https://api.chec.io/v1/products",
          {
            product: {
              name: productName,
              price: productPrice,
              description: description,
            },
            assets: assetsList,
            categories: category,
          },
          {
            headers: {
              "X-Authorization":
                "sk_451326b93cb3e4b4a7e3f853056401fccabf5fa7facfe",
            },
          }
        )
        .then(async (response) => {
          const url = urlAPI + "api/product/add_product";
          await axios
            .post(url, {
              id: response.data.id,
              name: response.data.name,
              image: response.data.image.url,
              price: response.data.price.formatted_with_symbol,
              numberOnSale: 0,
            })
            .then(async (response) => {
              console.log(response);
              await setOpenModal(false);
              window.location.reload();
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const handleCancleCreateProduct = async () => {
    if (imageList.length === 0) {
      setOpenModal(false);
    } else {
      for (let i = 0; i < imageList.length; i++) {
        const url = "https://api.chec.io/v1/assets/" + imageList[i].id;
        await axios
          .delete(url, {
            headers: {
              "X-Authorization":
                "sk_451326b93cb3e4b4a7e3f853056401fccabf5fa7facfe",
            },
          })
          .then((res) => {
            setOpenModal(false);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
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
            marginBottom: "-30px",
          }}
          onClick={handleCancleCreateProduct}
        >
          X
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "-40px",
            fontSize: "20px",
          }}
        >
          <h2>Product Detail</h2>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div>
          <p style={{ fontWeight: "bold" }}>Product Name</p>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setErrorMessage("");
              setProductName(e.target.value);
            }}
          />
        </div>

        <div style={{ marginLeft: "20%" }}>
          <p style={{ fontWeight: "bold" }}>Price</p>
          <TextField
            id="outlined-basic"
            label="$ Price"
            variant="outlined"
            onChange={(e) => {
              setErrorMessage("");
              setProductPrice(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <p style={{ fontWeight: "bold" }}>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => {
            handleChangeDescription(e);
          }}
          style={{ width: "100%", height: "100px" }}
          placeholder="Product Information"
        ></textarea>
      </div>

      <div style={{ marginTop: "20px" }}>
        <p style={{ fontWeight: "bold" }}>Category</p>
        <Select
          options={optionCategories}
          placeholder="Choose Category"
          onChange={(e) => {
            setProductCategory(e.value);
            setErrorMessage("");
          }}
        />
      </div>

      <div
        style={{
          width: "300px",
          justifyContent: "center",
          marginLeft: "20%",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {checkUploadImage === true ? (
            <>
              <div style={{ width: "100%", height: "10px" }}>
                {deleteButton == true ? (
                  <div style={{ textAlign: "center" }}>
                    <IconButton
                      style={{}}
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      <DeleteIcon style={{ color: "black" }} />
                    </IconButton>
                  </div>
                ) : (
                  <div></div>
                )}
                {imageList.length === 0 ? <div></div> : <div></div>}
                <ImageGallery
                  inputRef={inputRef}
                  style={{}}
                  items={imageList}
                  showIndex={true}
                  onThumbnailClick={(e) => {
                    // setImageChoose(e.target.src);
                    setDeleteButton(false);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteButton(!deleteButton);
                    setImageChoose(e.target.src);
                  }}
                  renderLeftNav={(e) => {}}
                  renderRightNav={(e) => {}}
                ></ImageGallery>

                <div style={{}}>
                  <Input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  ></Input>
                  <IconButton
                    style={{ marginTop: "30px" }}
                    onClick={uploadImage}
                  >
                    <UploadFileIcon
                      style={{ fontSize: "100px", color: "black" }}
                    />
                  </IconButton>
                </div>
                <div>
                  {errorMessage === "" ? (
                    <></>
                  ) : (
                    <>
                      {" "}
                      <p style={{ fontWeight: "bold", color: "red" }}>
                        {errorMessage}
                      </p>
                    </>
                  )}
                </div>
                <div style={{ display: "block" }}>
                  <Button
                    variant="outlined"
                    onClick={handleCancleCreateProduct}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      marginLeft: "30%",
                      width: "100px",
                    }}
                    onClick={handleCreateProduct}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{}}>
                <Input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                ></Input>
                <IconButton style={{ marginTop: "30px" }} onClick={uploadImage}>
                  <UploadFileIcon
                    style={{ fontSize: "100px", color: "black" }}
                  />
                </IconButton>
              </div>
              <div>
                {errorMessage === "" ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <p style={{ fontWeight: "bold", color: "red" }}>
                      {errorMessage}
                    </p>
                  </>
                )}
              </div>

              <div style={{ display: "block" }}>
                <Button variant="outlined" onClick={handleCancleCreateProduct}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    marginLeft: "30%",
                    width: "100px",
                  }}
                  onClick={handleCreateProduct}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        </div>

        {/* <div>
          <Button variant="outlined">Cancel</Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginLeft: "30%",
              width: "100px",
            }}
          >
            Create
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductModal;
