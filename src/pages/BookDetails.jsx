import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooksByCategory } from "../api/bookApi";
import Navbar from "../components/Navbar";

function BookDetails() {
  const {categoryId , bookId} = useParams(); // 👈 Grab the category and Book ID from URL
  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookDetails(categoryId, bookId)
      .then((data) => {
        setBookDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load books");
        setLoading(false);
      });
  }, [categoryId, bookId]);
  console.log(bookDetails);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Books in Category {categoryId}
        </h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* {books.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow bg-white">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div> */}
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
