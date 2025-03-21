import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteStates';
import Alert from  './components/Alert';
import Login  from './components/Login';
import Signup  from './components/Signup';
import Profile from "./components/Profile";
import { AlertProvider } from './context/notes/AlertContext'; 
import "./App.css"

function App() {
  return (
    <Router>
      <NoteState>
        <AlertProvider>
          <Navbar/>
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </AlertProvider>
      </NoteState>
    </Router>
  )
}

export default App;