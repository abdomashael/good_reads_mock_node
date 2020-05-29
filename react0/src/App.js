import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage/registrationPage';
import ListingCategories from "./components/ListingCategories/ListingCategories"
import AdminPanel from './components/AdminPanel/AdminPanel';
import MainNavBar from './components/MainNavBar/mainNavBar';
import HotBooks from './components/HotBooks/HotBooks';
import Author from './components/Author/Author';
import ListingAuthors from './components/ListingAuthors/ListingAuthors';
import PaginationCompo from './components/Pagentaion/Pagentaion';
import ListingBooks from './components/ListingBooks/ListingBooks';
import HomePage from './components/HomePage/HomePage';
import WelcomePage from './components/welcomePage/welcomePage';
import Footer from './components/footer/footer';
import Categories from './components/categories/categories';
import BookProfile from './components/bookProfile/bookProfile';
import CategoryProfile from './components/categoryProfile/categoryProfile';
import UserProfilePage from './components/UserProfilePage/UserProfilePage'
import NewNavBar from './components/NewNavBar/NewNavBar'
import NewCategories from './components/NewCategories/NewCategories'
import LoadingPage from './components/LoadingPage/LoadingPage'
import SearchPage from "./components/SearchPage/SearchPage";
import AdminLoginPage from "./components/AdminPanel/AdminLogin/AdminLogin"
import NotFound from './components/NotFound';

const App = (props) => {
  console.log(window.location.pathname);
  if (window.location.pathname == "/") {
    return (
      <Router>
        <div className="App">
        <Switch>
            <Route path="/" exact component={WelcomePage} />
          </Switch>
          <Footer></Footer>
        </div>
      </Router>
    )
  }
  else {
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
            <Route path="/author/:authorId" component={Author} />
            <Route path="/admin" component={AdminLoginPage}/>
            <Route path="/adminpanel" component={AdminPanel}/>
            <Route path="/Registration" exact component={RegistrationPage} />
            <Route path="/categories" component={Categories} />
             <Route path="/search" component={SearchPage} />
            <Route path="/bookprofile/:bookId" component={BookProfile} />
            <Route path="/categorypage/:categoryId" component={CategoryProfile} />
            <Route path="/userprofile" component={UserProfilePage} />
            <Route path="*" component={NotFound} />
          </Switch>
         

          <Footer></Footer>
        </div>
      </Router>
    )
  }
}

export default App;
