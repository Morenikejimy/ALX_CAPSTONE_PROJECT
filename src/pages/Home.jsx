import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AgeGroupCard from "../components/AgeGroupCard";
// import the API functions
import { getAllCategories, getBooksByCategory } from "../api/bookApi"; 
import ageGroupImage from "../assets/agegroup.png";

function Home() {
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 


  // to fetch categories when the page loads
  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-pink-600">Welcome Book Nerd 📚</h1>
        <p className="text-gray-600">Explore a world of books tailored just for you!</p>
      </div>

    {/* error messages */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show Categories if none is selected */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {categories.map((cat) => (
            <AgeGroupCard
              key={cat.id}
              title={cat.ageGroup}
              description={cat.description}
              id={cat.id} 
            />
          ))}
        </div>
      )}

      {/* Show Books after category click */}
      {selectedCategory && (
        <div className="p-6">
          <button
            onClick={() => setSelectedCategory(null)} 
            className="text-pink-600 underline mb-4"
          >
            ← Back to Categories
          </button>
          <h2 className="text-2xl font-semibold mb-4">Books in this Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="border rounded-lg p-4 shadow bg-white">
                <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded-md" />
                <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
