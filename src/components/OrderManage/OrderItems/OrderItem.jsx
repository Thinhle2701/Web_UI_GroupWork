import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
} from "@material-ui/core";
import Select from "react-select";
import greenTick from "../../../assets/greenTick.png";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ButtonBase from "@material-ui/core/ButtonBase";
import { commerce } from "../../../lib/commerce";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import axios from "axios";
import OrderDetail from "../OrderItems/OderDetail";
const options = [
  { value: "is delivering", label: "🟡 is delivering" },
  { value: "success", label: "🟢 success" },
  { value: "is confirmed", label: "🟠 is confirmed" },
];

const OrderItem = ({
  ordID,
  orderItem,
  detail,
  userRole,
  setOrderConfirm,
  numberOrderConfirm,
  urlAPI,
}) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const customStyles = {
    content: {
      top: "60%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "600px",
      width: "500px",
      backgroundColor: "white",
      borderColor: "black",
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

  const successStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "140px",
      width: "300px",
      backgroundColor: "white",
      borderColor: "green",
    },
  };
  const url = "http://localhost:8000/";
  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [list, setList] = useState([{}]);
  const [modalAskUserCancle, setModalAskUserCancle] = useState(false);
  const [modalDeleteSuccess, setmodalDeleteSuccess] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState("");
  const [statusOrd, setStatusOrd] = useState(orderItem.status);
  const [adminEdit, setAdminEdit] = useState(false);
  const [selectStatus, setSelectStatus] = useState(orderItem.status);
  const [colorLabel, setColorLabel] = useState("");

  useEffect(() => {
    console.log("test item: ", orderItem);
    console.log("test detail: ", detail);
    if (statusOrd == "is delivering") {
      setColorLabel("🟡is delivering");
    } else if (statusOrd == "is confirmed") {
      setColorLabel("🟠is confirmed");
    } else if (statusOrd == "success") {
      setColorLabel("🟢 success");
    } else {
      console.log("wait to confirm");
      setColorLabel("🔴 wait to confirm");
    }
  });
  // console.log(detail.line_items.length);
  console.log("order ne thinh", orderItem);
  const [indexItem, setIndexItem] = useState(0);
  const handleClickArrowRight = () => {
    if (indexItem == detail.order.line_items.length - 1) {
      setIndexItem(0);
    } else {
      var temp = indexItem + 1;
      setIndexItem(temp);
    }
  };

  const handleClickArrowLeft = () => {
    if (indexItem == 0) {
      setIndexItem(0);
    } else {
      var temp = indexItem - 1;
      setIndexItem(temp);
    }
  };
  console.log(selectStatus);
  console.log(colorLabel);

  const handleOnClickDelete = async () => {
    const url_del = urlAPI + "api/order/delete/" + ordID;
    console.log(url_del);
    axios.delete(url_del).then(async (res) => {
      console.log(res);
    });
    setModalAskUserCancle(false);
    await delay(200);
    setmodalDeleteSuccess(true);
    await delay(2000);
    setmodalDeleteSuccess(false);
    window.location.reload();
  };
  const handleConfirmOrder = () => {
    setConfirmOrder("YES");
    setOrderConfirm(numberOrderConfirm - 1);
    const url = urlAPI + "api/order/update_status/" + ordID;
    axios
      .put(url, {
        status: "is confirmed",
      })
      .then((res) => {
        console.log(res);
      });

    setStatusOrd("is confirmed");
  };

  const handleUpdateStatusOrder = () => {
    if (selectStatus != statusOrd) {
      const url = urlAPI + "api/order/update_status/" + ordID;
      axios
        .put(url, {
          status: selectStatus,
        })
        .then((res) => {
          console.log(res);
        });
      console.log("updated");
    }

    // console.log("color label", colorLabel);
    setStatusOrd(selectStatus);
    setAdminEdit(false);
    // setConfirmOrder("YES");
    console.log("hello", selectStatus);
    console.log("hello thinh", statusOrd);
  };
  const handleCancleUpdateStatus = () => {
    setAdminEdit(false);
  };

  return (
    <>
      <div
        className="thinh"
        onClick={(e) => {
          if (
            e.target.className ===
            "ReactModal__Overlay ReactModal__Overlay--after-open"
          ) {
            setOrderDetailModal(false);
          }
        }}
      >
        <Card
          style={{
            marginLeft: "20%",
            marginRight: "20%",
            margin: "50px",
            height: "500px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "2%" }}>
              <p style={{ fontWeight: "bold" }}>ORDER: {orderItem.orderID}</p>
              <p>
                {orderItem.date} by {orderItem.shippingData.firstName}{" "}
                {orderItem.shippingData.lastName}
              </p>
            </div>

            <div style={{ marginLeft: "auto", paddingRight: "2%" }}>
              {/* <p>🟠 {orderItem.status}</p>
              <Select options={options} /> */}
              {userRole === "admin" ? (
                <div>
                  {orderItem.status === "Wait To Confirm" ? (
                    <>
                      {confirmOrder === "" ? (
                        <>
                          <p
                            style={{
                              paddingLeft: "10px",
                              fontWeight: "bold",
                              color: "red",
                            }}
                          >
                            Wait To Confirm
                          </p>
                          <Button
                            style={{ color: "green", fontSize: "22px" }}
                            onClick={() => {
                              handleConfirmOrder();
                            }}
                          >
                            ✔️
                          </Button>
                          <Button style={{ color: "red", fontSize: "22px" }}>
                            ❌
                          </Button>
                        </>
                      ) : (
                        <>
                          {confirmOrder === "YES" ? (
                            <>
                              {adminEdit === true ? (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <Select
                                      options={options}
                                      placeholder={statusOrd}
                                      onChange={(e) => {
                                        console.log("test", e.value);

                                        if (e.value == "is delivering") {
                                          setColorLabel("🟡is delivering");
                                        } else if (e.value == "is confirmed") {
                                          setColorLabel("🟠is confirmed");
                                        } else if (e.value == "success") {
                                          setColorLabel("🟢 success");
                                        } else {
                                          console.log("exception");
                                        }

                                        setSelectStatus(e.value);
                                      }}
                                    />
                                    <Button
                                      variant="outlined"
                                      onClick={() => {
                                        handleUpdateStatusOrder();
                                      }}
                                    >
                                      Update
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleCancleUpdateStatus();
                                      }}
                                    >
                                      Cancle
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div style={{ display: "flex" }}>
                                    {/* <p>🟠 {statusOrd}</p> */}
                                    <p>{colorLabel}</p>
                                    <IconButton
                                      onClick={() => setAdminEdit(true)}
                                    >
                                      <EditIcon style={{ color: "black" }} />
                                    </IconButton>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <p>🟠 is Cancled</p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {adminEdit === true ? (
                        <>
                          <div style={{ display: "flex", marginTop: "10px" }}>
                            <Select
                              options={options}
                              placeholder={statusOrd}
                              onChange={(e) => {
                                setSelectStatus(e.value);
                                if (e.value == "is delivering") {
                                  setColorLabel("🟡is delivering");
                                } else if (e.value == "is confirmed") {
                                  setColorLabel("🟠is confirmed");
                                } else if (e.value == "success") {
                                  setColorLabel("🟢 success");
                                } else {
                                  console.log("exception");
                                }
                              }}
                            />
                            <Button
                              variant="outlined"
                              onClick={() => {
                                handleUpdateStatusOrder();
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              onClick={() => {
                                handleCancleUpdateStatus();
                              }}
                            >
                              Cancle
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div style={{ display: "flex" }}>
                            {/* <p>🟠 {statusOrd}</p> */}
                            <p>{colorLabel}</p>
                            <IconButton onClick={() => setAdminEdit(true)}>
                              <EditIcon style={{ color: "black" }} />
                            </IconButton>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <p>{colorLabel}</p>
                </div>
              )}
            </div>
          </div>

          <div style={{}}>
            <div style={{ alignItems: "center", textAlign: "center" }}>
              <p style={{ fontWeight: "bold", fontSize: "30px" }}>
                {detail.order.line_items[indexItem].product_name}
              </p>
            </div>

            <div style={{ display: "flex", marginLeft: "20px" }}>
              <ButtonBase onClick={() => handleClickArrowLeft()}>
                <ArrowLeft style={{ fontSize: "40px" }} />
              </ButtonBase>
              <div
                style={{
                  marginLeft: "100px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={detail.order.line_items[indexItem].image.url}
                  style={{
                    height: "150px",
                    width: "200px",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                ></img>
                <div style={{ fontSize: "20px", marginLeft: "200px" }}>
                  <p>Quantity: {detail.order.line_items[indexItem].quantity}</p>
                </div>
                <div style={{ fontSize: "20px", marginLeft: "200px" }}>
                  <p style={{ fontSize: "20px" }}>
                    Price Per unit:{" "}
                    {
                      detail.order.line_items[indexItem].price
                        .formatted_with_symbol
                    }
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "40px",
                }}
              >
                <ButtonBase onClick={handleClickArrowRight}>
                  <ArrowRight style={{ fontSize: "40px" }} />
                </ButtonBase>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div>
              <p
                style={{ color: "green", fontWeight: "bold", fontSize: "30px" }}
              >
                Total: {orderItem.orderDetail.order.total.formatted_with_symbol}
              </p>
            </div>
            <div style={{ textAlign: "right", paddingRight: "10px" }}>
              <Button
                variant="outlined"
                style={{ border: "1px solid black", marginRight: "10px" }}
                onClick={() => setOrderDetailModal(true)}
              >
                View Order Detail
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => {
                  setModalAskUserCancle(true);
                }}
              >
                Cancle
              </Button>
            </div>
          </div>
        </Card>
        <div>
          {orderDetailModal === true ? (
            <Modal
              isOpen={orderDetailModal}
              style={customStyles}
              ariaHideApp={false}
            >
              <OrderDetail
                setModal={setOrderDetailModal}
                detailOrder={detail}
                orderInfo={orderItem}
              />
            </Modal>
          ) : (
            <></>
          )}
        </div>
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
            Are you sure to delete this order ?
          </p>
          <div style={{ display: "flex", marginTop: "30px" }}>
            <div style={{ marginLeft: "20%" }}>
              <Button
                style={{ border: "2px solid red", color: "red" }}
                variant="outlined"
                onClick={() => {
                  handleOnClickDelete();
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

        <Modal
          isOpen={modalDeleteSuccess}
          style={successStyles}
          ariaHideApp={false}
        >
          <img
            style={{
              height: "80px",
              width: "100px",
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
            Order is Deleted Successfully
          </p>
        </Modal>
      </div>
    </>
  );
};

export default OrderItem;
