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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import axios from "axios";
import ProductModal from "./ProductModal";
import EditProduct from "./ProductEdit";
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
    marginTop: "100px",
  },
};

const customEditStyles = {
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
    marginTop: "100px",
  },
};
const askStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "130px",
    width: "300px",
    backgroundColor: "white",
    borderColor: "black",
  },
};
const ManageProduct = ({
  productList,
  handleSearchItem,
  categoriesProduct,
  urlAPI,
}) => {
  const [productListSearch, setProductListSearch] = useState(productList);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const [modalAskUserCancle, setModalAskUserCancle] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState("");
  const handleEdit = (event) => {
    var result = event.target.value;
    // console.log(event.target.value);
    if (event.target.value) {
      const url = "https://api.chec.io/v1/products/" + event.target.value;
      axios
        .get(url, {
          headers: {
            "X-Authorization":
              "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
          },
        })
        .then((response) => {
          setProductEdit(response.data);
          // console.log(response)
          setModalEdit(true);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    } else {
      result = event.target.id;
      if (result) {
        const url = "https://api.chec.io/v1/products/" + result;
        axios
          .get(url, {
            headers: {
              "X-Authorization":
                "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
            },
          })
          .then((response) => {
            setProductEdit(response.data);
            // console.log(response)
            setModalEdit(true);
          })
          .catch((error) => {
            console.log("error " + error);
          });
      }
    }
  };
  const handleDelete = (event) => {
    console.log(event.target);

    var result = event.target.value;
    // console.log(event.target.value);
    if (event.target.value) {
      console.log("value: ", result);
      setDeleteTarget(result);
      setModalAskUserCancle(true);
    } else {
      result = event.target.id;
      if (result) {
        console.log("id: ", result);
        setDeleteTarget(result);
        setModalAskUserCancle(true);
      }
    }
  };
  // const handleSearchItem = () => {
  //   console.log();
  // };
  function handleApproveDelete() {
    if (deleteTarget != "") {
      const url = "https://api.chec.io/v1/products/" + deleteTarget;
      axios
        .delete(url, {
          headers: {
            "X-Authorization":
              "sk_test_4513288b8800ade424556f7c24a4c3c7b5c579c9d2e5a",
          },
        })
        .then(async (res) => {
          const url = urlAPI + "api/product/delete/" + deleteTarget;
          await axios
            .delete(url)
            .then(async function (response) {
              await setModalAskUserCancle(false);
              await setDeleteTarget("");
              window.location.reload();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  }
  console.log("product Edit: ", productEdit);
  return (
    <div style={{}}>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>
        Product Management
      </h1>
      <div></div>
      <div style={{ marginLeft: "37%", display: "flex" }}>
        <SearchBar onHandleSearchItem={handleSearchItem} />
        <Button
          style={{
            marginLeft: "5%",
            backgroundColor: "black",
            color: "white",
            borderRadius: "100px",
          }}
          onClick={() => setModalOpen(true)}
        >
          + Add Product
        </Button>

        {modalOpen === true ? (
          <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
            <ProductModal
              urlAPI={urlAPI}
              setOpenModal={setModalOpen}
              categories={categoriesProduct}
            />
          </Modal>
        ) : (
          <p></p>
        )}
        <Button
          style={{
            marginLeft: "5%",
            backgroundColor: "#0D9A9A",
            color: "white",
            borderRadius: "100px",
          }}
          onClick={() => {
            window.location.reload();
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
                    disableRipple
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
                      // console.log(e.target.id);
                      handleEdit(e);
                      // setModalEdit(true);
                    }}
                  >
                    <EditIcon
                      id={pro.id}
                      style={{
                        height: "20px",
                        width: "20px",
                        paddingRight: "30px",
                        paddingLeft: "30px",
                      }}
                    ></EditIcon>
                  </button>

                  <button
                    disableRipple
                    style={{
                      backgroundColor: "#D14831",
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
                    <DeleteIcon
                      id={pro.id}
                      style={{
                        height: "20px",
                        width: "25px",
                        paddingRight: "25px",
                        paddingLeft: "25px",
                      }}
                    ></DeleteIcon>
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </table>
      </List>

      {modalEdit === true ? (
        <Modal isOpen={modalEdit} style={customEditStyles} ariaHideApp={false}>
          <EditProduct
            urlAPI={urlAPI}
            setOpenEditModal={setModalEdit}
            product={productEdit}
            categories={categoriesProduct}
          />
        </Modal>
      ) : (
        <p></p>
      )}

      {modalAskUserCancle === true ? (
        <div>
          {" "}
          <Modal
            isOpen={modalAskUserCancle}
            style={askStyles}
            ariaHideApp={false}
          >
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
                onClick={() => setModalAskUserCancle(false)}
              >
                X
              </button>
            </div>
            <p
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10%",
              }}
            >
              Are you sure to delete this product ?
            </p>
            <div style={{ display: "flex", marginTop: "30px" }}>
              <div style={{ marginLeft: "20%" }}>
                <Button
                  style={{ border: "2px solid red", color: "red" }}
                  variant="outlined"
                  onClick={(e) => {
                    handleApproveDelete();
                  }}
                >
                  YES
                </Button>
              </div>
              <div style={{ marginLeft: "15%" }}>
                <Button
                  style={{ border: "2px solid black" }}
                  variant="outlined"
                  onClick={() => setModalAskUserCancle(false)}
                >
                  NO
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageProduct;
