import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./CustomTextField";
import dataShipping from "./DataAddress.json";

const DeliveryForm = ({ next }) => {
  const methods = useForm();
  const [shippingCities, setShippingCities] = useState([
    { code: "", name: "" },
  ]);
  const [shippingCity, setShippingCity] = useState("");
  const [shippingDistricts, setShippingDistricts] = useState([
    { name: "", pre: "", fullName: "" },
  ]);
  const [shippingDistrict, setShippingDistrict] = useState("");
  const [shippingWards, setShippingWards] = useState([
    { name: "", pre: "", fullName: "" },
  ]);
  const [shippingWard, setShippingWard] = useState("");

  const warning = "⚠️";
  const onSubmit = (data) => console.log(data);

  function getDistrictOfCity(value) {
    var district = [];
    for (var i = 0; i < dataShipping.length; i++) {
      if (dataShipping[i].code == value) {
        for (var k = 0; k < dataShipping[i].district.length; k++) {
          var object = { name: "", pre: "", fullName: "" };
          object.name = dataShipping[i].district[k].name;
          object.pre = dataShipping[i].district[k].pre;
          object.fullName =
            dataShipping[i].district[k].pre +
            " " +
            dataShipping[i].district[k].name;
          district.push(object);
        }
      }
      setShippingDistricts(district);
    }
  }

  function getWardOfDistrict(city, district) {
    var wards = [];
    for (var i = 0; i < dataShipping.length; i++) {
      if (dataShipping[i].code == city) {
        for (var j = 0; j < dataShipping[i].district.length; j++) {
          if (dataShipping[i].district[j].name == district) {
            for (var k = 0; k < dataShipping[i].district[j].ward.length; k++) {
              var object = { name: "", pre: "", fullName: "" };
              object.name = dataShipping[i].district[j].ward[k].name;
              object.pre = dataShipping[i].district[j].ward[k].pre;
              object.fullName =
                dataShipping[i].district[j].ward[k].pre +
                " " +
                dataShipping[i].district[j].ward[k].name;
              wards.push(object);
            }
            setShippingWards(wards);
          }
        }
      }
    }
  }

  const fetchShippingCities = () => {
    var city = [];

    for (var i = 0; i < dataShipping.length; i++) {
      var object = { code: "", name: "" };
      object.code = dataShipping[i].code;
      object.name = dataShipping[i].name;
      city.push(object);
    }
    setShippingCities(city);
  };

  useEffect(() => {
    fetchShippingCities();
    getWardOfDistrict(shippingCity, shippingDistrict);
  }, [shippingCity, shippingDistrict]);

  const handleInputChangeCity = (e) => {
    e.preventDefault();
    setShippingCity(e.target.value);

    getDistrictOfCity(e.target.value);
  };

  const handleInputChangeDistrict = (e) => {
    e.preventDefault();
    setShippingDistrict(e.target.value);
  };

  const handleInputChangeWard = (e) => {
    setShippingWard(e.target.value);
  };

  const [checkSubmit, setCheckSubmit] = useState(false);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log("test", data);
            if (shippingCity == "") {
              console.log("can not submit because city null");
            } else {
              if (shippingDistrict == "") {
                console.log("can not submit because District null");
              } else {
                if (shippingWard == "") {
                  console.log("can not submit because Ward null");
                } else {
                  next({
                    ...data,
                    shippingCity,
                    shippingDistrict,
                    shippingWard,
                  });
                }
              }
            }
          })}
        >
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="phone" label="Phone" />
            <Grid item xs={12} sm={6} color="primary">
              <div style={{ display: "flex" }}>
                {checkSubmit == true && shippingCity == "" ? (
                  <div
                    style={{
                      color: "yellow",
                      fontSize: "20px",
                      marginTop: "-12px",
                    }}
                  >
                    {warning}
                  </div>
                ) : (
                  <p></p>
                )}

                <InputLabel disabled={true} color="primary">
                  City
                </InputLabel>
              </div>
              <Select
                value={shippingCity}
                fullWidth
                onChange={(e) => handleInputChangeCity(e)}
              >
                {shippingCities.map((city) => (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ display: "flex" }}>
                {checkSubmit == true && shippingDistrict == "" ? (
                  <div
                    style={{
                      color: "yellow",
                      fontSize: "20px",
                      marginTop: "-12px",
                    }}
                  >
                    {warning}
                  </div>
                ) : (
                  <p></p>
                )}
                <InputLabel>District</InputLabel>
              </div>
              <Select
                value={shippingDistrict}
                fullWidth
                onChange={(e) => handleInputChangeDistrict(e)}
              >
                {shippingDistricts.map((district) => (
                  <MenuItem key={district.name} value={district.name}>
                    {district.fullName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ display: "flex" }}>
                {checkSubmit == true && shippingWard == "" ? (
                  <div
                    style={{
                      color: "black",
                      fontSize: "20px",
                      marginTop: "-12px",
                    }}
                  >
                    {warning}
                  </div>
                ) : (
                  <p></p>
                )}
                <InputLabel>Ward</InputLabel>
              </div>
              <Select
                value={shippingWard}
                fullWidth
                onChange={(e) => handleInputChangeWard(e)}
              >
                {shippingWards.map((ward) => (
                  <MenuItem key={ward.name} value={ward.name}>
                    {ward.fullName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setCheckSubmit(true)}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default DeliveryForm;
