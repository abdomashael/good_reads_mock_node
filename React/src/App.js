import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import'mdbreact/dist/css/mdb.css';
import './App.css';
import MainNavBar from './components/MainNavBar/mainNavBar'
import HotBooks from './components/HotBooks/HotBooks'
import ListingCatogries from "./components/ListingCatogries/ListingCatogries"
import Author from './components/Author/Author'
import {Navbar,Button , Nav , Form,FormControl} from 'react-bootstrap';
import ListingAuthors from './components/ListingAuthors/ListingAuthors';
import PaginationCompo from './components/Pagentaion/Pagentaion'
import ListingBooks from './components/ListingBooks/ListingBooks'

function App() {
  return (
    <div className="App">
        <MainNavBar></MainNavBar>
        <ListingBooks></ListingBooks>
        {/* <Button variant="light" className="btn">Popular books</Button> 
        <HotBooks></HotBooks>
        <ListingCatogries></ListingCatogries> */}
          {/* <ListingAuthors></ListingAuthors>  */}
         {/* <Author></Author> */}
        {/* <PaginationCompo></PaginationCompo> */}
    </div>
  );
}

export default App;