import { Routes, Route } from "react-router-dom";
import logo from "./assets/logo.png";
import agegroup from "./assets/agegroup.png";
import searchIcon from "./assets/searchicon.png";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import ReadBook from "./pages/ReadBook";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserInfo from "./components/UserInfo";

function App() {
  return (
      <Routes>
         <Route path="/" element={<Home />}/>
          <Route path="/books/:categoryId" element={<BookList />} />
          <Route path="/Home/:ageGroupId" element={<BookList />} />
      </Routes>
      
  );
}

export default App;
