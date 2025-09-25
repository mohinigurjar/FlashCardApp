// src/components/Flashcard.jsx
import React from "react";
import { toggleBookmark } from "../services/api";

const Flashcard = ({ card, onBookmarkToggle }) => {
const { _id, question, answer, tags, isBookmarked } = card;

const handleBookmark = async () => {
  try {
    await toggleBookmark(_id);
    onBookmarkToggle(); // Refresh data
  } catch (err) {
    console.error("Failed to toggle bookmark:", err);
  }
};

  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{question}</h3>
      <p className="text-gray-700 mb-3">{answer}</p>
      <p className="text-sm text-gray-500 mb-4">
        <strong>Tags:</strong> {tags?.join(", ")}
      </p>
      <button
        onClick={toggleBookmark}
        className={`px-3 py-1 rounded text-sm font-medium ${
          isBookmarked
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
      </button>
    </div>
  );
};

export default Flashcard;
