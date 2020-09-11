import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Error from './components/Error/Error';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const userContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
            <Route exact path="/">
              <Shop/>
            </Route>
            <Route exact path="/shop/">
              <Shop />
            </Route>
            <Route exact path="/review/">
              <Review/>
            </Route>
            <PrivateRoute exact path="/manage/">
                <Manage />
            </PrivateRoute> 
            <PrivateRoute exact path="/shipment/">
                <Shipment/>
            </PrivateRoute> 
            <Route exact path="/login/">
                <Login/>
            </Route> 
            <Route exact path="/product/:productKey">
                <ProductDetails/>
            </Route>          
            <Route path="*">
              <Error/>
            </Route>
        </Switch>
      </Router>     
    </userContext.Provider>
  );
}

export default App;
