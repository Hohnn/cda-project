import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

const DroneCard = ({ drone }) => {
    console.log(drone);
  return (
       <div className='cards__container'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.png'
              text={`${drone.name_d}`}
              label='Catégorie ?'
              path={`${drone._id}`}
              desc={`${drone.description_d}`}
              price={`${drone.pricePerDay_d}`}
            />
          </ul>
       </div>
  );
}

export default DroneCard;