import React,{useState} from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import Login from '../components/forms/Login';
import Addfirm from '../components/forms/Addfirm';
import Register from '../components/forms/Register';
import AddProduct from '../components/forms/AddProduct';
import AllProducts from '../components/AllProducts';  
import UserDetails from '../components/UserDetails';
import Welcome from '../components/Welcome';
const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(""); // Single state for active section
  const showLoginHandler = () => setActiveSection(activeSection === "login" ? "" : "login");
  const showRegisterHandler = () => setActiveSection(activeSection === "register" ? "" : "register");
  const showAddFirmHandler = () => setActiveSection(activeSection === "addFirm" ? "" : "addFirm");
  const showAddProductHandler = () => setActiveSection(activeSection === "addProduct" ? "" : "addProduct");
  const showAllProductsHandler = () => setActiveSection(activeSection === "allProducts" ? "" : "allProducts");
  const showUserDetailsHandler = () => setActiveSection(activeSection === "userDetails" ? "" : "userDetails");
  const showWelcomeHandler = () => setActiveSection(activeSection === "welcome" ? "" : "welcome");
  return (
    <div className="landingPage">
      <NavBar  showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}/>
      <div className="collectionSection">
        <SideBar showAddFirmHandler={showAddFirmHandler} showAddProductHandler={showAddProductHandler} showAllProductsHandler={showAllProductsHandler} showUserDetailsHandler={showUserDetailsHandler}/>
        <div className="authContainer">
           {activeSection === "login" && <Login showWelcomeHandler={showWelcomeHandler}/>}
           {activeSection === "register" && <Register showLoginHandler={showLoginHandler} />}
           {activeSection === "addFirm" && <Addfirm />}
           {activeSection === "addProduct" && <AddProduct />}
           {activeSection === "allProducts" && <AllProducts />}
           {activeSection === "userDetails" && <UserDetails />}
           {activeSection === "welcome" && <Welcome/>}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
