import React from 'react';
import './AboutSection.css';

function AboutSection() {
  return (
      <>
    <div className='about'>
    	<h1>NOTRE ENTREPRISE</h1>
    		<div className="sectionPresentation">
            	<div className="imgAbout">
					<img src="images/img-10.jpg" className="imgBio" alt=""></img>
				</div>
				<div className="contentAbout">
					<p className="textAbout">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
					<p className="textAbout">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
					<p className="textAbout">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>		
				</div>
			</div>
    </div>

    <div className='about'>
    	<h1>NOS RÉFÉRENCES</h1>
    		<div className="sectionReferences">
        		<div className="imgAbout2">
					<img src="images/AXA-logo.png" className="imgBio2" alt=""></img>
					<img src="images/Bouygues-logo.png" className="imgBio2" alt=""></img>
					<img src="images/eiffage-logo.png" className="imgBio2" alt=""></img>
					<img src="images/ENEDIS-logo.png" className="imgBio2" alt=""></img>
            	</div>
            	<div className="imgAbout2">
					<img src="images/ORANGE-logo.png" className="imgBio2" alt=""></img>
					<img src="images/SG-logo.jpg" className="imgBio2" alt=""></img>
					<img src="images/VINCI-logo.png" className="imgBio2" alt=""></img>
					<img src="images/WB-logo.png" className="imgBio2" alt=""></img>
          		</div>
			</div>
    </div>
    </>
  );
}

export default AboutSection;