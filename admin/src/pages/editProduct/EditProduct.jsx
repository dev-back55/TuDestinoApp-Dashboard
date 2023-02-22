import "./editProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
//import Navbar from "../../components/navbar/Navbar";
//import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
//import { productInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";

const EditProduct = () => {

  const navigate = useNavigate();
  const BaseUrl = "https://tudestinoapp-api-production.up.railway.app/api"
  //const [files, setFiles] = useState("");
  const [fotos, setFotos] = useState([]);
  const [info, setInfo] = useState({});
  const { productId } = useParams();
      
   console.log("Id de Params", productId);
   //const [data, setData] = useState([]);

   useEffect(() => {
      axios.get(`${BaseUrl}/products/${productId}`)
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
  };

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setRooms(value);
  // };
  // const handleStatus = (e) => {
  //   setFotos([]);
  //   setFiles(e.target.files);
  //   console.log("Status fotos:", fotos);
  //   console.log("Status files:", files);

  // }

  const handleCancel = () => {
    setFotos([]);
    setInfo({});  
    navigate("/products");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // const list = await Promise.all(
      //   Object.values(files).map(async (file) => {
      //     const data = new FormData();
      //     data.append("file", file);
      //     data.append("upload_preset", "myuploads");
      //     const uploadRes = await axios.post(
      //       "https://api.cloudinary.com/v1_1/djdp4cavt/image/upload",
      //       data
      //     );

      //     const { url } = uploadRes.data;
      //     return url;
      //   })
      // );

      const newproduct = {
        ...info,
      };
      console.log("New Product",newproduct);
      await axios.patch(`${BaseUrl}/products/${productId}`, newproduct);
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
                  <label>Título</label>
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
                <select id="gym" onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>

              <div className="formInput">
                <label>Pileta : {info.swimmingPool ? "SI" : "NO"}</label>
                <select id="swimmingPool" onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>

              <div className="formInput">
                <label>Tipo Producto : {info.productType}</label>
                <select id="productType" onChange={handleChange}>
                  <option value="house">Casa</option>
                  <option value="apartment">Departamento</option>
                  <option value="bedroom">Habitación</option>
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
