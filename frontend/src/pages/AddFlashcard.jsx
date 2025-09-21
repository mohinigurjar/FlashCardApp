import React from 'react'
import useState from 'react'
import { useNavigate } from 'react-router-dom';
import { addFlashcard }   from'../services/api';


const AddFlashcard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    question: "",
    answer: "",
    tags: "",
    bookmarked: ""
  })
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value});
  }

  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // API call to add flashcard
      // const response = await addFlashcard(data);
      // navigate to dashboard or flashcard list
      const response = await addFlashcard(data);
      console.log("Flashcard added successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Not added:", error);
       if (error.response && error.response.data) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError("Invalid input. Please check your details.");
        }
      } else if (error.message) {
        // ⚠️ This handles frontend validator errors
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Flashcard</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleAddFlashcard} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            rows="3"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Tag (optional)</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            placeholder="e.g. JavaScript, Biology"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isBookmarked}
            onChange={(e) => setIsBookmarked(e.target.checked)}
            className="mr-2"
          />
          <label className="font-semibold">Bookmark this flashcard</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Flashcard
        </button>
      </form>
    </div>
  );
};
}

export default AddFlashcard