import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MoviesPage from './Pages/MoviesPage';
import Navbar from './Components/Navbar';
import Description from './Pages/Description';
//import OutsideEvents from './Pages/OutsideEvents';
import BookTickets from './Pages/BookTickets';
import Payment from './Pages/Payment';
import Homepage from './Pages/Homepage';
import SeeMore from './Components/SeeMore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path="/movies" element = {<MoviesPage/>}  />
          <Route path="/login" element = {<Login/>} />
          <Route path="/signup" element = {<SignUp/>} />
          <Route path='/movies-desc' element={<Description />}/>
          <Route path='/book-ticket' element={<BookTickets/>}/>
          <Route path='/payment' element={<Payment/>} />
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/movies' element={<MoviesPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
