import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import UserEdit from "./pages/user/UserEdit";
//import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { productColumns, userColumns } from "./datatablesource";
import NewProduct from "./pages/newProduct/NewProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import Single from "./pages/single/Single";


function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
              <Route path="users">
                <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>}/>
                <Route path=":userId" element={<ProtectedRoute><UserEdit /></ProtectedRoute>}/>
              </Route>
              <Route path="profile" element={<ProtectedRoute><Single title="Perfil Usuario" /></ProtectedRoute>}/>
            <Route path="products">
               <Route index element={<ProtectedRoute><List columns={productColumns} /></ProtectedRoute>}/>
               <Route path=":productId" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}/>
               <Route path="new" element={<ProtectedRoute><NewProduct  /></ProtectedRoute>}/>
               {/* <Route path="edit" element={<ProtectedRoute><EditProduct  /></ProtectedRoute>}/> */}
            </Route>
            {/* <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>}/>
              <Route path="new" element={<ProtectedRoute><NewRoom  /></ProtectedRoute>} />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
