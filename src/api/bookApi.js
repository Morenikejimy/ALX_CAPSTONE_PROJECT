const BASE_URL = "https://book-api.fly.dev";

// Fetch all categories
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Fetch books by category
export const getBooksByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/categories/${categoryId}/books`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching books for category ${categoryId}:`, error);
    return [];
  }
};

// Fetch specific book details
export const getBookDetails = async (categoryId, bookId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/categories/${categoryId}/books/${bookId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};

// Fetch specific book details
export const getBookChapter = async (categoryId, bookId, chapterNumber) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/categories/${categoryId}/books/${bookId}/chapters/${chapterNumber}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
};

// Search books
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/api/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};
