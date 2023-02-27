import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./single.scss";                                                                                                             
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Single = () => {
  const { user } = useContext(AuthContext);
  console.log("Usuario :",user._id)
   const BaseUrlApi = "https://tudestinoapp-api-production.up.railway.app/api"
   const [data, setData] = useState({});

//    useEffect(() => {
//     axios.get(`${BaseUrlApi}/users/${user._id}`)
//     .then (res => {
//       setData(res.data);
//     })
//     .catch (err => {
//       console.log(err)
//     })
// }, [user._id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Perfil Usuario</h1>
            <div className="item">
              <img
                src={user.image ? user.image : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefono:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">País:</span>
                  <span className="itemValue">{user.country}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ciudad:</span>
                  <span className="itemValue">{user.city}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default Single;
