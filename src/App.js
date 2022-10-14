import React, { useState, useEffect, useReducer } from "react";
import {
  Products,
  Navbar,
  Cart,
  ProductDetail,
  Checkout,
  ProductCompare,
  LoginModal,
  SignUp,
  Orders,
  Admin,
  AdminManageOrder,
  AdminStatistic,
  AdminManageProduct,
} from "./components";
import axios from "axios";
import Modal from "react-modal";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const api = axios.create({
  baseURL: `http://localhost:8000/`,
});
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [userLogin, SetUserLogin] = useState({});
  const [loginSuccess, SetLoginSuccess] = useState(false);
  const [loginType, setLoginType] = useState("");
  const [urlAvatar, setURLAvatar] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [order, setOrder] = useState([{}]);
  const [orderListUser, setOrderListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState({});
  const [adminOrder, setAdminOrder] = useState({});
  const [orderListAdmin, setOrderListAdmin] = useState([]);
  const [numberConfirmOrder, setNumberConfirmOrder] = useState(0);
  const [ordDataStatistic, setOrdDataStatistic] = useState([]);
  const [ProductDataStatistic, setProductDataStatistic] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const check = window.localStorage.getItem("checkLogin");
    const user = window.localStorage.getItem("user");

    if (JSON.parse(check) !== null) {
      SetLoginSuccess(JSON.parse(check));
      const ava = window.localStorage.getItem("urlAvatar");
      setURLAvatar(JSON.parse(ava));
      SetUserLogin(JSON.parse(user));
      if (JSON.parse(check) === true) {
        getOrderCustomer(JSON.parse(user).userID);
        if (JSON.parse(user).user_type === "admin") {
          getProductAdmin();
          getCategoriesAdmin();
          getOrderDataStatistic();
          setAdmin(JSON.parse(user));
          getOrderAdmin();
          getORDConfirm();
        } else {
          setAdmin({});
        }
        // getOrderDetail();
      }
      fetchCart(JSON.parse(check), JSON.parse(user));
    } else {
      window.localStorage.setItem("checkLogin", JSON.stringify(false));
      SetLoginSuccess(false);
      fetchCart(false, "null");
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    console.log(data);
  };

  const searchProduct = async (productName) => {
    const { data } = await commerce.products.list();

    var ProductSearch = [];
    console.log("SearchTitle: ", productName);
    if (productName == "") {
      setProducts(data);
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().includes(productName.toLowerCase())) {
        ProductSearch.push(data[i]);
      }
    }
    setProducts(ProductSearch);
  };

  const filterProduct = async (productCategory) => {
    const { data } = await commerce.products.list();
    var ProductFilter = [];
    if (productCategory == "All") {
      setProducts(data);
    } else {
      console.log("Filter: ", productCategory);
      for (var i = 0; i < data.length; i++) {
        if (data[i].categories[0].name == productCategory) {
          ProductFilter.push(data[i]);
        }
      }
      setProducts(ProductFilter);
    }
  };

  const addNewEmptyCart = async () => {
    await commerce.cart.refresh().then((cart) => {
      setCart(cart);
      window.localStorage.setItem("cartTemp", JSON.stringify(cart));
    });
  };
  const filterCategory = async (productCategory, flag) => {
    const { data } = await commerce.products.list();
    if (flag === false) {
      setProducts(data);
    } else {
      var ProductFilter = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].categories[0].name === productCategory) {
          ProductFilter.push(data[i]);
        }
      }
      setProducts(ProductFilter);
    }
  };

  const fetchCart = async (checkLogin, user) => {
    if (checkLogin === false) {
      commerce.cart.retrieve().then((cart) => {
        setCart(cart);
        window.localStorage.setItem("cartTemp", JSON.stringify(cart));
      });
    } else {
      const url = "https://api.chec.io/v1/carts/" + user.cartID;
      axios
        .get(url, {
          headers: {
            "X-Authorization":
              "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
          },
        })
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    if (loginSuccess === false) {
      const { cart } = await commerce.cart.add(productId, quantity);
      window.localStorage.setItem("cartTemp", JSON.stringify(cart));
      setCart(cart);
    } else {
      const url = "https://api.chec.io/v1/carts/" + userLogin.cartID;
      axios
        .post(
          url,
          {
            id: productId,
            quantity: quantity,
          },
          {
            headers: {
              "X-Authorization":
                "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
            },
          }
        )
        .then((res) => {
          setCart(res.data.cart);
          window.localStorage.setItem(
            "cartTemp",
            JSON.stringify(res.data.cart)
          );
        });
    }
  };

  const handleUpdateCartQty = async (itemID, quantity) => {
    const cartTemp = window.localStorage.getItem("cartTemp");
    if (loginSuccess === false) {
      const url =
        "https://api.chec.io/v1/carts/" +
        JSON.parse(cartTemp).id +
        "/items/" +
        itemID;
      axios
        .put(
          url,
          {
            quantity: quantity,
          },
          {
            headers: {
              "X-Authorization":
                "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setCart(res.data.cart);
          window.localStorage.setItem(
            "cartTemp",
            JSON.stringify(res.data.cart)
          );
        });
    } else {
      const url =
        "https://api.chec.io/v1/carts/" + userLogin.cartID + "/items/" + itemID;
      axios
        .put(
          url,
          {
            quantity: quantity,
          },
          {
            headers: {
              "X-Authorization":
                "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
            },
          }
        )
        .then((res) => {
          console.log(res);
          setCart(res.data.cart);
          window.localStorage.setItem(
            "cartTemp",
            JSON.stringify(res.data.cart)
          );
        });
    }
  };

  const handleRemoveFromCart = async (itemID) => {
    if (loginSuccess === false) {
      const { cart } = await commerce.cart.remove(itemID);
      setCart(cart);
    } else {
      const url =
        "https://api.chec.io/v1/carts/" + userLogin.cartID + "/items/" + itemID;
      axios
        .delete(url, {
          headers: {
            "X-Authorization":
              "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
          },
        })
        .then((res) => {
          setCart(res.data.cart);
          window.localStorage.setItem(
            "cartTemp",
            JSON.stringify(res.data.cart)
          );
        });
    }
  };

  const getORDConfirm = () => {
    axios
      .get("http://localhost:8000/api/order/get_order/confirm")
      .then((res) => {
        setNumberConfirmOrder(res.data.number);
      })
      .catch((error) => console.log(error));
  };
  const handleEmptyCart = async () => {
    if (loginSuccess === false) {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } else {
      const url =
        "https://api.chec.io/v1/carts/" + userLogin.cartID + "/items/";
      axios
        .delete(url, {
          headers: {
            "X-Authorization":
              "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
          },
        })
        .then((res) => {
          setCart(res.data.cart);
          window.localStorage.setItem(
            "cartTemp",
            JSON.stringify(res.data.cart)
          );
        });
    }
  };

  const handleProductDetail = async (product) => {
    // console.log(product);
    // // setDetail(product);
  };

  const handleAfterCloseLogin = async (Type, user, checkLogin) => {
    if (checkLogin === true) {
      if (Type === "normal") {
        setURLAvatar(userLogin.url);
        window.localStorage.setItem("urlAvatar", JSON.stringify(userLogin.url));
        window.localStorage.setItem("user", JSON.stringify(userLogin));
        const cartTemp = window.localStorage.getItem("cartTemp");
        const url =
          "http://localhost:8000/api/user/update_cart/" + userLogin.userID;
        axios
          .put(url, {
            cartID: JSON.parse(cartTemp).id,
          })
          .then((response) => {
            console.log(response);
            SetUserLogin(response.data);
            window.localStorage.setItem("user", JSON.stringify(response.data));
            fetchCart(true, response.data);
            window.location.reload();
          });

        // console.log("user",userLogin)
        // fetchCart(checkLogin, userLogin);
      } else if (Type === "google") {
        setURLAvatar(userLogin.picture);
        window.localStorage.setItem(
          "urlAvatar",
          JSON.stringify(userLogin.picture)
        );
        const cartTemp = window.localStorage.getItem("cartTemp");
        if (JSON.parse(cartTemp) !== null) {
          axios
            .post("http://localhost:8000/api/user/add_user_external", {
              username: userLogin.name,
              email: userLogin.email,
              login_type: "google",
              password: " ",
              url: userLogin.picture,
              cartID: JSON.parse(cartTemp).id,
              userType: "user",
            })
            .then(async (response) => {
              window.location.reload();
              window.localStorage.setItem(
                "user",
                JSON.stringify(response.data.data)
              );
              SetUserLogin(response.data.data);
            })
            .catch((err) => {
              if (err.response.data.message === "Username is already exists") {
                axios
                  .post("http://localhost:8000/api/user/find_google_account", {
                    username: userLogin.name,
                    email: userLogin.email,
                  })
                  .then(async (res) => {
                    // SetUserLogin(res.data);
                    // window.localStorage.setItem(
                    //   "user",
                    //   JSON.stringify(res.data)
                    // );
                    // fetchCart(true, res.data);
                    const url =
                      "http://localhost:8000/api/user/update_cart/" +
                      res.data.userID;
                    axios
                      .put(url, {
                        cartID: JSON.parse(cartTemp).id,
                      })
                      .then((response) => {
                        console.log(response);
                        SetUserLogin(response.data);
                        window.localStorage.setItem(
                          "user",
                          JSON.stringify(response.data)
                        );
                        fetchCart(true, response.data);
                        window.location.reload();
                      });
                  });
              }
              console.log(err);
            });
        } else {
          commerce.cart.refresh().then((cart) => {
            axios
              .post("http://localhost:8000/api/user/add_user_external", {
                username: userLogin.name,
                email: userLogin.email,
                login_type: "google",
                password: " ",
                url: userLogin.picture,
                cartID: cart.id,
                userType: "user",
              })
              .then(async (response) => {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data)
                );
                SetUserLogin(response.data.data);
                window.location.reload();
                console.log(response.data);
              })
              .catch((err) => {
                if (
                  err.response.data.message === "Username is already exists"
                ) {
                  axios
                    .post(
                      "http://localhost:8000/api/user/find_google_account",
                      {
                        username: userLogin.name,
                        email: userLogin.email,
                      }
                    )
                    .then(async (res) => {
                      SetUserLogin(res.data);
                      window.localStorage.setItem(
                        "user",
                        JSON.stringify(res.data)
                      );
                      fetchCart(true, res.data);
                    });
                }
                console.log(err);
              });
          });
        }
      } else if (Type === "facebook") {
        setURLAvatar(userLogin.picture.data.url);
        window.localStorage.setItem(
          "urlAvatar",
          JSON.stringify(userLogin.picture.data.url)
        );
        const cartTemp = window.localStorage.getItem("cartTemp");
        console.log(JSON.parse(cartTemp));
        if (JSON.parse(cartTemp) !== null) {
          axios
            .post("http://localhost:8000/api/user/add_user_external", {
              username: userLogin.name,
              email: userLogin.email,
              login_type: "facebook",
              password: " ",
              url: userLogin.picture.data.url,
              cartID: JSON.parse(cartTemp).id,
              userType: "user",
            })
            .then(async (response) => {
              window.location.reload();
              window.localStorage.setItem(
                "user",
                JSON.stringify(response.data.data)
              );
              SetUserLogin(response.data.data);
            })
            .catch((err) => {
              if (err.response.data.message === "Username is already exists") {
                axios
                  .post(
                    "http://localhost:8000/api/user/find_facebook_account",
                    {
                      username: userLogin.name,
                      email: userLogin.email,
                    }
                  )
                  .then(async (res) => {
                    // SetUserLogin(res.data);
                    // window.localStorage.setItem(
                    //   "user",
                    //   JSON.stringify(res.data)
                    // );
                    // fetchCart(true, res.data);
                    const url =
                      "http://localhost:8000/api/user/update_cart/" +
                      res.data.userID;
                    axios
                      .put(url, {
                        cartID: JSON.parse(cartTemp).id,
                      })
                      .then((response) => {
                        console.log(response);
                        SetUserLogin(response.data);
                        window.localStorage.setItem(
                          "user",
                          JSON.stringify(response.data)
                        );
                        fetchCart(true, response.data);
                        window.location.reload();
                      });
                  });
              }
              console.log(err);
            });
        } else {
          commerce.cart.refresh().then((cart) => {
            axios
              .post("http://localhost:8000/api/user/add_user_external", {
                username: userLogin.name,
                email: userLogin.email,
                login_type: "google",
                password: " ",
                url: userLogin.picture.data.url,
                cartID: cart.id,
                userType: "user",
              })
              .then(async (response) => {
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data)
                );
                SetUserLogin(response.data.data);
                window.location.reload();
                console.log(response.data);
              })
              .catch((err) => {
                if (
                  err.response.data.message === "Username is already exists"
                ) {
                  axios
                    .post(
                      "http://localhost:8000/api/user/find_facebook_account",
                      {
                        username: userLogin.name,
                        email: userLogin.email,
                      }
                    )
                    .then(async (res) => {
                      SetUserLogin(res.data);
                      window.localStorage.setItem(
                        "user",
                        JSON.stringify(res.data)
                      );
                      fetchCart(true, res.data);
                    });
                }
                console.log(err);
              });
          });
        }
      }
      window.localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
    }
  };

  const getOrderDetail = async (
    orderID,
    shippingData,
    paymentType,
    date,
    status
  ) => {
    await commerce.checkout.getLive(orderID).then((response) => {
      // setTestOrder(old => [...old,orderID])

      const object = {
        orderID: orderID,
        orderDetail: response,
        shippingData: shippingData,
        paymentType: paymentType,
        date: date,
        status: status,
      };
      setOrderListUser((old) => [...old, object]);
      // console.log(object)
    });
  };

  const getOrderAdminDetail = async (
    orderID,
    shippingData,
    paymentType,
    date,
    status
  ) => {
    await commerce.checkout.getLive(orderID).then((response) => {
      // setTestOrder(old => [...old,orderID])

      const object = {
        orderID: orderID,
        orderDetail: response,
        shippingData: shippingData,
        paymentType: paymentType,
        date: date,
        status: status,
      };
      setOrderListAdmin((old) => [...old, object]);
      // console.log(object)
    });
  };

  function getorddetail(date) {
    const object = {
      date: date,
    };
    setOrderListUser((old) => [...old, object]);
  }

  const getOrderDataStatistic = () => {
    const url = "http://localhost:8000/api/order/statistic/months/" + "12";
    axios
      .get(url)
      .then(async function (response) {
        setOrdDataStatistic(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "390px",
      width: "810px",
      backgroundColor: "white",
      borderColor: "black",
    },
  };

  console.log(ordDataStatistic);
  function getProductAdmin() {
    const url = "http://localhost:8000/api/product";
    axios
      .get(url)
      .then(async function (response) {
        setProductDataStatistic(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  console.log(ProductDataStatistic);
  function getOrderCustomer(userID) {
    const url = "http://localhost:8000/api/order/find_order_cus/" + userID;
    axios
      .get(url)
      .then(async function (response) {
        // handle success
        setOrder(response.data.order);
        setIsLoading(true);
        for (var i = 0; i < response.data.order.length; i++) {
          await getOrderDetail(
            response.data.order[i].orderID,
            response.data.order[i].shippingData,
            response.data.order[i].paymentType,
            response.data.order[i].date,
            response.data.order[i].status
          );
          setIsLoading(false);
        }

        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function getCategoriesAdmin() {
    const url = "https://api.chec.io/v1/categories";
    axios
      .get(url, {
        headers: {
          "X-Authorization": "sk_451326b93cb3e4b4a7e3f853056401fccabf5fa7facfe",
        },
      })
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          const obj = {
            id: response.data.data[i].id,
            name: response.data.data[i].name,
          };
          setCategories((prev) => [...prev, obj]);
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  console.log("category", categories);
  function getOrderAdmin() {
    const url = "http://localhost:8000/api/order";
    axios
      .get(url)
      .then(async function (response) {
        // handle success
        // setOrder(response.data.order);
        setAdminOrder(response.data);
        setIsLoading(true);
        for (var i = 0; i < response.data.length; i++) {
          await getOrderAdminDetail(
            response.data[i].orderID,
            response.data[i].shippingData,
            response.data[i].paymentType,
            response.data[i].date,
            response.data[i].status
          );
          setIsLoading(false);
        }
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  // console.log(adminOrder);
  // console.log(orderListAdmin);
  // console.log("statistic", ordDataStatistic);

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Router>
      <div>
        <Navbar
          // totalItems={cart.total_items}
          handleSearchItem={searchProduct}
          products={products}
          setOpenModal={setModalOpen}
          LoginUser={userLogin}
          checkLogin={loginSuccess}
          setLogin={SetLoginSuccess}
          setLoginUser={SetUserLogin}
          typeLogin={loginType}
          avatarURL={urlAvatar}
          numberItem={cart.total_items}
          adminUser={admin}
          numberConfirmOrd={numberConfirmOrder}
        />

        {modalOpen === true ? (
          <Modal
            isOpen={modalOpen}
            style={customStyles}
            ariaHideApp={false}
            onAfterClose={() =>
              handleAfterCloseLogin(loginType, userLogin, loginSuccess)
            }
          >
            <LoginModal
              setOpenModal={setModalOpen}
              setLoginUser={SetUserLogin}
              setSuccessLogin={SetLoginSuccess}
              setTypeLogin={setLoginType}
              SetURL={setURLAvatar}
            />
          </Modal>
        ) : (
          <p></p>
        )}

        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              onAddToCart={handleAddToCart}
              onDetailProduct={handleProductDetail}
              handleFilterProduct={filterProduct}
              handleFilterCategory={filterCategory}
            />
          </Route>
          <Route exact path="/Signup">
            <SignUp />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              checkLogin={loginSuccess}
              setOpenModal={setModalOpen}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          {/* 
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              user={userLogin}
              setCart={setCart}
              setUser={SetUserLogin}
            />
            <Checkout />
          </Route> */}

          <Route
            path="/checkout"
            render={() => (
              <Checkout
                cart={cart}
                order={order}
                user={userLogin}
                setCart={setCart}
                setUser={SetUserLogin}
              />
            )}
          />

          <Route exact path="/detail/:productId">
            <ProductDetail ProductList={products} AddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/admin/statistic">
            <AdminStatistic
              ordStatistic={ordDataStatistic}
              productStatistic={ProductDataStatistic}
            />
          </Route>

          <Route exact path="/compare">
            <ProductCompare products={products} />
          </Route>

          <Route exact path="/order">
            <Orders orderList={orderListUser} isLoading={isLoading} />
          </Route>

          <Route exact path="/admin">
            <Admin numberConfirmORD={numberConfirmOrder} />
          </Route>

          <Route exact path="/admin/order">
            <AdminManageOrder
              orderList={orderListAdmin}
              isLoading={isLoading}
              ordStatistic={ordDataStatistic}
              numberConfirmORD={numberConfirmOrder}
              setNumberConfirmORD={setNumberConfirmOrder}
            />
          </Route>

          <Route exact path="/admin/manageproduct">
            <AdminManageProduct
              productList={products}
              handleSearchItem={searchProduct}
              categoriesProduct={categories}
            />
          </Route>
        </Switch>

        <p style={{ fontSize: "30px" }}>{}</p>
      </div>
    </Router>
  );
};

export default App;
