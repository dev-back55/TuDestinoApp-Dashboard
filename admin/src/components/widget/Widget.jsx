import React, { useEffect, useState } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BaseUrlApi } from "../../config.js";

const Widget = ({ type }) => {
  let data;
  
  //temporary
  const amount = 100;
  const diff = 20;

  const [qtyusers, setQtyusers] = useState(0)

  useEffect(() => {
    // axios.get(`${BaseUrl}/users/count/count`)
    axios.get(BaseUrlApi + "/users/count/count")
    .then (res => {
      setQtyusers(res.data);
      
    })
    .catch (err => {
      console.log(err)
    })
}, []);
console.log(qtyusers)
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        goto: "/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "#76FF03",
              backgroundColor: "#78909C",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {/* {data.isMoney && "$"} {amount} */}
          {data.title === "USERS" && `${qtyusers}`}
        </span>
        <Link to={data.goto}>
        {/* <span className="link">{data.link}</span> */}
        {data.link}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
