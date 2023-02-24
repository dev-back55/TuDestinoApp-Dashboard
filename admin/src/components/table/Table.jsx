import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const List = () => {
  const BaseUrlApi = "https://tudestinoapp-api-production.up.railway.app/api";

  const [rows, setRows] = useState([]);

  useEffect(() => {    
    // total reservas
    async function request () {
      const res = await axios.get(BaseUrlApi + "/payment/reservas/hoy")
         setRows(res.data);
    }
    request();
  }, []);
  
  function dolar(value) {
    const formatter = value.toLocaleString("en", {
      style: "currency",
      currency: "USD"
    })
    return formatter
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell className="tableCell">Cliente</TableCell>
            <TableCell className="tableCell">Estadia</TableCell>
            <TableCell className="tableCell">Inicio</TableCell>
            <TableCell className="tableCell">Final</TableCell>
            <TableCell className="tableCell">Precio USD</TableCell>
            <TableCell className="tableCell">Total USD</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  { row.image ?
                      <img src={row.img} alt="" className="image" />
                    : null
                  }
                  {row.numberEvening}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.dateInit.split(/[-/]/).reverse().join("-")}</TableCell>
              <TableCell className="tableCell">{row.dateEnd.split(/[-/]/).reverse().join("-")}</TableCell>
              <TableCell className="tableCell">{dolar(row.price)}</TableCell>
              <TableCell className="tableCell">{dolar(row.total)}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
