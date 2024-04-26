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
import Aboutus from './Pages/Aboutus';
import YourOrders from './Pages/YourOrders';
import CreateEvent from './Pages/CreateEvent';
import StandupPage from './Pages/StandupPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path="/movies" element = {<MoviesPage/>}  />
          <Route path="/login" element = {<Login/>} />cd ..
          <Route path="/signup" element = {<SignUp/>} />
          <Route path='/movies-desc' element={<Description />}/>
          <Route path='/book-ticket' element={<BookTickets/>}/>
          <Route path='/payment' element={<Payment/>} />
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/movies' element={<MoviesPage/>} />
          <Route path='/standup' element={<StandupPage/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='orders' element={<YourOrders/>}/>
          <Route path='add-event' element={<CreateEvent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
