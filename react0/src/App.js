import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import { Navbar, Button, Nav, Form, FormControl } from 'react-bootstrap';

import { NavLink, Link, Route, BrowserRouter as Router ,Switch} from 'react-router-dom';

import AdminPanel from './components/AdminPanel/AdminPanel'
import MainNavBar from './components/MainNavBar/mainNavBar'
import HotBooks from './components/HotBooks/HotBooks'
import ListingCategories from "./components/ListingCategories/ListingCategories"
import Author from './components/Author/Author'
import ListingAuthors from './components/ListingAuthors/ListingAuthors';
import PaginationCompo from './components/Pagentaion/Pagentaion'
import ListingBooks from './components/ListingBooks/ListingBooks'
import HomePage from './components/HomePage/HomePage'
import WelcomePage from './components/welcomePage/welcomePage';
import Footer from './components/footer/footer';
import Categories from './components/categories/categories'
import BookProfile from './components/bookProfile/bookProfile';
import CategoryProfile from './components/categoryProfile/categoryProfile';
import UserProfilePage from './components/UserProfilePage/UserProfilePage'
import NewNavBar from './components/NewNavBar/NewNavBar'
import NewCategories from './components/NewCategories/NewCategories'
import LoadingPage from './components/LoadingPage/LoadingPage'

function App() {
  return (

    <Router>
      <div className="App">
        {/* <MainNavBar></MainNavBar> */}
        <NewNavBar></NewNavBar>
        <Switch>
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/HomePage" component={HomePage} />

          <Route path="/ListingAuthors" component={ListingAuthors} />
          <Route path="/ListingBooks" component={ListingBooks} />
          <Route path="/ListingCategories" component={ListingCategories} />

          {/* <Route path="/" exact component={WelcomePage} /> */}
          
          <Route path="/bookprofile" component={BookProfile} />
          <Route path="/author" component={Author} />
          <Route path="/categorypage" component={CategoryProfile} />
          
        </Switch>
        {/* <ListingCategories></ListingCategories> */}
        {/* <ListingBooks></ListingBooks> */}
        {/* <Categories></Categories> */}
        {/* <LoadingPage></LoadingPage> */}
        {/* <AdminPanel></AdminPanel> */}
        {/* <UserProfilePage></UserProfilePage> */}
        {/* <ListingBooks></ListingBooks> */}
        {/* <NewCategories></NewCategories> */}
        {/* <HomePage></HomePage> */}
        {/* <ListingAuthors></ListingAuthors>  */}
        {/* <Author></Author> */}
        {/* <PaginationCompo></PaginationCompo> */}

        {/* <Footer></Footer> */}
      </div>
    </Router>
  )
}



export default App;
