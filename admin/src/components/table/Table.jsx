import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import axios from "axios";
import dolar from "../../utils/tools";

const List = () => {
  const BaseUrlApi = "https://tudestinoapp-api-production.up.railway.app/api";

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {    
    // total reservas
    async function request () {
      const res = await axios.get(BaseUrlApi + "/payment/reservas/hoy")
         setRows(res.data);
    }
    request();
  }, []);
  
  // function dolar(value) {
  //   const formatter = value.toLocaleString("en", {
  //     style: "currency",
  //     currency: "USD"
  //   })
  //   return formatter
  // }

  return (
    <>
    <TableContainer component={Paper} className="table" sx={{ maxHeight: 440 }}>
      <Table  stickyHeader aria-label="sticky table">
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
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row._id}>
              
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  { row.image ?
                      <img src={row.image ? row.image : "https://res.cloudinary.com/djdp4cavt/image/upload/v1677536820/my-uploads/housewithgarden_gmbogq.png"} alt="" className="image" />
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
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default List;
