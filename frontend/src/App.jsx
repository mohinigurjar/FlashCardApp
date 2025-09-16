
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddFlashcard from './pages/AddFlashcard';
import Bookmarked from './pages/Bookmarked';
import Profile from './pages/Profile';
import TagFlashcards from './pages/TagFlashcards';


function App() {
  

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <main className="p-4 max-w-4xl mx-auto">
      <Routes>

        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/add' element={<AddFlashcard/>}></Route>
        <Route path='/bookmarked' element={<Bookmarked/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/tags/:tagName' element={<TagFlashcards/>}></Route>
       
      </Routes>
      </main>
      </div>
    </Router>
  )
}

export default App
