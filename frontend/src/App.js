import './App.css';
import NavBar from './Components/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MoviesPage from './Pages/MoviesPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<MoviesPage/>}  />
          <Route path="/login" element = {<Login/>} />
          <Route path="/signup" element = {<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
