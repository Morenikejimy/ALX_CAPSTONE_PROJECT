import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [readingBooks, setReadingBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);

  // Fetch user books from API
  useEffect(() => {
    fetch('https://your-api-url.com/api/user/books')
      .then((res) => res.json())
      .then((data) => {
        // Assuming your API returns something like:
        // { reading: [...], completed: [...] }
        setReadingBooks(data.reading);
        setCompletedBooks(data.completed);
      })
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📚 My Book Profile</h1>

      {/* Reading Books Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Books I'm Reading</h2>
        <ul className="list-disc ml-6">
          {readingBooks.length > 0 ? (
            readingBooks.map((book) => (
              <li key={book.id}>
                {book.title}{' '}
                <span className="text-sm text-gray-500">by {book.author}</span>
              </li>
            ))
          ) : (
            <p>No books currently being read.</p>
          )}
        </ul>
      </section>

      {/* Completed Books Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Books I’ve Completed</h2>
        <ul className="list-disc ml-6">
          {completedBooks.length > 0 ? (
            completedBooks.map((book) => (
              <li key={book.id}>
                {book.title}{' '}
                <span className="text-sm text-gray-500">
                  (Completed: {book.dateCompleted})
                </span>
              </li>
            ))
          ) : (
            <p>No completed books yet.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Profile;
