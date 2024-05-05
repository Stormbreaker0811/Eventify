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
import Theatre  from './Pages/Theatre';
import Music from './Pages/Music';
import Forgotpass from './Components/Forgotpass';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path="/movies" element = {<MoviesPage/>}  />
          <Route path="/login" element = {<Login/>} />cd ..
          <Route path="/signup" element = {<SignUp/>} />
          <Route path='/desc' element={<Description />}/>
          <Route path='/book-ticket' element={<BookTickets/>}/>
          <Route path='/payment' element={<Payment/>} />
          <Route path='/home' element={<Homepage/>}/>
          <Route path='/movies' element={<MoviesPage/>} />
          <Route path='/standup' element={<StandupPage/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/forgot-pass' element={<Forgotpass />} />
          <Route path='orders' element={<YourOrders/>}/>
          <Route path='add-event' element={<CreateEvent/>}/>
          <Route path='/theatre' element={<Theatre/>}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/music' element={<Music/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
