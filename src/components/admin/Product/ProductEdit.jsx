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

const ProductEdit = ({ setOpenEditModal, product, categories, urlAPI }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price.formatted);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [optionCategories, setOptionCategories] = useState([{}]);
  const [productCategory, setProductCategory] = useState({
    id: product.categories[0].id,
    name: product.categories[0].name,
  });
  const [deleteButton, setDeleteButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [imageChoose, setImageChoose] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  console.log(product);
  const inputRef = useRef(null);
  const handleChangeDescription = (event) => {
    setProductDescription(event.target.value);
  };
  const handleClickSave = () => {
    console.log(productPrice);
    console.log(product.price.formatted_with_symbol);
    if (
      product.name === productName &&
      product.price.formatted === productPrice &&
      product.description === productDescription &&
      product.categories[0].id === productCategory.id
    ) {
      console.log("No change ");
    } else {
      const strCate = productCategory.id;
      console.log("cate: ", strCate);
      const assetsList = [];
      for (let i = 0; i < imageList.length; i++) {
        const obj = {
          id: imageList[i].assetsID,
        };
        assetsList.push(obj);
      }
      console.log(assetsList);
      console.log(strCate);
      const url = "https://api.chec.io/v1/products/" + product.id;
      axios
        .put(
          url,
          {
            product: {
              name: productName,
              price: productPrice,
              description: productDescription,
            },
            assets: assetsList,
            categories: [
              {
                id: strCate,
              },
            ],
          },
          {
            headers: {
              "X-Authorization":
                "sk_451326b93cb3e4b4a7e3f853056401fccabf5fa7facfe",
            },
          }
        )
        .then(async (response) => {
          const url = urlAPI + "api/product/update/" + product.id;
          await axios
            .put(url, {
              name: response.data.name,
              url: response.data.image.url,
              price: response.data.price.formatted_with_symbol,
            })
            .then((res) => {
              console.log("api", res);
            })
            .catch(function (err) {
              console.log(err);
            });
          console.log(response);
          setOpenEditModal(false);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
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
    function getImageList() {
      for (let i = 0; i < product.assets.length; i++) {
        const obj = {
          assetsID: product.assets[i].id,
          fileName: product.assets[i].filename,
          original: product.assets[i].url,
          thumbnail: product.assets[i].url,
        };
        setImageList((prev) => [...prev, obj]);
      }
    }
    getImageList();

    tranferCategories();
  }, [categories, product]);
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
              assetsID: response.data.id,
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
    });
    inputRef.current.value = null;
  };
  const handleRemoveItem = (original) => {
    setImageList(imageList.filter((item) => item.original !== original));
  };
  function handleDelete() {
    if (imageList.length > 1) {
      for (let i = 0; i < imageList.length; i++) {
        if (imageList[i].original.localeCompare(imageChoose) == 1) {
          handleRemoveItem(imageList[i].original);
        }
      }
      setDeleteButton(false);
    } else {
      alert("Your product should have one image");
    }
  }
  console.log("List image", imageList);
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
        onClick={() => setOpenEditModal(false)}
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

      <div style={{ display: "flex", marginTop: "10px" }}>
        <div>
          <p style={{ fontWeight: "bold" }}>Product Name</p>
          <TextField
            id="outlined-basic"
            value={productName}
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
            value={productPrice}
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
          value={productDescription}
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
          selected={productCategory.id}
          value={productCategory.id}
          options={optionCategories}
          placeholder={productCategory.name}
          onChange={(e) => {
            console.log(e);
            setProductCategory({ id: e.value, name: e.label });
            // setErrorMessage("");
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "25%",
            width: "50%",
            display: "block",
            height: "40%",
          }}
        >
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
          <ImageGallery
            style={{ textAlign: "center" }}
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
            // renderLeftNav={(e) => {}}
            // renderRightNav={(e) => {}}
          ></ImageGallery>
          <div style={{ display: "block" }}>
            <IconButton style={{ marginTop: "30px" }} onClick={uploadImage}>
              <UploadFileIcon style={{ fontSize: "100px", color: "black" }} />
            </IconButton>
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
          </div>
        </div>

        <div style={{ marginTop: "10%" }}>
          <Button variant="outlined">Cancel</Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginLeft: "20%",
              width: "150px",
            }}
            onClick={handleClickSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
