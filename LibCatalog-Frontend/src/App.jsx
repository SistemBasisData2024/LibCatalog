import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import BookDetails from './pages/BookDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/book/:isbn" element={<BookDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
