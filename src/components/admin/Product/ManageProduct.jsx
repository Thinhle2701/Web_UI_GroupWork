import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  List,
  Typography,
  Button,
} from "@material-ui/core";
import Modal from "react-modal";

import ProductModal from "./ProductModal";
import SearchBar from "../../SearchBar/SearchBar";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "600px",
    width: "510px",
    backgroundColor: "white",
    borderColor: "black",
    marginTop:"100px"
  },
};
const ManageProduct = ({ productList, handleSearchItem,categoriesProduct }) => {
  const [productListSearch, setProductListSearch] = useState(productList);
  const [modalOpen, setModalOpen] = useState(false);
  const handleEdit = (event) => {
    console.log(event.target.value);
  };

  const handleDelete = (event) => {
    console.log(event.target.value);
  };
  // const handleSearchItem = () => {
  //   console.log();
  // };
  return (
    <div style={{ marginTop: "100px" }}>
      <h1 style={{ textAlign: "center" }}>Product Management</h1>
      <div style={{ marginLeft: "37%", display: "flex" }}>
        <SearchBar onHandleSearchItem={handleSearchItem} />
        <Button
          style={{
            marginLeft: "5%",
            backgroundColor: "black",
            color: "white",
            borderRadius: "100px",
          }}
          onClick={()=>setModalOpen(true)}
        >
          + Add Product
        </Button>
        <Button
          style={{
            marginLeft: "5%",
            backgroundColor: "#0D9A9A",
            color: "white",
            borderRadius: "100px",
          }}
        >
          ↻ Refresh
        </Button>
      </div>
      <List disabledPadding style={{ marginTop: "50px" }}>
        <table
          style={{
            marginLeft: "10%",
            backgroundColor: "white",
            borderWidth: "1px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
            width: "80%",
          }}
        >
          <tr>
            <th style={{ width: "30%", textAlign: "center" }}>
              <p>Product</p>
            </th>

            <th style={{ width: "10%", textAlign: "center" }}>
              <p>Category</p>
            </th>
            <th style={{ width: "20%", textAlign: "center" }}>
              <p>Price</p>
            </th>

            <th style={{ width: "20%", textAlign: "center" }}>
              <p>Option</p>
            </th>
          </tr>
          {productList.map((pro) => (
            <tr style={{ backgroundColor: "white" }}>
              <th style={{}}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <img
                    src={pro.image.url}
                    style={{
                      height: "100px",
                      width: "150px",
                      marginRight: "10px",
                      marginLeft: "10px",
                    }}
                  ></img>

                  <p style={{ marginLeft: "10px", paddingTop: "7%" }}>
                    {pro.name}
                  </p>
                </div>
              </th>
              <th style={{ textAlign: "center" }}>
                <p>{pro.categories[0].name}</p>
              </th>
              <th style={{ textAlign: "center" }}>
                <p style={{ color: "green" }}>
                  {pro.price.formatted_with_symbol}
                </p>
              </th>
              <th>
                <div style={{ textAlign: "center" }}>
                  <button
                    style={{
                      backgroundColor: "#282C34",
                      border: "0px solid white",
                      color: "white",
                      fontSize: "20px",
                      padding: "10px",
                      borderRadius: "200px",
                    }}
                    value={pro.id}
                    onClick={(e) => {
                      handleEdit(e);
                    }}
                  >
                    📝Edit
                  </button>

                  <button
                    style={{
                      backgroundColor: "red",
                      border: "0px solid white",
                      color: "white",
                      marginLeft: "40px",
                      fontSize: "20px",
                      padding: "10px",
                      borderRadius: "200px",
                    }}
                    value={pro.id}
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    X Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </table>
      </List>

      {modalOpen === true ? (
        <Modal
          isOpen={modalOpen}
          style={customStyles}
          ariaHideApp={false}
        >
          <ProductModal setOpenModal={setModalOpen} categories={categoriesProduct}/>
        </Modal>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ManageProduct;
