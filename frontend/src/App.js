import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MoviesPage from './Pages/MoviesPage';
import OutsideEvents from './Pages/OutsideEvents';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OutsideEvents />}/>
          <Route path="/movies" element = {<MoviesPage/>}  />
          <Route path="/login" element = {<Login/>} />
          <Route path="/signup" element = {<SignUp/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
