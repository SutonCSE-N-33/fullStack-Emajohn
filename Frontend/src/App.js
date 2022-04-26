import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/Not Found/NotFound';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';
import PrivateOutlet from './Components/PrivateOutlet/PrivateOutlet';
import { createContext, useState } from 'react';



export const userContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]} >
    <p>Email: {loggedInUser.email}</p>
     
      <Router>
         <Header></Header>
      <Routes>
         <Route path="/" element = {<Navigate to="/shop" />} />
         <Route path="/shop" element={<Shop />} />
         <Route  path="/review" element={<Review />} />
         
         <Route  path="/product/:productKey" element={<ProductDetails />}/>
         <Route path="/*" element={<PrivateOutlet />}>
             
             <Route  path="inventory" element={<Inventory />} />
         </Route>
         <Route path="/shipment" element={<Shipment />}></Route>
         <Route path="/login" element={<Login></Login>}/>
         <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </userContext.Provider>
  );
}

export default App;
