import React from 'react'
import { useEffect, useState } from 'react'
import { getBookmarkedFlashcards } from '../services/api'
import Flashcard from '../components/Flashcard'

const Bookmarked = () => {
  
  const [bookmarkedFlashcards, setBookmarkedFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookmarkedFlashcards = async () => {
    setLoading(true);
    setError(""); 
    try {
      const response = await getBookmarkedFlashcards();
      console.log("Bookmarked flashcards:", response.data);
      setBookmarkedFlashcards(response.data);
    } catch (err) {
      console.error("Error fetching bookmarked flashcards:", err);
      setError("Failed to load bookmarked flashcards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarkedFlashcards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Bookmarked Flashcards</h2>
      
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {bookmarkedFlashcards.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {bookmarkedFlashcards.map(card => (
                <Flashcard key={card._id} card={card} handleBookmark={fetchBookmarkedFlashcards} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No bookmarked flashcards found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarked;