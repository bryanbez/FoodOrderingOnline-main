import React from 'react'
import Navbar from './components/Navbar.jsx'
import Homepage from './pages/AdminPage/Homepage'
import AboutPage from './pages/AdminPage/About.jsx'
import StorePage from './pages/AdminPage/Store.jsx'
import AddFoodComponent from './pages/AdminPage/AddFood.jsx'
import ViewFoodDetails from './components/Food/ViewFoodDetails.jsx'
import FoodList from './pages/StorePage/FoodList.jsx'
import Profile from './pages/StorePage/Profile.jsx'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import EditFoodDetails from './components/Food/EditFoodDetails.jsx'
import Register from './pages/StorePage/Register.jsx'
import LoginForm from './components/Authentication/LoginForm.jsx'
import EditProfile from './components/Profile/EditProfile.jsx'
import ViewFoodDetailsSKU from './components/Food/ViewFoodDetailsSKU.jsx'
import Favorites from './pages/StorePage/Favorites.jsx'
import Cart from './pages/StorePage/Cart.jsx'

function App() {
  return (
    <Router>
       <div className="App">
        <Navbar />
        <Switch>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/store" exact component={StorePage}></Route>
            <Route path="/store/add" component={AddFoodComponent}></Route>
            <Route path="/about" exact component={AboutPage}></Route>
            <Route path="/store/:id/view" component={ViewFoodDetails}></Route>
            <Route path="/store/:id/edit" component={EditFoodDetails}  ></Route>
            {/* Store Page */}
            <Route path="/store/list" exact component={FoodList}></Route>
            <Route path="/food/:sku" component={ViewFoodDetailsSKU}></Route>
            {/* Profile Page */}
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/profile/:id/edit" exact component={EditProfile}></Route>
            {/* Authentication Page */}
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={LoginForm}></Route>
            {/* Favorite Page */}
            <Route path="/favorites" exact component={Favorites}></Route>
            {/* Cart Page */}
            <Route path="/cart" exact component={Cart}></Route>
        </Switch>
      </div>
    </Router>

   
  );
}



export default App;
