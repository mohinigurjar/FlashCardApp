import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    } 
    return req;
})

//auth services
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/signup', data);
export const logoutUser = () => {
    localStorage.removeItem('token');
}

//flashcard services
export const getAllFlashcards = () => API.get('/flashcard');
export const addFlashcard = (data) => API.post('/flashcard', data);
export const getFlashcardById = (id) => API.get(`/flashcard/${id}`);
export const updateFlashcard = (id, data) => API.put(`/flashcard/${id}`, data);
export const deleteFlashcard = (id) => API.delete(`/flashcard/${id}`);


//bookmark services
export const getBookmarkedFlashcards = () => API.get('/flashcard/bookmarked');
export const toggleBookmark = (id) => API.patch(`/flashcard/${id}/bookmark`);
export const getBookmarkStatus = (id) => API.get(`/flashcard/${id}/bookmark`);

//user profile services 
export const getUserProfile = () => API.get('/profile');
export const editUserProfile = (data) => API.put('/profile/edit', data);  
export const resetPassword = (data) => API.post('/profile/password', data);