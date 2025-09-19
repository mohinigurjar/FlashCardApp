
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css'



import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddFlashcard from './pages/AddFlashcard';
import Bookmarked from './pages/Bookmarked';
import Profile from './pages/Profile';
import TagFlashcards from './pages/TagFlashcards';


function AppComponent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <main className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddFlashcard />} />
          <Route path="/bookmarked" element={<Bookmarked />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tags/:tagName" element={<TagFlashcards />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppComponent />
    </Router>
  )
}
export default App
