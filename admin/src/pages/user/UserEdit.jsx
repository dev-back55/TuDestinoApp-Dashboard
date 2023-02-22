import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import style from "./Useredit.module.css"
import "./list.scss"
import { useNavigate } from "react-router-dom";

const Edit = () => {
   const navigate = useNavigate();
   const { userId } = useParams();
   const BaseUrl = "https://tudestinoapp-production.up.railway.app/api"
   const [data, setData] = useState({});
   const [info, setInfo] = useState({});
   const [ newstatus, setNewstatus ] = useState("");
   const [ newadmin, setNewadmin ] = useState(""); 

   useEffect(() => {
      axios.get(`${BaseUrl}/users/${userId}`)
      .then (res => {
        setData(res.data);
        setNewstatus(data.isActive ? "true" : "false");
        setNewadmin(data.isAdmin ? "true" : "false");
      })
      .catch (err => {
        console.log(err)
      })
  }, [userId, data.isActive, data.isAdmin]);
  
  console.log("Data Admin", data.isAdmin)
  console.log("Data Active", data.isActive)
  console.log("New Admin", newadmin)
  console.log("New Status", newstatus)
   
     async function handleSelect(e){     
         console.log(e.target.value)
            // setNewstatus(e.target.value)
            
      const newInfo = {
         ...data,
         isActive: e.target.value,
      }
      console.log("aNTES AXIOS",newInfo)
         try {
            await axios.patch(`${BaseUrl}/users/${userId}/`, newInfo)
            .then (res => {
               // limpio objeto de datos
               alert("Datos Actualizados con Exito !!");
               
             })
          } catch (err) {console.log(err)}
      }  

      async function handleConfirmPromote(e){
         
            // setNewadmin(e.target.value)
            
            const newInfo = {
               ...data,
               isAdmin: e.target.value,
            }
            console.log("antes axios", newInfo)
               try {
                  await axios.patch(`${BaseUrl}/users/${userId}/`, newInfo)
                  .then (res => {
                     alert("Datos Actualizados con Exito !!");
                   })
                } catch (err) {console.log(err)}
      }
      
   async function handleConfirm(e){
      e.preventDefault();
               // limpio objeto de datos
               setInfo({});
               setNewstatus("");
               setNewadmin("");
         navigate("/users");
            
   }  

  return (
    <>   
    <div className={`list ${style.list}`}>
      <Sidebar/>
      <div className={`listContainer ${style.listContainer}`}>
         <div className={style.containeruser}>

            <div className = {style.header}>
              <Link to = {'/users'}>
                <button className = {style.goBack}>{'< Go Back'}</button>
              </Link>
            </div>

            <div className={style.userinfo}>
               <h2>Información del Usuario</h2>
               <div className="cellWithImg">
                  <img className="cellImg" src={data.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
                  Nombre: {data.username}
               </div>
               <div>
                  <span>Email: {data.email}</span>
               </div>
               <div>
                  <span>País: {data.country}</span>
               </div>
               <div>
              <span>Ciudad: {data.city}</span>
               </div>
               <div>
                  <span>Teléfono: {data.phone}</span>
               </div>  
            </div>
            <div className={style.useredit}>
               <div className = { `${data.isAdmin ? style.green : style.red}` }>
                  <span>ADMIN: {`${data.isAdmin ? "SI" : "NO"}`}</span>
               </div>
              <h2>Status</h2>
              <div className = { `${data.isActive ? style.green : style.red}` }>
                {`${data.isActive ? 'ACTIVE' : 'BANNED'}`}
              </div>
              <h3>Edit Status</h3>
              <div className={style.selectDiv}>
                  <select name="isActive"
                     value={data.isActive}
                     onChange={(e) => handleSelect(e)}>
                           <option value={true}>ACTIVE</option>
                           <option value={false}>BANED</option>
                  </select>
              </div>
              {
               !data.isAdmin && data.isActive &&
               <div className={style.inputDiv}>
                  <label>PROMOVER A ADMIN</label>
                  <select id="isAdmin"
                  value={data.isAdmin}
                   onChange={(e) => handleConfirmPromote(e)}>
                     <option value={false}>NO</option>
                     <option value={true}>SI</option>
                  </select>
               </div>
              }
              <button onClick={handleConfirm}>VOLVER</button>
              {/* <div className={style.inputDiv}>
                <input className={style.input} type="button" value="GUARDAR" onClick={handleConfirm}/>
              </div> */}
            </div>    
        </div>  
      </div>
    </div>
    </>
  )
}

export default Edit