// import React from 'react';
// import Navbar from '../Components/Navbar';
// import '../Styles/Homepage.css';
// import ed from '../Assets/ed.jpg';
// import zakir from '../Assets/zakir.jpeg';
// import comedy from '../Assets/comedy.jpg';
// import samay from '../Assets/samay.jpeg';
// import Footer from '../Components/Footer';
// import SeeMore from '../Components/SeeMore';


// const Homepage = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="popular ">
//         <h2>Popular Right Now</h2>
//         {/* Add your popular content here */}
//         <div className="popular-content">
//           <div className="popcard1">
//             <img src = {samay} className='pop1'/>
//           </div>
//           <div className="popcard2">
//             <img src={ed} className='pop2'/>
//           </div>
//           <div className="popcard3">
//             <img src={zakir} className='pop3'/>
//           </div>
//           <div className="popcard4">
//             <img src={comedy} className='pop4'/>
//           </div>
          
//         </div>
//       </div>
//       <div className="categories">
//         <h2>Categories</h2>
//         <div className="categories-content">
          
//           <div className="cat2">Music</div>
//           <div className="cat3">Standup</div>
//           <div className="cat4">Theatre</div>
//         </div>
        
//       </div>
      
//       <div className="standup ">
//         <h2>Standup Comedy</h2>
//         <SeeMore/>
//        <div className="standup-content">
//           <div className="st1">Movie 1</div>
//           <div className="st2">Movie 2</div>
//           <div className="st3">Movie 3</div>
//           <div className="st4">Movie 4</div>
//           <div className="st5">Movie 5</div>
//         </div>
//       </div>
//       <div className="music">
//         <h2>Music events</h2>
//         <SeeMore/>
//         <div className="music-content">
//           <div className="music1">Movie 1</div>
//           <div className="music2">Movie 2</div>
//           <div className="music3">Movie 3</div>
//           <div className="music4">Movie 4</div>
//           <div className="music5">Movie 5</div>
//         </div>
//       </div>
//       <div className="theatre ">
//         <h2>Theatre</h2>
//         <SeeMore/>
//         <div className="theatre-content">
//           <div className="th1">Movie 1</div>
//           <div className="th2">Movie 2</div>
//           <div className="th3">Movie 3</div>
//           <div className="th4">Movie 4</div>
//           <div className="th5">Movie 5</div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Homepage;


import React from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/Homepage.css';
import Footer from '../Components/Footer';
import SeeMore from '../Components/SeeMore';
import samay from '../Assets/samay.jpeg';
import ed from '../Assets/ed.jpg';
import zakir from '../Assets/zakir.jpeg';
import comedy from '../Assets/comedy.jpg';

const Homepage = () => {
  const popularContent = [
    { id: 1, image: samay },
    { id: 2, image: ed },
    { id: 3, image: zakir },
    { id: 4, image: comedy },
  ];

  const standupComedyContent = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5'];

  const musicEventsContent = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5'];

  const theatreContent = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4', 'Movie 5'];

  return (
    <div>
      <Navbar />
      <div className="popular">
        <h2>Popular Right Now</h2>
        <div className="popular-content">
          {popularContent.map((item) => (
            <div key={item.id} className={`popcard${item.id}`}>
              <img src={item.image} alt={`Popular ${item.id}`} className={`pop${item.id}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <div className="categories-content">
          <div className="cat2">Music</div>
          <div className="cat3">Standup</div>
          <div className="cat4">Theatre</div>
        </div>
      </div>
      <div className="standup">
        <h2>Standup Comedy</h2>
        <SeeMore />
        <div className="standup-content">
          {standupComedyContent.map((item, index) => (
            <div key={index} className={`st${index + 1}`}>{item}</div>
          ))}
        </div>
      </div>
      <div className="music">
        <h2>Music events</h2>
        <SeeMore />
        <div className="music-content">
          {musicEventsContent.map((item, index) => (
            <div key={index} className={`music${index + 1}`}>{item}</div>
          ))}
        </div>
      </div>
      <div className="theatre">
        <h2>Theatre</h2>
        <SeeMore />
        <div className="theatre-content">
          {theatreContent.map((item, index) => (
            <div key={index} className={`th${index + 1}`}>{item}</div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
