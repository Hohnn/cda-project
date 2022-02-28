import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Nous joindre</h2>
            <h3>SKY DRONE</h3>
            <h3>10 Place Léon Meyer</h3>
            <h3>76600 Le Havre</h3>
            <h3>02 35 10 20 30</h3>
          </div>
          <div className='social-icons'>
            <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'><i className='fab fa-facebook-f'/></Link>
            <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'><i className='fab fa-instagram' /></Link>
            <Link className='social-icon-link youtube' to='/' target='_blank' aria-label='Youtube'><i className='fab fa-youtube' /></Link>
            <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='LinkedIn'><i className='fab fa-linkedin' /></Link>
          </div>
          <div className='footer-link-items'>
            <h2>FAQ</h2>
            <h3>Contact</h3>
            <h3>Mentions légales</h3>
            <h3>Réglementation</h3>Name
            <h3>Notre équipe</h3>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <small className='website-rights'>SKY DRONE © 2022</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;