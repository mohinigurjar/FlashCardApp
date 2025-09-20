import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">FlashCardsApp</h1>
        <div className="space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            <Link to="/add" className="text-gray-700 hover:text-blue-600">Add</Link>
            <Link to="/bookmarked" className="text-gray-700 hover:text-blue-600">Bookmarked</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Logout</Link>
      </div>
    </nav>
    )
}

export default Navbar