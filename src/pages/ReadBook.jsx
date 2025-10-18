import react, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookChapter, getBookDetails } from "../api/bookApi";
import Navbar from "../components/Navbar";

const ReadBook = () => {
  const { categoryId, bookId, chapterNumber } = useParams(); // 👈 Grab the category and Book ID from URL
  const [chapterDetails, setChapterDetails] = useState();
  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      getBookChapter(categoryId, bookId, chapterNumber),
      getBookDetails(categoryId, bookId)
    ])
      .then(([chapterData, bookData]) => {
        setChapterDetails(chapterData);
        setBookDetails(bookData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load content");
        setLoading(false);
      });
  }, [categoryId, bookId, chapterNumber]);

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

      <div className="flex max-w-7xl mx-auto p-6 gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6">
            <Link
              to={`/book-details/${categoryId}/${bookId}`}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Book
            </Link>

            <h3 className="text-lg font-bold text-gray-800 mb-4">Chapters</h3>
            <nav className="space-y-2">
              {bookDetails?.chapters?.map((chapter) => (
                <Link
                  key={chapter.chapterNumber}
                  to={`/read-book/${categoryId}/${bookId}/${chapter.chapterNumber}`}
                  className={`block p-3 rounded-lg transition-all duration-200 ${
                    parseInt(chapterNumber) === chapter.chapterNumber
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        parseInt(chapterNumber) === chapter.chapterNumber
                          ? "bg-white text-blue-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {chapter.chapterNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{chapter.chapterTitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Chapter Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-600 text-white font-bold w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg">
                {chapterDetails.chapterNumber}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {chapterDetails.chapterTitle}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  {chapterDetails.pageNumber && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Page {chapterDetails.pageNumber}
                    </span>
                  )}
                  {chapterDetails.wordCount && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {chapterDetails.wordCount} words
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Illustration Description */}
            {chapterDetails.illustration && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-blue-700 mb-1">Illustration:</p>
                <p className="text-gray-700 italic">{chapterDetails.illustration}</p>
              </div>
            )}
          </div>

          {/* Chapter Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                {chapterDetails.content}
              </p>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {parseInt(chapterNumber) > 1 ? (
              <Link
                to={`/read-book/${categoryId}/${bookId}/${parseInt(chapterNumber) - 1}`}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full shadow-lg transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </Link>
            ) : (
              <div></div>
            )}

            <div className="bg-white rounded-full shadow-lg px-6 py-3 text-sm text-gray-600 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="font-semibold">
                Chapter {chapterDetails.chapterNumber} of {bookDetails?.chapters?.length || 5}
              </span>
            </div>

            {parseInt(chapterNumber) < (bookDetails?.chapters?.length || 5) ? (
              <Link
                to={`/read-book/${categoryId}/${bookId}/${parseInt(chapterNumber) + 1}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReadBook;
