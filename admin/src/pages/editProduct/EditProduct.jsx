import React from "react";
import "./editProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import Navbar from "../../components/navbar/Navbar";
//import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";

const EditProduct = () => {

  const navigate = useNavigate();
  const BaseUrlApi = "https://tudestinoapp-api-production.up.railway.app/api"
  //const [files, setFiles] = useState("");
  const [fotos, setFotos] = useState([]);
  const [info, setInfo] = useState({});
  const { productId } = useParams();
      
   useEffect(() => {
      axios.get(`${BaseUrlApi}/products/${productId}`)
      .then (res => {
        setInfo(res.data);
        setFotos(res.data.image);
        
      })
      .catch (err => {
        console.log(err)
      })
  }, []);
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(e.target.id," : ", e.target.value)
  };

  const handleCancel = () => {
    setFotos([]);
    setInfo({});  
    navigate("/products");
  }

  async function handleSelect(e){   
    
    console.log("handleselect :",e.target.value)
       
    const newproduct = {
        ...info,
        isActive: e.target.value,
    }
    console.log("aNTES AXIOS",newproduct)
        try {
          await axios.patch(`${BaseUrlApi}/products/${productId}/`, newproduct)
          .then (res => {
              // limpio objeto de datos
              alert("Producto Cambio de Estado con Exito !!");
              setInfo({});
              setFotos([]);
              navigate("/products");

            })
        } catch (err) {console.log(err)}
  }

  async function handleClick(e){
    e.preventDefault()
        
    const newproduct = {
      ...info,
    }
    console.log("CLICK aNTES AXIOS",newproduct)
    try {
      await axios.patch(`${BaseUrlApi}/products/${productId}`, newproduct);
      // limpio objeto de datos
      setInfo({});
      setFotos([]);
      alert("Producto Actualizado con exito !")
      navigate("/products");

    } catch (err) {console.log(err)}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Editar Producto</h1>
        </div>
        <div className="bottom">
          <div className="left">
          {/* <img
                      src={
                        files
                          ? URL.createObjectURL(files[0])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    /> */}
            <ul>
              {/* { fotos ? */}

                 { fotos.map((image, i) => (
                    <li key={i}>
                      <img
                        src={
                          fotos
                            ? (fotos[i])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt={image}
                      />

                    </li>
                  ))}
              {/* :
              Object.values(files).map((image, i) => (
                <li key={i}>
                  <img
                    src={
                      files
                        ? URL.createObjectURL(files[i])
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt={image}
                  />

                </li>
              ))
              } */}
                    
              
            </ul>
          </div>
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Subir Fotos: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div> */}

              <div className="formInput" >
                  <label>Producto</label>
                  <input
                    id="title"
                    onChange={handleChange}
                    type="text"
                    placeholder={info.title}
                  />
                </div>

                <div className="formInput" >
                  <label>País</label>
                  <input
                    id= "country"
                    onChange={handleChange}
                    type="text"
                    placeholder={info.country}
                  />
                </div>
                <div className="formInput" >
                  <label>Ciudad</label>
                  <input
                    id= "city"
                    onChange={handleChange}
                    type="text"
                    placeholder={info.city}
                  />
                </div>
                <div className="formInput" >
                  <label>Dirección</label>
                  <input
                    id= "address"
                    onChange={handleChange}
                    type="text"
                    placeholder={info.address}
                  />
                </div>
                <div className="formInput" >
                  <label>Descripción</label>
                  <input
                    id= "description"
                    onChange={handleChange}
                    type="text"
                    placeholder={info.description}
                  />
                </div>
                <div className="formInput" >
                  <label>Cant. Personas</label>
                  <input
                    id= "maxPeople"
                    onChange={handleChange}
                    type="number"
                    placeholder={info.maxPeople}
                  />
                </div>
                <div className="formInput" >
                  <label>Precio</label>
                  <input
                    id= "price"
                    onChange={handleChange}
                    type="number"
                    placeholder={info.price}
                  />
                </div>
                <div className="formInput" >
                  <label>Habitaciones</label>
                  <input
                    id= "numberBedrom"
                    onChange={handleChange}
                    type="number"
                    placeholder={info.numberBedrom}
                  />
                </div>
                <div className="formInput" >
                  <label>Baños</label>
                  <input
                    id= "numberBathroom"
                    onChange={handleChange}
                    type="number"
                    placeholder={info.numberBathroom}
                  />
                </div>
             
              <div className="formInput">
                <label>Gym : {info.gym ? "SI" : "NO"}</label>
                <select id="gym"
                value={info.gym} onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>

              <div className="formInput">
                <label>Pileta : {info.swimmingPool ? "SI" : "NO"}</label>
                <select id="swimmingPool"
                value={info.swimmingPool} onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>


              <div className="formInput">
                <label>Tipo Producto : {info.productType}</label>
                <select id="productType" 
                value={info.productType} onChange={handleChange}>
                  <option value="house">Casa</option>
                  <option value="apartment">Departamento</option>
                  <option value="bedroom">Habitación</option>
                </select>
              </div>

              <div className="formInput">
                <label>Activo : {info.isActive ? "SI" : "NO"}</label>
                <select id="isActive"
                  value={info.isActive} onChange={(e) => handleSelect(e)}>
                  <option value={true}>SI</option>
                  <option value={false}>NO</option>
                </select>
              </div>
              
              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>GUARDAR</button>
              <button onClick={handleCancel}>CANCELAR</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
