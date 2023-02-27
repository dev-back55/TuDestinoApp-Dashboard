import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const fechaHoy = new Date().toISOString().slice(0, 10); 
  return (
    <div className="home">
      <Sidebar user={user}/>
      <div className="homeContainer">
        <Navbar user={user}/>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        <div className="listContainer">
          <div className="listTitle">Últimas Reservas - {fechaHoy.split(/[-/]/).reverse().join("-")}</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
