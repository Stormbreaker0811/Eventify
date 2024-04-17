import React from 'react'
import '../Styles/Circular.css';
import Leo from '../Assets/Leo.jpeg';
import Cilian from '../Assets/Cilian.jpeg';
import tom from '../Assets/tom.jpeg';
import joseph from '../Assets/joseph.jpeg';

const Circular = () => {
  return (
    <div className='circgroup'>
      <div className="circular-card">
        <img src = {Leo} className='img'/>
        <p className='c1name'>Leonardo de Caprio</p>
      </div>
      <div className="circular-card2">
        <img src = {Cilian} className='img'/>
        <p className='c2name'>Cilian Murphy</p>
      </div>
      <div className="circular-card3">
        <img src = {tom} className='img'/>
        <p className='c3name'>Tom Hardy</p>
      </div>
      <div className="circular-card4">
        <img src = {joseph} className='img'/>
        <p className='c4name'>Joseph Gordan Levitt</p>
      </div>

    </div>
  )
}

export default Circular
