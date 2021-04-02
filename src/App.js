import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import React, { createContext, useState } from "react";
import NotFound from './components/NotFound/NotFound';
import Admin from './components/Admin/Admin';
import AddProduct from './components/AddProduct/AddProduct';
import Orders from './components/Orders/Orders';
import ManageProduct from './components/ManageProduct/ManageProduct';
import EditProduct from './components/EditProduct/EditProduct';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path = "/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <Route path="/addProduct">
            <AddProduct></AddProduct>
          </Route>
          <Route path="/manageProduct">
            <ManageProduct></ManageProduct>
          </Route>
          <Route path="/editProduct">
            <EditProduct></EditProduct>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>  
  );
}

export default App;
