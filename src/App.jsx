import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import ReadBook from "./pages/ReadBook";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:categoryId" element={<BookList />} />
      <Route path="/Home/:ageGroupId" element={<BookList />} />
      <Route path="/search" element={<SearchResults />} />
      <Route
        path="/book-details/:categoryId/:bookId"
        element={<BookDetails />}
      />
      <Route
        path="/read-book/:categoryId/:bookId/:chapterNumber"
        element={<ReadBook />}
      />
    </Routes>
  );
}

export default App;
