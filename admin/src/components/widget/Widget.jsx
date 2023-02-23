import React, { useEffect, useState } from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
  let data;
  const BaseUrlApi = "https://tudestinoapp-api-production.up.railway.app/api"
  //const BaseApi = "http://localhost:5001/api"
  //temporary
  const diff = 20;

  const [qtyusers, setQtyusers] = useState(0)
  const [qtypayments, setQtypayments] = useState(0)
  const [totpayments, setTotpayments] = useState([])

  useEffect(() => {
    // total usuarios
    async function request () {
      const res = await axios.get(BaseUrlApi + "/users/count/count")
      const response = await res.data  
      setQtyusers(response);
      
    // total reservas
      const res2 = await axios.get(BaseUrlApi + "/payment/count/count")
         setQtypayments(res2.data);
      
     // Total ventas
       const res3 = await axios.get(BaseUrlApi + "/payment/sum/totalpayment")
         setTotpayments(res3.data); 
     
    }
    request();
}, []);

// console.log(qtyusers)
// console.log(qtypayments)
// console.log(totpayments[0].total)

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        isMoney: false,
        link: "Ver todos",
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
        title: "RESERVAS",
        isMoney: false,
        link: "Ver más",
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
        title: "VENTAS",
        isMoney: true,
        link: "Ver todas",
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
        title: "GANANCIAS",
        isMoney: true,
        link: "Ver más",
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
          {data.title === "USUARIOS" && `${qtyusers}`}
          {data.title === "RESERVAS" && `${qtypayments}`}
          {data.title === "VENTAS" && `${totpayments[0].total}`}
          {data.title === "GANANCIAS" && `${(totpayments[0].total*0.20).toFixed(2)}`}

        </span>
        <Link to={data.goto}>
        {/* <span className="link">{data.link}</span> */}
        {data.link}
        </Link>
      </div>
      <div className="right">
      {data.title === "GANANCIAS" && 

        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
      }
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
