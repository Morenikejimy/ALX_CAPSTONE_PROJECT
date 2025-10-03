import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import  Profile from "./pages/Profile";
import ReadBook from "./pages/ReadBook";
import AgeGroupCard from "./components/AgeGroupCard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserInfo from "./components/UserInfo";

function App() {
  return (
      <Routes>
         <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:ageGroupId" element={<BookList />} />
      </Routes>
      
  );
}

export default App;
