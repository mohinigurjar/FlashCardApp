import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFlashcards } from '../services/api';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");
    
    useEffect(() => {
        const fetchFlashcards = async() => {
            setLoading(true);
            setError("");
            try{
                const response = await getAllFlashcards();
                console.log('API response data:', response.data);
                setFlashcards(response.data);
               
            }catch(err){
                console.error("Error fetching flashcards:", err);
                setError('Failed to load flashcards.');
                console.log(err);
        }finally{
            setLoading(false);
        }
    };
    fetchFlashcards();
    }, [])

    return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Flashcard Dashboard</h2>

      {loading && <p className="text-center text-gray-500">Loading flashcards...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
        {
        flashcards.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
        {flashcards.map((card) => (
          <div key={card._id} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{card.question}</h3>
            <p className="text-gray-700 mb-2">{card.answer}</p>
            {card.tags && (
              <p className="text-sm text-gray-500">Tags: {card.tags}</p>
            )}
            {card.bookmarked && (
              <span className="inline-block mt-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                ★ Bookmarked
              </span>
            )}
          </div>
        ))}
      </div>


            ) : (
                <p className="text-center text-gray-500">No flashcards available. Please add some flashcards.</p>
            )
        }
        </>
      )}

      
    </div>
  );
};

export default Dashboard;