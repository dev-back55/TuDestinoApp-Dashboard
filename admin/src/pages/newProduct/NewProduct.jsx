import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { productInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const NewProduct = () => {
  const navigate = useNavigate();
  const BaseUrl = "https://tudestinoapp-production.up.railway.app/api"
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  

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
  
  console.log(files)

  const handleCancel = () => {
    setInfo({});
    setFiles("");  
    navigate("/products");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "myuploads");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/djdp4cavt/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newproduct = {
        ...info,
        image: list,
      };
      console.log("New Product",newproduct);
      await axios.post(`${BaseUrl}/products/`, newproduct);
      // limpio objeto de datos
      setInfo({});
      setFiles("");
      alert("Nuevo Producto agregado con exito !")
      navigate("/products");

    } catch (err) {console.log(err)}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Ingresar Producto</h1>
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
              {
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
                )
                )
              }
            </ul>
          </div>
          <div className="right">
            <form>
              <div className="formInput">
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
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              
              <div className="formInput">
                <label>Gym</label>
                <select id="gym" onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>

              <div className="formInput">
                <label>Pileta</label>
                <select id="swimmingPool" onChange={handleChange}>
                  <option value={false}>NO</option>
                  <option value={true}>SI</option>
                </select>
              </div>

              <div className="formInput">
                <label>Tipo Producto</label>
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

export default NewProduct;
