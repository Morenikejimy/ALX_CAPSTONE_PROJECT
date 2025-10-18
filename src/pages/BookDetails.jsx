import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookDetails } from "../api/bookApi";
import Navbar from "../components/Navbar";

function BookDetails() {
  const { categoryId, bookId } = useParams(); // 👈 Grab the category and Book ID from URL
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <div className="p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-md mx-auto">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Book Header */}
          <div className="bg-blue-600 p-8">
            <h1 className="text-4xl font-bold text-white text-center mb-2">
              {bookDetails.title}
            </h1>
            <p className="text-blue-100 text-center text-lg">by {bookDetails.author}</p>
          </div>

          {/* Book Content */}
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Left Column - Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <img
                  src={bookDetails.coverImage}
                  alt={bookDetails.title}
                  className="w-full rounded-xl shadow-lg"
                />
                {bookDetails.rating && (
                  <div className="mt-4 bg-yellow-400 text-white p-4 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-2xl font-bold">{bookDetails.rating}</span>
                    </div>
                    {bookDetails.reviewCount && (
                      <p className="text-sm opacity-90">{bookDetails.reviewCount} reviews</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Book Details */}
            <div className="md:col-span-2">
              {/* Book Info */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Language</p>
                    <p className="text-gray-800 font-medium">{bookDetails.language}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Published</p>
                    <p className="text-gray-800 font-medium">{bookDetails.publishedYear}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Publisher</p>
                    <p className="text-gray-800 font-medium">{bookDetails.publisher}</p>
                  </div>
                  {bookDetails.pageCount && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Pages</p>
                      <p className="text-gray-800 font-medium">{bookDetails.pageCount}</p>
                    </div>
                  )}
                  {bookDetails.ageRecommendation && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 col-span-2">
                      <p className="text-sm text-gray-600 font-semibold mb-1">Age Recommendation</p>
                      <p className="text-gray-800 font-medium">{bookDetails.ageRecommendation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Synopsis */}
              {bookDetails.synopsis && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Synopsis</h2>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                    {bookDetails.synopsis}
                  </p>
                </div>
              )}

              {/* Chapters */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chapters</h2>
                <div className="space-y-3">
                  {bookDetails.chapters.map((chapter, index) => (
                    <Link
                      to={`/read-book/${categoryId}/${bookId}/${chapter.chapterNumber}`}
                      key={index}
                      className="block group"
                    >
                      <div className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-white text-blue-600 font-bold w-10 h-10 rounded-full flex items-center justify-center">
                              {chapter.chapterNumber}
                            </div>
                            <div>
                              <p className="text-white font-semibold text-lg">
                                {chapter.chapterTitle}
                              </p>
                              {chapter.pageNumber && (
                                <p className="text-blue-100 text-sm">Page {chapter.pageNumber}</p>
                              )}
                            </div>
                          </div>
                          <svg
                            className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
