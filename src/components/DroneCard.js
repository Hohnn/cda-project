import React from 'react';
import './Cards.css';

const DroneCard = ({ drone }) => {
	return (
       	<div className='cards__container'>
          	<ul className='cards__items'>
				<li className="cards__item">
        			<div className="cards__item__link">
            			<figure className="cards__item__pic-wrap" data-category='Catégorie ?'>
                			<img src='images/img-9.png' alt='drone' className='cards__item__img'></img>
            			</figure>
            			<div className="cards__item__info">
                			<h5 className="cards__item__text">{drone.name_d}</h5>
                			<h5 className="cards__item__desc">{drone.description_d}</h5>
                			<h5 className="cards__item__price">{drone.pricePerDay_d}€/jours</h5>
            			</div>
            		</div>
        		</li>
        	</ul>
      	</div>
 	);
}

export default DroneCard;