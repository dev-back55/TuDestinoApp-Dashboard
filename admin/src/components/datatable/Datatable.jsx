import React from 'react';
import "./datatable.scss";
import { DataGrid,  gridClasses} from "@mui/x-data-grid";
//import { grey } from '@mui/material/colors';
import { BaseUrlApi } from "../../config.js";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const Datatable = ({columns}) => {
  
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path)
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
      axios.get(`${BaseUrlApi}/${path}`)
      .then (res => {
        console.log("data:", res.data)
        setData(res.data);
      })
      .catch (err => {
        console.log(err)
      })
  }, [path]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BaseUrlApi}/${path}/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {console.log(err)}
  };

  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Editar</div>
            </Link>
            {
              path === "products" ?
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row._id)}
                >
                  Borrar
                </div>
              : null
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Tabla de {path}
        {
          path === "products" ?
          
            <Link to={`/${path}/new`} className="link">
              NUEVO +
            </Link>
            
          : null  
        }
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row._id}
        GridColDef="left"
        sx={{ color: 'text.primary' }}

      />
    </div>
  );
};

export default Datatable;
